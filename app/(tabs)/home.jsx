import { View, Text, FlatList, Image, Linking, AppState } from 'react-native';
import React, { useState, useEffect } from 'react';
import pharmacyData from '../../constants/Pharmacy_dataSet2.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';
import { haversineDistance, cleanStreetName, getPharmacyName, isPharmacyOpen, getPharmacyRating } from '../../constants/dataPulling';
import * as Location from 'expo-location';
import CustomButton from "../../components/CustomButton";

const Home = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = async (nextAppState) => {
    if (nextAppState === 'active') {
      await checkPermissions();
    }
  };

  const checkPermissions = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        });
        setErrorMsg(null);
      } else if (status === 'denied' || status === 'blocked') {
        setErrorMsg('Location access required to find nearby pharmacies');
      } else {
        setErrorMsg(null);
      }
    } catch (error) {
      setErrorMsg('Error checking location permissions');
    }
  };

  const handleEnableLocation = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    
    if (status === 'denied' || status === 'blocked') {
      Linking.openSettings();
    } else {
      const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
      if (newStatus === 'granted') {
        await checkPermissions();
      } else {
        setErrorMsg('Please enable location access to continue');
      }
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  useEffect(() => {
    if (!location) return;

    const processedData = pharmacyData.map((pharmacy, index) => {
      const distance = pharmacy.latitude && pharmacy.longitude 
        ? haversineDistance(
            location.lat,
            location.lng,
            pharmacy.latitude,
            pharmacy.longitude
          ).toFixed(2)
        : 'N/A';

      return {
        id: index.toString(),
        name: getPharmacyName(pharmacy.name),
        street: cleanStreetName(pharmacy.street),
        borough: pharmacy.borough || 'Unknown borough',
        city: pharmacy.city || 'Unknown City',
        rating: getPharmacyRating(pharmacy.rating),
        logo: pharmacy.logo,
        status: isPharmacyOpen(pharmacy.working_hours),
        distance: distance
      };
    });

    const sortedData = processedData.sort((a, b) => a.distance - b.distance);
    setPharmacies(sortedData);
  }, [location]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white p-4">
        {errorMsg ? (
          <View className="flex-1 justify-center items-center">
            <View className="justify-center items-center gap-20">
              <Image
                source={images.locationOff}
                resizeMode="contain"
                className="w-[200px] h-[200px]"
              />
              <Text className="text-black mt-2 text-center text-[17px] font-rregular">
                {errorMsg}
              </Text>
            </View>
            <CustomButton
              title="Enable Location"
              handlePress={handleEnableLocation}
              containerStyle="bg-primary mt-6 rounded-[15px] justify-center items-center min-h-[55px] min-w-[350px]"
              textStyle={"text-white font-rsemibold text-[18px]"}
            />
          </View>
        ) : (
          <FlatList
            data={pharmacies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="border p-3 mb-3 rounded-lg shadow-sm">
                <Image 
                  source={item.logo ? { uri: item.logo } : images.defaultPharmacyPhoto} 
                  className="w-12 h-12 rounded-full"
                />
                <Text className="text-lg font-bold">{item.name}</Text>
                <Text className="text-gray-600">
                  {item.street === "No street info" ? `${item.borough}, ${item.city}` :
                  (item.borough === "Unknown borough" || item.borough === "") ? `${item.street}, ${item.city}` :
                  (item.borough === "Unknown borough" && item.street === "No street info") ? item.city :
                  (item.street === "حي" && (item.borough === "Unknown borough" || item.borough === "")) ? item.city :
                  `${item.street}, ${item.borough}, ${item.city}`}
                </Text>
                <Text className="text-yellow-500">⭐ {item.rating}</Text>
                <Text className="text-gray-500 text-sm">
                  {item.distance === 'N/A' ? 'Distance unavailable' : `${item.distance} KM away`}
                </Text>
                <Text className={item.status === 'Opened' ? 'text-green-500' : 'text-red-500'}>
                  {item.status}
                </Text>
              </View>
            )}
          />
        )}
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Home;