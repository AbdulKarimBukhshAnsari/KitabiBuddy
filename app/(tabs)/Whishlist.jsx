import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import BookCard from '../../components/BaseComponents/BookCard/BookCard'

function Whishlist() {
  const [wishlistBooks, setWishlistBooks] = useState([
    {
      id: 'w1',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      category: 'Fiction'
    },
    {
      id: 'w2',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      category: 'Non-Fiction'
    },
    {
      id: 'w3',
      title: 'The Four Agreements',
      author: 'Don Miguel Ruiz',
      category: 'Self-Help'
    },
    {
      id: 'w4',
      title: 'The House of Leaves',
      author: 'Mark Z. Danielewski',
      category: 'Fiction'
    },
    {
      id: 'w5',
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      category: 'Psychology'
    }
  ]);

  const handleBookPress = (book) => {
    console.log('Wishlist book pressed:', book.title);
    // Navigate to book details or perform action
  };

  const renderEmptyWishlist = () => (
    <View className="items-center justify-center py-8 px-4 mx-4 bg-white/50 rounded-xl mt-4">
      <View className="bg-primary-light/20 p-4 rounded-full mb-3">
        <Feather name="heart" size={32} color="#3B5B5B" />
      </View>
      <Text className="font-pmedium text-textSecondary text-center">
        Your wishlist is empty. Add books you want to read in the future.
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-backgroundLight h-full">
      <View className="w-full bg-backgroundLight-dark py-6 px-5 border-b border-neutral-200">
        <Text className="text-textPrimary text-2xl font-pbold">Your Wishlist</Text>
        <Text className="text-textSecondary font-pregular mt-1">Books you want to read in the future</Text>
      </View>
      
      {wishlistBooks.length > 0 ? (
        <FlatList
          data={wishlistBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-4 py-2">
              <BookCard
                title={item.title}
                author={item.author}
                category={item.category}
                onPress={() => handleBookPress(item)}
              />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 12 }}
        />
      ) : (
        renderEmptyWishlist()
      )}
    </SafeAreaView>
  )
}

export default Whishlist