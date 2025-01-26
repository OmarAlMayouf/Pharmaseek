import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white text-5xl font-rsemibold">Pharmaseek</Text>
      <StatusBar style="auto" />
    </View>
  );
}
