import supabase from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  interpolate,
  Easing,
} from "react-native-reanimated";

import {
  BGBookMain,
  CornerBorderMain,
  SideBarSheilfMain,
  MainImageMain,
} from "../constants/images";
import LogoComponent from "../components/BaseComponents/Logo/LogoComponent";
import { useRouter } from "expo-router";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Home() {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Remembers your books, so you don't have to!!";

  // Animation values
  const logoTranslateY = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const cornerBarScale = useSharedValue(0);
  const mainImageTranslateY = useSharedValue(100);
  const mainImageOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(50);
  const buttonOpacity = useSharedValue(0);

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  // Start animations
  useEffect(() => {
    logoTranslateY.value = withSequence(
      withTiming(0, { duration: 100 }),
      withSpring(-50, { damping: 12 })
    );

    titleOpacity.value = withDelay(
      600,
      withTiming(1, {
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    );

    cornerBarScale.value = withDelay(
      1000,
      withSpring(1, { damping: 8, stiffness: 100 })
    );

    mainImageTranslateY.value = withDelay(1500, withSpring(0, { damping: 12 }));
    mainImageOpacity.value = withDelay(1500, withTiming(1, { duration: 800 }));

    buttonTranslateY.value = withDelay(2000, withSpring(0, { damping: 12 }));
    buttonOpacity.value = withDelay(2000, withTiming(1, { duration: 500 }));
  }, []);

  // Animated styles
  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoTranslateY.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ scale: interpolate(titleOpacity.value, [0, 1], [0.8, 1]) }],
  }));

  const cornerBarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cornerBarScale.value }],
    opacity: cornerBarScale.value,
  }));

  const mainImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: mainImageTranslateY.value }],
    opacity: mainImageOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonTranslateY.value }],
    opacity: buttonOpacity.value,
  }));

  // Logic moved to Start button
  const handleStart = async () => {
    try {
      const firstLaunch = await AsyncStorage.getItem("first_launch_done");

      if (!firstLaunch) {
        router.replace("/(tutorial)/Story");
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (data?.session && data.session.user?.email_confirmed_at) {
        router.replace("/Home");
      } else {
        router.replace("/SignIn");
      }
    } catch (err) {
      console.error("Start logic failed:", err);
      router.replace("/SignIn");
    }
  };

  return (
    <SafeAreaView className="bg-backgroundLight h-full items-center px-4">
      <Animated.Image
        source={CornerBorderMain}
        className="absolute top-0 left-0 w-40 h-56"
        resizeMode="contain"
        style={cornerBarStyle}
      />

      <Image
        source={BGBookMain}
        className="absolute w-[350px] h-[400px] top-0 left-0 opacity-10"
        resizeMode="contain"
      />

      <Animated.View
        className="logo-name items-center gap-10 top-10"
        style={logoStyle}
      >
        <LogoComponent />
        <Animated.Text
          className="font-pbold text-5xl text-primary tracking-widest"
          style={titleStyle}
        >
          KitabiBuddy
        </Animated.Text>
      </Animated.View>

      <Text className="mt-7 text-secondary font-pregular text-3xl italic text-center leading-relaxed">
        {typedText}
      </Text>

      <Animated.Image
        source={MainImageMain}
        className="w-96 h-72 scale-x-[-1] mt-7"
        resizeMode="contain"
        style={mainImageStyle}
      />

      <AnimatedPressable
        onPress={handleStart}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        className={`w-[80vw] py-5 rounded-xl mt-10 items-center justify-center ${
          isPressed ? "bg-primary/80" : "bg-primary"
        }`}
        style={[
          buttonStyle,
          {
            elevation: 6,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
        ]}
      >
        <Text className="text-center text-3xl text-white font-pmedium">
          Start
        </Text>
      </AnimatedPressable>

      <Image
        source={SideBarSheilfMain}
        resizeMethod="contain"
        className="absolute bottom-0 right-0 w-48 h-48 -z-40 opacity-10"
      />

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
      