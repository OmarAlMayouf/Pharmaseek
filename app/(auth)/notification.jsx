import { View, Text } from 'react-native'
import { Image } from 'react-native'
import { images } from '../../constants'
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';

const notification = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Ionicons
            className='absolute top-[59px] left-5 '
            name='chevron-back-outline'
            size={24}
            color='#7D7D7D'
          />
        <View className="flex-row items-center mt-4 justify-center">
          
          {/* <View className='flex-1 items-center justify-center'> */}
            <Text className='font-rsemibold text-[17px] text-center'>Notification</Text>
          </View>
        {/* </View> */}

        <View className="flex-1 justify-center items-center bg-white mt-10">
          <Image
            source={images.noNotification}
            resizeMode="contain"
            className="w-50 h-50 "
          />
          <Text className="text-black mt-2 text-center text-[29px] font-rmedium mb-10">You have no updates</Text>

        </View>



    </SafeAreaView>
  )
}

export default notification