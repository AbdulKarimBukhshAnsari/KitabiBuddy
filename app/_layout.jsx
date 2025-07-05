import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import "../global.css";

export default function _Layout() {
  SplashScreen.preventAutoHideAsync();

  const [fontsloaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (error) throw error;
    if (fontsloaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsloaded, error]);

  if (!fontsloaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tutorial)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
