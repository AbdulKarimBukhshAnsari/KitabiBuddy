<<<<<<< HEAD
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
=======

>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2

import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import "../global.css";
<<<<<<< HEAD
=======
import React, { useEffect } from "react";
import supabase from "../lib/supabase";
>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2

export default function _Layout() {
  SplashScreen.preventAutoHideAsync();

  const [fontsloaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

<<<<<<< HEAD
  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const router = useRouter();

=======
>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2
  useEffect(() => {
    if (error) throw error;
    if (fontsloaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsloaded, error]);

  if (!fontsloaded && !error) {
    return null;
  }
<<<<<<< HEAD

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
=======
  
  supabase.auth.signOut();
  return (
    
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
 
  );
  
>>>>>>> b8289fd400bd88f0ce80399fbb0ab7e8918701b2
}
