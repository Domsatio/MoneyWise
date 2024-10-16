import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { CreditCard, Home, PieChart, User } from 'lucide-react-native';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';

type TabScreenProps = {
  name: string;
  options: {
    title: string;
    tabBarIcon: ({ color }: { color: string }) => React.ReactNode;
  };
};

const TabScreenList: TabScreenProps[] = [
  {
    name: 'index',
    options: {
      title: 'Home',
      tabBarIcon: ({ color }) => <Home color={color} />,
    },
  },
  {
    name: 'budget',
    options: {
      title: 'Budget',
      tabBarIcon: ({ color }) => <PieChart color={color} />,
    },
  },
  {
    name: 'cards',
    options: {
      title: 'Cards',
      tabBarIcon: ({ color }) => <CreditCard color={color} />,
    },
  },
  {
    name: 'profile',
    options: {
      title: 'Profile',
      tabBarIcon: ({ color }) => <User color={color} />,
    },
  },
]

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: useClientOnlyValue(false, true),
      }}>
      {TabScreenList.map((screen) => (
        <Tabs.Screen key={screen.name} name={screen.name} options={{ 
          ...screen.options,
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopColor: '#d1d5db',
            borderTopWidth: 1,
            paddingTop: 4,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          tabBarActiveTintColor: '#3b82f6',
         }} />
      ))}
    </Tabs>
  );
}
