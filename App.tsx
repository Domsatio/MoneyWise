import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  NavigationContainer,
} from "@react-navigation/native";
import RootLayoutNav from "@/route";
import { Provider } from "react-redux";
import store from "./store";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={DefaultTheme}>
        <ThemeProvider value={DefaultTheme}>
          <RootLayoutNav />
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}
