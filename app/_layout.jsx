import { TouchableOpacity } from "react-native";
import { router, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import "../global.css";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import GlobalProvider from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Roboto_Condensed-Light": require("../assets/fonts/Roboto_Condensed-Light.ttf"),
    "Roboto_Condensed-MediumItalic": require("../assets/fonts/Roboto_Condensed-MediumItalic.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-LightItalic": require("../assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-SemiBold": require("../assets/fonts/Roboto-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) console.log(error);

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="(modal)"
          options={{
            headerTitle: "Sort By",
            presentation: "modal",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                <Ionicons name="close" size={24} color="#154C79" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;