import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/HomePageComponents/Header";
import BookCard from "../../components/BaseComponents/BookCard/BookCard";
import WhishListPreview from "../../components/HomePageComponents/WhishListPreview";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import TopBanner from "../../components/HomePageComponents/TopBanner";

function Home() {
  const router = useRouter();
  const [recentBooks, setRecentBooks] = useState([
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      category: 'Fiction'
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Self-Help'
    },
    {
      id: '3',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      category: 'Finance'
    },
    {
      id: '4',
      title: 'Dune',
      author: 'Frank Herbert',
      category: 'Sci-Fi'
    },
    {
      id: '5',
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      category: 'Thriller'
    },
    {
      id: '6',
      title: 'A Court of Thorns and Roses',
      author: 'Sarah J. Maas',
      category: 'Fantasy'
    }
  ]);

  const [wishlistBooks, setWishlistBooks] = useState([
    {
      id: "w1",
      title: "The Alchemist",
      author: "Paulo Coelho",
      category: "Fiction",
    },
    {
      id: "w2",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      category: "Non-Fiction",
    },
    {
      id: "w3",
      title: "The Four Agreements",
      author: "Don Miguel Ruiz",
      category: "Self-Help",
    },
    {
      id: "w4",
      title: "The House of Leaves",
      author: "Mark Z. Danielewski",
      category: "Fiction",
    },
    {
      id: "w5",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      category: "Psychology",
    },
  ]);

  const handleScanButton = () => {
    router.push("/Scan");
  };

  const handleSeeAllLibray = () => {
    router.push("./Library");
  };

  const handleBookPress = (book) => {
    console.log("Book pressed:", book.title);
    // Navigate to book details or perform action
  };

  const renderEmptyBookList = () => (
    <View className="items-center justify-center py-8 px-4">
      <View className="bg-primary-light/20 p-4 rounded-full mb-3">
        <TouchableOpacity onPress={handleScanButton}>
          <Feather name="plus-circle" size={32} color="#3B5B5B" />
        </TouchableOpacity>
      </View>
      <Text className="font-pmedium text-textSecondary text-center">
        No books added yet. Scan or add books to your library.
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-backgroundLight h-full pb-16">
      <Header />
      <TopBanner />
 
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-8">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="font-pbold text-xl text-textPrimary">
              Recently Added
            </Text>
            <TouchableOpacity onPress={handleSeeAllLibray}>
              <Text className="font-pmedium text-primary text-sm">See All</Text>
            </TouchableOpacity>
          </View>

          {recentBooks.length > 0 ? (
            <FlatList
              data={recentBooks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <BookCard
                  title={item.title}
                  author={item.author}
                  category={item.category}
                  onPress={() => handleBookPress(item)}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
              className="pb-4"
            />
          ) : (
            renderEmptyBookList()
          )}
        </View>

        <WhishListPreview wishlistBooks={wishlistBooks} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
