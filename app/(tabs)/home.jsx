import { View, Text, FlatList, Image, Linking, AppState, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import pharmacyData from '../../constants/Pharmacy_dataSet2.json';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';
import { haversineDistance, cleanStreetName, getPharmacyName, isPharmacyOpen, getPharmacyRating } from '../../constants/dataPulling';
import * as Location from 'expo-location';
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { router } from 'expo-router';

const Home = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = async (nextAppState) => {
    if (nextAppState === "active") {
      await checkPermissions();
    }
  };

  const checkPermissions = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
        setErrorMsg(null);
      } else if (status === "denied" || status === "blocked") {
        setErrorMsg("We're having trouble detecting your location");
      } else {
        setErrorMsg(null);
      }
    } catch (error) {
      setErrorMsg("Error checking location permissions");
    }
  };

  const handleEnableLocation = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status === "denied" || status === "blocked") {
      Linking.openSettings();
    } else {
      const { status: newStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (newStatus === "granted") {
        await checkPermissions();
      } else {
        setErrorMsg("Please enable location access to continue");
      }
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  useEffect(() => {
    if (!location) return;

    const processedData = pharmacyData.map((pharmacy, index) => {
      const distance =
        pharmacy.latitude && pharmacy.longitude
          ? haversineDistance(
              location.lat,
              location.lng,
              pharmacy.latitude,
              pharmacy.longitude
            ).toFixed(2)
          : "N/A";

      return {
        id: index.toString(),
        name: getPharmacyName(pharmacy.name),
        street: cleanStreetName(pharmacy.street),
        borough: pharmacy.borough || "Unknown borough",
        city: pharmacy.city || "Unknown City",
        rating: getPharmacyRating(pharmacy.rating),
        logo: pharmacy.logo,
        status: isPharmacyOpen(pharmacy.working_hours),
        distance: distance,
      };
    });

    const sortedData = processedData.sort((a, b) => a.distance - b.distance);
    setPharmacies(sortedData);
  }, [location]);

  return (
    <View className="flex-1 bg-white">
      <View className="absolute top-0 left-0 right-0 z-10 bg-white pt-14 pb-4">
        <View className="flex-row justify-between items-center px-4">
          <View className="flex-row items-center">
            <Ionicons name="location" size={20} color="#154C79" />
            <View className="w-24 flex-row content-center">
              <Text className="text-primary ml-2 font-rregular text-[12px]" numberOfLines={2}>
                Al Abawa, 6860 Riyadh
              </Text>
            </View>
          </View>
          <View className="flex-1 items-center justify-center absolute top-[10px] right-4 w-full">
            <Text className="text-[#555555] font-rsemibold text-[17px]">
              Pharmaseek
            </Text>
          </View>
          <TouchableOpacity
            className="bg-[#E2E2E2] p-2 rounded-lg"
            activeOpacity={0.7}
            onPress={() => {
              router.push("/notification");
            }}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="px-4 mt-4">
          <TextInput
            placeholder="What are you looking for?"
            className="border border-gray-300 rounded-xl pl-4 pr-12 py-3 placeholder:text-[#7D7D7D60] text-[14px] font-rregular text-left"
          />
          <Ionicons
            name="search-outline"
            size={24}
            color="#7D7D7D"
            className="absolute top-2 right-7"
          />
        </View>
      </View>
      {errorMsg ? (
        <View className="flex-1 justify-center items-center p-4">
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
        <View className="flex-1 pt-40">
          <View className="bg-[#E2E2E2] rounded-2xl mx-4 mt-4 flex-row items-center px-5">
            <View className="flex-1">
              <View className="w-[241px]">
                <Text
                  className="text-[#373737] font-rsemibold text-[17px] mt-6"
                  numberOfLines={1}
                >
                  Browse from Nearest Pharmacy
                </Text>
              </View>
              <View className="w-60">
                <Text className="text-[#7D7D7D] text-[13px] my-2 font-rregular" numberOfLines={2}>
                  Medicines, personal care products, baby supplies
                </Text>
              </View>

              <CustomButton
                title="Browse Now"
                containerStyle="bg-primary mt-6 mb-3 py-3 px-4 rounded-lg w-full"
                textStyle={"text-white text-center font-rsemibold"}
              />
            </View>
            <Image
              source={images.defaultPharmacyPhoto}
              resizeMode="contain"
              className="absolute right-[-15px] top-[-25px] marker:w-48 h-48"
            />
          </View>

          <View className="mt-6" />

          <View className="flex-row justify-between items-center px-4">
            <Text className="text-[17px] font-semibold">Pharmacy</Text>
            <TouchableOpacity className="p-2 " activeOpacity={0.7} onPress={() => {router.push("/sort")}}>
              <Ionicons name="options-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={pharmacies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="p-3 m-3 rounded-lg shadow-[0px_4px_5px_1px_rgba(0,0,0,0.2)] mt-4 w-[365px] bg-white">
                <View className="flex-row-reverse items-center absolute top-3 right-3">
                  <Text className="text-gray-700 font-bold">{item.rating}</Text>
                  <Ionicons
                    name="star-outline"
                    size={18}
                    color="#F3DF00"
                    className="mr-2"
                  />
                </View>

                <View className="flex-row items-center">
                  <Image
                    resizeMode="contain"
                    source={
                      item.logo
                        ? { uri: item.logo }
                        : images.defaultPharmacyPhoto
                    }
                    className="w-24 h-24 rounded-md"
                  />

                  <View className="ml-4 flex-1">
                    <View className="w-52" >                    
                      <Text className="text-[15px] font-rsemibold" numberOfLines={1}>
                        {item.name}
                      </Text>
                    </View>
                    <Text className="text-[#7D7D7D] font-rregular pt-2 text-[13px]">
                      {item.street}, {item.city}
                    </Text>
                    <View className="mt-4" />

                    <View className="flex-row items-center mt-1">
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color="#7D7D7D"
                      />
                      <Text className="text-[#7D7D7D] ml-1 mr-2 font-rregular text-[13px]">
                        {item.distance} KM
                      </Text>
                      <Text className="text-[#7D7D7D] font-rlight text-[13px]">
                        |
                      </Text>
                      <Text
                        className={
                          item.status === "Opened"
                            ? "text-green-600 ml-2 text-[13px]"
                            : "text-red-600 ml-2 text-[13px]"
                        }
                      >
                        {item.status}
                      </Text>
                    </View>
                    <View className="mt-2" />
                  </View>
                </View>
              </View>
            )}
          />
          <StatusBar style="dark" />
        </View>
      )}
    </View>
  );
};

export default Home;