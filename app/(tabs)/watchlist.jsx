import { View, Text, Image } from 'react-native'
import { images } from '../../constants'
import CustomButton from "../../components/CustomButton";
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const watchlist = () => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <View className="items-center justify-center">
        <Image 
          source={images.emptywatchlist}
          style={{ width: 250, height: 200, resizeMode: 'cover', marginTop: 40 }}
        />
        <Text 
          className="text-black text-center font-rsemibold"
          style={{ fontSize: 27 }}
        >
          Your Watchlist is empty !!
        </Text>
        <Text 
          className="text-[#7D7D7D] mt-4 text-center font-rregular w-[70%]"
          style={{ fontSize: 14 }}
        >
          Explore more and add to your watchlist.
        </Text>
      </View>
      <CustomButton
        title="Explore"
        containerStyle="bg-primary mt-6 mb-3 p-4 rounded-3xl w-48"
        textStyle={"text-white text-center font-rsemibold"}
        handlePress={() => {router.push("/home")}}
      />
    </SafeAreaView>
  )
}

export default watchlist