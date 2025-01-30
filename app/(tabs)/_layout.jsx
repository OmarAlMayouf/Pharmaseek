import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TabIcon = ({ iconName, color, name, focused }) => {
  return (
    <View className="items-center gap-2 mt-4">
      <Ionicons name={`${focused? `${iconName}` : `${iconName}-outline`}`} size={28} color={color} />
      <Text 
        className={`${focused ? 'font-rsemibold' : 'font-rregular'} text-sm text-center`}
        style={{ color: color, width: 100 }}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
};

const tabsLayout = () => {
  return (
    <Tabs
      screenOptions={{ 
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#154C79',
        tabBarInactiveTintColor: '#7D7D7D',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8.00,
          height: 85,
        }
      }}
    >
      <Tabs.Screen 
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              iconName="home"
              color={color} 
              name="Home" 
              focused={focused} 
            />
          )
        }} 
      />
      <Tabs.Screen 
        name="watchlist"
        options={{
          title: 'Watchlist',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              iconName="heart"
              color={color} 
              name="Watchlist" 
              focused={focused} 
            />
          )
        }} 
      />
      <Tabs.Screen 
        name="map"
        options={{
          title: 'Map',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              iconName="location"
              color={color} 
              name="Map" 
              focused={focused} 
            />
          )
        }} 
      />
      <Tabs.Screen 
        name="reminders"
        options={{
          title: 'Reminders',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              iconName="calendar"
              color={color} 
              name="Reminders"
              focused={focused} 
            />
          )
        }} 
      />
      <Tabs.Screen 
        name="more"
        options={{
          title: 'More',
          headerTitle: 'More',
          headerTitleAlign: 'center',
          headerStyle: { shadowOpacity: 0 },
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              iconName="ellipsis-horizontal"
              color={color} 
              name="More" 
              focused={focused} 
            />
          )
        }} 
      />
    </Tabs>
  );
};

export default tabsLayout;