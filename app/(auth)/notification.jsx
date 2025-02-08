import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { images } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const notification = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center bg-white">
        <Image
          source={images.noNotification}
          resizeMode="contain"
          className="w-50 h-50 "
        />
        <Text className="text-black text-center text-[29px] font-rmedium mb-10">
          You have no updates
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default notification;
