import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import SearchBar from "../../components/LibrayComponents/SearchBar";

function Library() {
  const [books, setBooks] = useState([
    {
      id: "1",
      title: "The Midnight Library",
      author: "Matt Haig",
      category: "Fiction",
    },
    {
      id: "2",
      title: "Atomic Habits",
      author: "James Clear",
      category: "Business & Personal Development",
    },
    {
      id: "3",
      title: "The Psychology of Money",
      author: "Morgan Housel",
      category: "Business & Personal Development",
    },
    {
      id: "4",
      title: "Dune",
      author: "Frank Herbert",
      category: "Fiction",
    },
    {
      id: "5",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      category: "Fiction",
    },
    {
      id: "6",
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      category: "Non-Fiction",
    },
    {
      id: "7",
      title: "The Quran",
      author: "Various",
      category: "Religion & Spirituality",
    },
    {
      id: "8",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Fiction",
    },
  ]);

  const [filteredBooks, setFilteredBooks] = useState(books);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddNewBook = () => {
    return ;
  }

  const handleSearch = (query, category) => {
    let results = books;

    // Filter by search query
    if (query) {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category && category !== "All") {
      results = results.filter((book) => book.category === category);
    }

    setFilteredBooks(results);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mb-2.5 mx-4 bg-backgroundLight-dark p-3.5 rounded-lg border-l-4 border-primary-light"
    >
      <View className="flex-row justify-between">
        <View className="flex-1 mr-4">
          <Text
            numberOfLines={1}
            className="font-pbold text-textPrimary text-base"
          >
            {item.title}
          </Text>
          <Text className="font-pregular text-textSecondary mt-1">
            {item.author}
          </Text>
        </View>
        <View className="items-end justify-center">
          <View className="bg-primary-light/20 px-3 py-1.5 rounded-full">
            <Text className="font-pmedium text-xs text-primary">
              {item.category}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View className="items-center justify-center py-20 px-8">
      <View className="bg-primary-light/20 p-4 rounded-full mb-4">
        <Feather name="book" size={32} color="#3B5B5B" />
      </View>
      <Text className="font-pmedium text-textPrimary text-lg text-center mb-2">
        Your library is empty
      </Text>
      <Text className="font-pregular text-textSecondary text-center">
        Scan a book to get started.
      </Text>
    </View>
  );

  return (
  <SafeAreaView className="flex-1 bg-backgroundLight">
    <View className="flex-1">
      <View className="mb-6">
        <View className="w-full bg-backgroundLight-dark py-6 px-5 flex-row justify-between items-center border-b border-neutral-200 h-24">
          <Text className="text-textPrimary text-2xl font-pbold">
            My Library 📚
          </Text>
        </View>
        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleCategoryFilter}
        />
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-20 w-16 h-16 right-6 bg-primary  justify-center items-center rounded-full shadow-lg"
        onPress={handleAddNewBook}
      >
        <Text className="text-white text-4xl font-pbold">+</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

}

export default Library;
