import React, { useEffect } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoginScreen from "@/screen/login";
import RegisterScreen from "@/screen/register";
import TabsScreen from "@/screen/(tabs)/_layout";
import BudgetScreen from "@/screen/budget/category";

type RouteList = {
  name: string;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
  isProtected?: boolean; 
};

const routes: RouteList[] = [
  { name: "tabs", component: TabsScreen, isProtected: true },
  { name: "login", component: LoginScreen, isProtected: false },
  { name: "register", component: RegisterScreen, isProtected: false },
  {
    name: "budget_category",
    component: BudgetScreen,
    options: { headerShown: true },
    isProtected: true, 
  },
];

const Stack = createNativeStackNavigator();

export default function RootLayoutNav() {

  return (
    // <NavigationContainer>
    <Stack.Navigator>
      {routes.map((route) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={
            route.isProtected
              ? () => (
                  // <ProtectedRoute>
                    <route.component />
                  // </ProtectedRoute>
                )
              : route.component
          }
          options={
            route.options
              ? route.options
              : { headerShown: false } 
          }
        />
      ))}
    </Stack.Navigator>
  );
}
