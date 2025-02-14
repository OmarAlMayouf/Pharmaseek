import { TouchableOpacity } from 'react-native'
import { Stack, router } from 'expo-router'
import { Ionicons } from "@expo/vector-icons";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="notification"
          options={{
            headerShown: true,
            headerTitle: "Notification",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="chevron-back-outline"
                  size={24}
                  color="#7D7D7D"
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerShown: true,
            headerTitle: "Settings",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="chevron-back-outline"
                  size={24}
                  color="#7D7D7D"
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="search"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack>
      
    </>
  );
}

export default AuthLayout