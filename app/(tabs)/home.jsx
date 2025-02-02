import { View, Text, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import pharmacyData from '../../Pharmacy_dataSet2.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';
import * as Location from 'expo-location';

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
};

const cleanStreetName = (street) => {
  if (!street || street === "") return 'No street info'; //"JPQ5+5G"
  array = street.split(' ');
  for (let i = 0; i < array.length; i++) {
    if (array[i] != undefined && array[i].includes('+'))
      array.splice(i, 1);
    if(array[i] != undefined && /^\d+$/.test(array[i]))
      array.splice(i, 1);
    if(array[i] != undefined && /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(array[i]))
      array.splice(i, 1);

    
  }
  street = array.join(' ');

  return !street ? 'No street info' : street;
};

const getPharmacyName = (name) => {
  if (!name) return 'Unknown Pharmacy';
  return name.includes('|') ? name.split('|')[0].trim() : name.trim();
};

const isPharmacyOpen = (workingHours) => {
  if (!workingHours) return 'Closed';

  try {
    const now = new Date();
    const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
    const hours = JSON.parse(workingHours)[dayOfWeek];

    if (!hours || hours.toLowerCase() === 'closed') return 'Closed';
    if (hours.toLowerCase() === 'open 24 hours') return 'Opened';

    const timeRanges = hours.split(',');
    for (let timeRange of timeRanges) {
      let [startTime, endTime] = timeRange.trim().split('-');

      const parseTime = (time) => {
        const match = time.match(/(\d+)(?::(\d+))?\s*(AM|PM)/i);
        if (!match) throw new Error('Invalid time format');
        let [, hour, minute = '0', modifier] = match;
        hour = parseInt(hour);
        minute = parseInt(minute);
        if (modifier.toUpperCase() === 'PM' && hour !== 12) hour += 12;
        if (modifier.toUpperCase() === 'AM' && hour === 12) hour = 0;
        const date = new Date();
        date.setHours(hour, minute, 0, 0);
        return date;
      };

      let start = parseTime(startTime);
      let end = parseTime(endTime);

      if (end < start) end.setDate(end.getDate() + 1);

      if (now >= start && now <= end) return 'Opened';
    }
  } catch (error) {
    return 'Closed';
  }

  return 'Closed';
};

const Home = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    })();
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
        rating: pharmacy.rating || 'N/A',
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
        {errorMsg && <Text className="text-red-500">{errorMsg}</Text>}
        
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
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Home;