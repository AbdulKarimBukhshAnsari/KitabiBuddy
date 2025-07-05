import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const BookCard = ({ title, author, category, onPress }) => {
  // Generate a consistent color based on category
  const getCategoryColor = (category) => {
    const categories = {
        'Fiction': ['#3B5B5B', '#5A7A7A'],                 // Deep teal shades
        'Non-Fiction': ['#6A8D92', '#8BAAAA'],             // Soft blue-gray tones
        'Religion & Spirituality': ['#A2B9BC', '#C4D3D5'], // Light cool blue hues
        'Education & Academic': ['#536870', '#7B8A97'],    // Muted slate blues
        'Poetry & Literature': ['#4E686B', '#6A8D92'],    // Calm teal-gray blend
        'Humor & Entertainment': ['#2B4242', '#3B5B5B'],  // Darker teal/gray shades
        'Business & Personal Development': ['#7B8D8F', '#A2B9BC'] // Soft blue-gray
      };      
    return categories[category] || ['#6A8D92', '#8BAAAA'];
  };

  const colors = getCategoryColor(category);

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.9}
      className="mr-4 w-36"
    >
      <View className="overflow-hidden rounded-lg shadow-sm">
        <LinearGradient
          colors={colors}
          className="h-48 items-center justify-center rounded-lg"
        >
          <Feather name="book-open" size={24} color="#FFF7FF" />
        </LinearGradient>
      </View>
      
      <View className="mt-2">
        <Text numberOfLines={1} className="font-pbold text-textPrimary text-sm">
          {title}
        </Text>
        
        <Text numberOfLines={1} className="font-pregular text-textSecondary text-xs mt-1">
          {author}
        </Text>
        
        <View className="flex-row items-center mt-2">
          <View className="h-2 w-2 rounded-full" style={{ backgroundColor: colors[0] }} />
          <Text className="font-pregular text-xs text-textSecondary-light ml-1">
            {category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;
