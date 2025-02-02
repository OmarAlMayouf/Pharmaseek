import { View, Text, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import pharmacyData from '../../Pharmacy_dataSet2.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';

// Function to clean street name (remove numbers and codes)
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

  return !street ? 'No street info' : street; //"No street info, Riyadh"
};

// Function to get pharmacy name in English (if available)
const getPharmacyName = (name) => {
  if (!name) return 'Unknown Pharmacy';
  return name.includes('|') ? name.split('|')[0].trim() : name.trim();
};

// Function to check if a pharmacy is open
const isPharmacyOpen = (workingHours) => {
  if (!workingHours) return 'Closed';

  try {
    const now = new Date();
    const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' }); // Get current day (e.g., "Monday")
    const hours = JSON.parse(workingHours)[dayOfWeek];

    if (!hours || hours.toLowerCase() === 'closed') return 'Closed';

    // Parse time ranges (e.g., "7AM-2AM" or "1-2PM,4PM-1AM")
    const timeRanges = hours.split(',');
    for (let timeRange of timeRanges) {
      let [startTime, endTime] = timeRange.trim().split('-');

      // Convert to 24-hour format
      const parseTime = (time) => {
        let date = new Date();
        let [hour, modifier] = time.match(/\d+|AM|PM/g);
        hour = parseInt(hour);
        if (modifier === 'PM' && hour !== 12) hour += 12;
        if (modifier === 'AM' && hour === 12) hour = 0;
        date.setHours(hour, 0, 0);
        return date;
      };

      let start = parseTime(startTime);
      let end = parseTime(endTime);

      // Adjust if time passes midnight (e.g., "7PM-2AM")
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

  useEffect(() => {
    // Process data dynamically when the component loads
    const processedData = pharmacyData.map((pharmacy, index) => ({
      id: index.toString(), // Unique key for FlatList
      name: getPharmacyName(pharmacy.name),
      street: cleanStreetName(pharmacy.street),
      borough: pharmacy.borough || 'Unknown borough',
      city: pharmacy.city || 'Unknown City',
      rating: pharmacy.rating || 'N/A',
      logo: pharmacy.logo, // Default logo if missing
      status: isPharmacyOpen(pharmacy.working_hours),
    }));

    setPharmacies(processedData);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
    
      <View className="flex-1 bg-white p-4">
        <FlatList
          data={pharmacies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="border p-3 mb-3 rounded-lg shadow-sm">
              <Image source={item.logo ===null? images.defaultPharmacyPhoto:{ uri: item.logo}} className="w-12 h-12 rounded-full" />
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text className="text-gray-600">
              {item.street === "No street info" ? `${item.borough}, ${item.city}` :
              (item.borough === "Unknown borough" || item.borough === "") ? `${item.street}, ${item.city}` :
              (item.borough === "Unknown borough" && item.street === "No street info") ? item.city :
              (item.street === "حي" && (item.borough === "Unknown borough" || item.borough === "")) ? item.city :
              `${item.street}, ${item.borough}, ${item.city}`}
              </Text>
              <Text className="text-yellow-500">⭐ {item.rating}</Text>
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