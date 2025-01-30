import { View, Text, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const signUp = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inputContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ScrollView className="bg-white">
        <SafeAreaView className="bg-white h-full">
          <View className="flex-1 min-h-[85vh] w-full">

            <Image
              source={images.wavyShape_signUp}
              resizeMode="contain"
              style={{
                width: '100%',
                height: 280,
                position: 'absolute',
                top: -87,
              }}
            />
            <Text className="text-primary font-rsemibold text-[40px] justify-center items-center"
              style={{
                width: '100%',
                position: 'absolute',
                top: 180,
                left: 40
              }}
            >Create{'\n'}Account</Text>
            <View style={{
              position: 'absolute',
              top: 287,
              width: '85%',
              left: 30,

            }}>

              <FormField
                title="Full Name"
                placeholder={'Full Name'}
                value={form.fullName}
                handleChangeText={(e) => setForm({ ...form, fullName: e })}
                otherStyles="mt-7"
                keyboardType="fullName"
              />
              <FormField
                title="Email Address"
                placeholder={'Email Address'}
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles="mt-7"
                keyboardType="email-address"
              />
              <FormField
                title="password"
                placeholder={'Enter Password'}
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-7"
                keyboardType="Password"
              />
              <FormField
                title="Password Confirmation"
                placeholder={'Confirm Password'}
                value={form.passwordConfirmation}
                handleChangeText={(e) => setForm({ ...form, passwordConfirmation: e })}
                otherStyles="mt-7"
                keyboardType="Password"
              />
              <View style={{
                position: 'absolute',
                top: 330,
                width: '100%',

              }}><CustomButton
                  title="Sign Up"
                  handlePress={() => router.push('/sign-in')}
                  containerStyle="bg-primary rounded-[15px] min-h-[55px] item-center justify-center mt-4"
                  textStyle="text-white font-rmedium text-[18px] text-center"
                  isLoading={isSubmitting}
                />
                <Text className="text-[#7D7D7D] font-rsemibold text-[13px] mt-5 text-center">Already have an account? <Text className="text-primary font-rsemibold" onPress={() => router.push('/sign-in')}>Sign In</Text></Text>
              </View>
            </View>
          </View>
          <StatusBar style="light" />

        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default signUp