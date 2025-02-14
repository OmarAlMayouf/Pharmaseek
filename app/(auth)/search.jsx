import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router"; 

const search = () => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null); 
  const router = useRouter(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300); // Small delay to ensure UI is ready
    return () => clearTimeout(timer);
  }, []);

  const popularSearches = ["Al nahdi", "al waha", "al dawaa", "صيدلية بوتس"];

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSearchSubmit = () => {
    console.log(searchText); // Log the input when the user presses Enter/Return
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <View className="flex-row items-center mb-6">
        <TouchableOpacity className="mr-5" onPress={() => router.replace('/home')}>
          <Icon name="chevron-back-outline" size={24} color="#7D7D7D" className="ml-5" />
        </TouchableOpacity>

        <View className="flex-row flex-1 border border-gray-300 rounded-xl px-4 py-2 items-center mr-4">
          <TextInput
            ref={inputRef} // Attach the ref to TextInput
            placeholder="What are you looking for?"
            value={searchText}
            onChangeText={handleSearchTextChange} 
            onSubmitEditing={handleSearchSubmit} 
            className="flex-1 text-base text-gray-700"
            placeholderTextColor="#7D7D7D60"
          />
          <Icon name="search-outline" size={24} color="#7D7D7D" />
        </View>
      </View>

      <Text className="text-lg font-semibold mb-3 ml-5">Popular searches</Text>

      <FlatList
        data={popularSearches}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center py-3 border-b ml-5 border-gray-200">
            <Icon name="search-outline" size={20} color="gray" />
            <Text className="ml-3 text-base text-gray-700">{item}</Text>
            <View className="flex-1 justify-end items-end mr-2">
              <Icon name="chevron-forward-outline" size={24} color="#7D7D7D" />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default search;
