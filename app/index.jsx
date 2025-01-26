import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';

export default function App() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-1">

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
          Seeker
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

        {/* Button Section */}
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 40, paddingHorizontal: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#09B683',
              borderRadius: 50,
              paddingVertical: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 18 }} className="text-white font-rmedium">Sign In</Text>
          </TouchableOpacity>


          <TouchableOpacity className="mt-4"
            style={{
              backgroundColor: '#ECECEC',
              borderRadius: 50,
              paddingVertical: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 18, color: '#373737' }} className="font-rmedium">Create New Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
