import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';

export default function App() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-1 min-h-[85vh] w-full">

        <Image
          source={images.wavyShape}
          resizeMode="contain"
          style={{
            width: '100%',
            height: 300,
            position: 'absolute',
            top: -65,
          }}
        />
        <Text className="text-white font-rmedium text-7xl"
          style={{             
            width: '100%',
            position: 'absolute',
            top: 40, 
            left: 30
          }}
        >
          Hello,
        </Text>
        <Text className="text-white font-rlightItalic text-5xl"
          style={{             
            width: '100%',
            position: 'absolute',
            top: 100, 
            left: 30
          }}
        >
          Seeker!
        </Text>

        <View style={{ marginTop: 130, alignItems: 'center' }}>
          <Image
            source={images.investegator}
            resizeMode="contain"
            style={{
              width: 500,
              height: 500,
            }}
          />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 40, paddingHorizontal: 20 }}>
          <CustomButton 
            title="Sign In"
            handlePress={() => router.push('/sign-in')}
            containerStyle="bg-primary mt-4 rounded-[15px] justify-center items-center min-h-[55px]"
            textStyle={"text-white font-rmedium text-[18px]"}
            />
          <CustomButton 
            title="Create New Account"
            handlePress={() => router.push('/sign-up')}
            containerStyle="bg-[#ECECEC] mt-4 rounded-[15px] justify-center items-center min-h-[55px]"
            textStyle={"text-[#373737] font-rmedium text-[18px]"}
            />
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
