import React, { useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import supabase from "../../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";

// Preload images with require outside the memo
const design1 = require("../../assets/Images/StoryPage/designs_1.png");
const design2 = require("../../assets/Images/StoryPage/designs_2.png");
const design3 = require("../../assets/Images/StoryPage/designs_3.png");
const design4 = require("../../assets/Images/StoryPage/designs_4.png");

const StoryScreen = () => {
  const router = useRouter();
  const [currentScene, setCurrentScene] = useState(0);

  // Scenes with preloaded images
  const scenes = useMemo(
    () => [
      { text: "Lost in your own library?", image: design1 },
      { text: "Found your fix", image: design2 },
      { text: "Meet KitabiBuddy", image: design3 },
      { text: "From clutter to catalog — effortlessly..", image: design4 },
    ],
    []
  );

  const handleNext = useCallback(async () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
    } else {
      await AsyncStorage.setItem("first_launch_done", "true");
      const { data: sessionData } = await supabase.auth.getSession();
      router.replace(sessionData?.session ? "/Home" : "/SignIn");
    }
  }, [currentScene, scenes.length, router]);

  const handleSkip = useCallback(async () => {
    await AsyncStorage.setItem("first_launch_done", "true");
    router.replace("/SignIn");
  }, [router]);

  return (
    <View className="flex-1 justify-center items-center bg-backgroundLight px-6">
      <Image
        source={scenes[currentScene].image}
        className="w-72 h-72 mb-8"
        resizeMode="contain"
      />

      <Text className="text-textPrimary text-2xl font-pmedium text-center leading-9 mb-8">
        {scenes[currentScene].text}
      </Text>

      <View className="flex-row mb-8 space-x-2">
        {scenes.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full ${
              currentScene === index ? "w-5 bg-textPrimary" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={handleNext}
        className="bg-primary w-11/12 py-4 rounded-xl mb-4"
      >
        <Text className="text-white font-pmedium text-center text-lg">
          {currentScene === scenes.length - 1 ? "Start 📚" : "Next"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSkip}>
        <Text className="text-gray-400 font-pregular text-base">Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoryScreen;
