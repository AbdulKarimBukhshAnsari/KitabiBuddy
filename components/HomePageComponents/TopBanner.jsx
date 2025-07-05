import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { HeaderBackground } from "../../constants/images";

function TopBanner() {
  return (
    <ImageBackground
      source={HeaderBackground}
      resizeMode="cover"
      className="h-[40%] z-10 elevation-5 shadow-xl shadow-white  overflow-hidden"
    >
      <View
        className="absolute inset-0 bg-backgroundDark/30 rounded-b-3xl"
        pointerEvents="none"
      />
      <View className="flex-1 px-6 py-8 justify-center rounded-b-3xl relative">
        <Text className=" text-white text-4xl font-pbold tracking-wider mb-1 drop-shadow-lg">
          KitabiBuddy
        </Text>
        <Text className="text-backgroundLight text-lg font-pmedium mb-2 drop-shadow-md">
          Your personal book companion
        </Text>
        <Text className="text-backgroundLight font-pregular text-base italic mb-6 max-w-[80%]">
          Track what you own. Pick what you need
        </Text>
        <TouchableOpacity className="bg-white px-6 py-2 rounded-full self-start shadow-md active:bg-primary-dark">
          <Text className="text-textPrimary font-pmedium text-base tracking-wide">
            Explore Library
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default TopBanner;
