import { View, Text } from "react-native";
import { Image } from "react-native";
import { images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

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