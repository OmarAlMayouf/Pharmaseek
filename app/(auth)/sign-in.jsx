import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useState } from 'react';


const signIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-1 min-h-[85vh] w-full">

        <Image
          source={images.wavyShape_signIn}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 320,
            position: 'absolute',
            top: -65,
          }}
        />
        <Text className="text-primary font-rsemibold text-[40px] justify-center items-center"
          style={{
            width: '100%',
            position: 'absolute',
            top: 300, 
            left: 40
          }}
        >
          Welcome{'\n'}Back!
        </Text>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 40, paddingHorizontal: 20 }}>
          <FormField 
            title="Email"
            placeholder={'Enter your email'}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
        </View>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  )
}

export default signIn