import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; 
import { 
  SafeAreaView, View, Text, 
  TextInput, FlatList, TouchableOpacity 
} from "react-native";

const search = () => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null); 
  const router = useRouter(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const popularSearches = ["Al nahdi", "al waha", "al dawaa", "صيدلية بوتس"];

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSearchSubmit = () => {
    console.log(searchText);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <View className="flex-row items-center m-5">
        <TouchableOpacity className="mr-5" onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={24} color="#7D7D7D" className="" />
        </TouchableOpacity>

        <View className="flex-1 border border-gray-300 rounded-xl pl-4 pr-11 py-3">
          <TextInput
            ref={inputRef}
            placeholder="What are you looking for?"
            value={searchText}
            onChangeText={handleSearchTextChange} 
            onSubmitEditing={handleSearchSubmit} 
            placeholderTextColor="#7D7D7D60"
            className=" placeholder:text-[#7D7D7D60] text-[14px] font-rregular text-left"
          />
          <Ionicons
            name="search-outline"
            size={24}
            color="#7D7D7D"
            className="absolute top-2 right-3"
          />
        </View>
      </View>

      <Text className="text-[17px] font-semibold my-3 ml-5">Popular searches</Text>

      <FlatList
        data={popularSearches}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center py-3 border-b ml-5 border-gray-200">
            <Ionicons name="search-outline" size={20} color="#7D7D7D" />
            <Text className="ml-3 text-base text-[#7D7D7D] font-rregular">{item}</Text>
            <View className="flex-1 justify-end items-end mr-2">
              <Ionicons name="chevron-forward-outline" size={20} color="#7D7D7D" />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default search;