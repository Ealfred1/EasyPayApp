import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
// import {
//   Jost_400Regular,
//   Jost_700Bold,
//   useFonts,
// } from "@expo-google-fonts/jost";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/poppins";

SplashScreen.preventAutoHideAsync();

export default function Rootlayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    console.log("error");
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="mainSidescreens"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ElectricityPayment"
        options={{
          headerShown: true,
          headerTitle: "Electricity Bill Payment",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          // headerTitle: "Electricity Bill Payment",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
          // headerTitle: "Electricity Bill Payment",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="forgetpassword"
        options={{
          headerShown: false,
          // headerTitle: "Electricity Bill Payment",
        }}
      ></Stack.Screen>
    </Stack>
  );
}
