import { Text, View, Image, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sumbit = async () => {

    if (!form.email || !form.password) {
      Alert.alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home');

    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView className="bg-white">
        <SafeAreaView className="bg-white h-full">
          <View className="flex-1 min-h-[85vh] w-full">
            <Image
              source={images.wavyShape_signIn}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 320,
                position: "absolute",
                top: -65,
              }}
            />
            <Text
              className="text-primary font-rsemibold text-[40px] justify-center items-center"
              style={{
                width: "100%",
                position: "absolute",
                top: 300,
                left: 40,
              }}
            >
              Welcome{"\n"}Back!
            </Text>
            <View
              style={{
                position: "absolute",
                top: 420,
                width: "80%",
                left: 40,
              }}
            >
              <FormField
                title="Email"
                placeholder={"Email"}
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles="mt-7"
                keyboardType="email-address"
              />
              <FormField
                title="password"
                placeholder={"Password"}
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-7"
                keyboardType="Password"
              />
              <View
                style={{
                  position: "absolute",
                  top: 170,
                  width: "80%",
                  right: -135,
                }}
              >
                <CustomButton
                  title="Forget Password?"
                  handlePress={() => router.replace("/home")}
                  containerStyle=""
                  textStyle={"text-primary font-rsemibold text-[13px]"}
                />
              </View>
              <CustomButton
                title="Sign In"
                handlePress={sumbit}
                containerStyle="bg-primary mt-16 rounded-[15px] justify-center items-center min-h-[55px]"
                textStyle={"text-white font-rmedium text-[18px]"}
                isLoading={isSubmitting}
              />
              <View>
                <Text className="text-[#7D7D7D] font-rsemibold text-[13px] mt-5 text-center">
                  Don't have an account?{" "}
                  <Text
                    className="text-primary font-rsemibold"
                    onPress={() => router.push("/sign-up")}
                  >
                    Sign Up
                  </Text>
                </Text>
              </View>
            </View>
            <StatusBar style="light" />
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;