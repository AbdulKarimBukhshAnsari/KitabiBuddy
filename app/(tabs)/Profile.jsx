import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// Dummy user info (replace with Supabase later)
const user = {
  username: "Raazia",
  email: "raazia@example.com",
  profileIcon: "user",
  joinDate: "Joined Jan 2025",
};

export default function Profile() {
  const router = useRouter();
  const [libraryCount, setLibraryCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [genreBreakdown, setGenreBreakdown] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const libraryData = await AsyncStorage.getItem("library_books");
      const wishlistData = await AsyncStorage.getItem("wishlist_books");

      const library = libraryData ? JSON.parse(libraryData) : [];
      const wishlist = wishlistData ? JSON.parse(wishlistData) : [];

      setLibraryCount(library.length);
      setWishlistCount(wishlist.length);

      const genreMap = {};
      library.forEach((book) => {
        if (book.category) {
          genreMap[book.category] = (genreMap[book.category] || 0) + 1;
        }
      });
      setGenreBreakdown(genreMap);
    };

    fetchData();
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.clear();
    router.replace("/SignIn");
  };

  const handleDeleteLibrary = async () => {
    Alert.alert("Delete Library?", "All your library books will be deleted.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("library_books");
          setLibraryCount(0);
          setGenreBreakdown({});
          Alert.alert("Library Cleared");
        },
      },
    ]);
  };

  const handleDeleteWishlist = async () => {
    Alert.alert(
      "Delete Wishlist?",
      "All your wishlist items will be deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("wishlist_books");
            setWishlistCount(0);
            Alert.alert("Wishlist Cleared");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="bg-backgroundLight h-full px-5">
      {/* User Info */}
      <View className="flex-row justify-between items-center py-4 border-b border-neutral-200">
        <View className="flex-row items-center space-x-4">
          <View className="bg-primary/10 p-4 rounded-full">
            <Text className="text-xl font-pbold text-primary">
              {user.username[0]}
            </Text>
          </View>
          <View>
            <Text className="font-pbold text-lg text-textPrimary">
              {user.username}
            </Text>
            <Text className="font-pregular text-sm text-textSecondary">
              {user.email}
            </Text>
            <Text className="font-pregular text-xs text-gray-400 mt-1">
              {user.joinDate}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleSignOut}>
          <MaterialIcons name="logout" size={24} color="#D11A2A" />
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View className="flex-row justify-between bg-backgroundLight-dark mt-5 py-4 px-4 rounded-xl border border-neutral-200">
        <View className="items-center">
          <Text className="font-pbold text-2xl text-primary">
            {libraryCount}
          </Text>
          <Text className="text-xs font-pregular text-textSecondary">
            In Library
          </Text>
        </View>
        <View className="items-center">
          <Text className="font-pbold text-2xl text-primary">
            {wishlistCount}
          </Text>
          <Text className="text-xs font-pregular text-textSecondary">
            In Wishlist
          </Text>
        </View>
      </View>

      {/* Genre Breakdown */}
      {libraryCount > 0 && (
        <View className="mt-5 bg-white rounded-xl p-4 space-y-2 shadow-sm">
          <Text className="font-psemibold text-base text-textPrimary">
            📚 Genre Breakdown
          </Text>
          {Object.entries(genreBreakdown).length > 0 ? (
            Object.entries(genreBreakdown).map(([genre, count]) => (
              <Text
                key={genre}
                className="text-sm font-pregular text-textSecondary"
              >
                • {genre}: {count}
              </Text>
            ))
          ) : (
            <Text className="text-sm font-pregular text-textSecondary italic">
              No genres found
            </Text>
          )}
        </View>
      )}

      {/* Action Section */}
      <View className="mt-8 space-y-4">
        <TouchableOpacity
          onPress={handleDeleteLibrary}
          className="flex-row items-center bg-white py-4 px-5 rounded-xl shadow-sm"
        >
          <Feather name="book" size={20} color="#D11A2A" />
          <Text className="ml-4 text-textPrimary font-pregular text-base">
            Delete Library
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDeleteWishlist}
          className="flex-row items-center bg-white py-4 px-5 rounded-xl shadow-sm"
        >
          <Feather name="heart" size={20} color="#D11A2A" />
          <Text className="ml-4 text-textPrimary font-pregular text-base">
            Delete Wishlist
          </Text>
        </TouchableOpacity>
      </View>

      {/* App Info + Developer Link */}
      <View className="mt-10 mb-4 bg-white rounded-xl p-5 shadow-sm">
        <Text className="text-lg font-psemibold text-textPrimary mb-2">
          ℹ️ App Info
        </Text>
        <Text className="text-sm font-pregular text-textSecondary">
          • Version: 1.0.0
        </Text>
        <TouchableOpacity onPress={() => router.push("/AboutDev")}>
          <Text className="text-sm text-primary underline mt-2">
            👨‍💻 About the Developers
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
