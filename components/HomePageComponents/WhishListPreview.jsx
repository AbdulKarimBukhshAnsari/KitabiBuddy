import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import BookCard from '../BaseComponents/BookCard/BookCard';

function WhishListPreview ({ wishlistBooks = [] }){
  const router = useRouter();

  const handleSeeAllWishlist = () => {
    router.push('/Whishlist');
  };

  const handleBookPress = (book) => {
    console.log('Wishlist book pressed:', book.title);
    // Navigate to book details or perform action
  };

  const renderEmptyWishlist = () => (
    <View className="items-center justify-center py-8 px-4 mx-4 bg-white/50 rounded-xl">
      <View className="bg-primary-light/20 p-4 rounded-full mb-3">
        <Feather name="heart" size={32} color="#3B5B5B" />
      </View>
      <Text className="font-pmedium text-textSecondary text-center">
        Your wishlist is empty. Add books you want to read in the future.
      </Text>
    </View>
  );

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="font-pbold text-xl text-textPrimary">
          Your Wishlist
        </Text>
        {wishlistBooks.length > 0 && (
          <TouchableOpacity onPress={handleSeeAllWishlist}>
            <Text className="font-pmedium text-primary text-sm">See All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {wishlistBooks.length > 0 ? (
        <FlatList
          data={wishlistBooks}
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
        renderEmptyWishlist()
      )}
    </View>
  );
};

export default WhishListPreview;
