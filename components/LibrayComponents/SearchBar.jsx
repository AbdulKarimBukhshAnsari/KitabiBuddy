import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

function SearchBar({ onSearch, onFilterChange }){
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Fiction',
    'Non-Fiction',
    'Religion & Spirituality',
    'Education & Academic',
    'Poetry & Literature',
    'Humor & Entertainment',
    'Business & Personal Development'
  ];

  const handleSearch = (text) => {
    setSearchQuery(text);
    onSearch(text, selectedCategory);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
    onFilterChange(category);
    onSearch(searchQuery, category);
  };

  return (
    <View className="px-4 py-2">
      <View className="flex-row items-center">
        <View className="flex-1 flex-row items-center bg-backgroundLight-dark rounded-lg px-3 py-1 mr-2">
          <Feather name="search" size={18} color="#696B6F" />
          <TextInput
            className="flex-1 ml-2 font-pregular text-textPrimary"
            placeholder="Search by title or author"
            placeholderTextColor="#696B6F"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Feather name="x" size={18} color="#696B6F" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          className="bg-backgroundDark rounded-lg px-3 py-3"
          onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          <View className="flex-row items-center">
            <Feather name="filter" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {showCategoryDropdown && (
        <View className="mt-2 bg-backgroundLight-dark rounded-lg shadow-sm py-2 z-10 absolute top-16 right-4 w-56">
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`px-4 py-2.5 ${selectedCategory === category ? 'bg-primary-light/20' : ''}`}
              onPress={() => handleCategorySelect(category)}
            >
              <Text className={`font-pregular ${selectedCategory === category ? 'text-primary font-pmedium' : 'text-textPrimary'}`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SearchBar;
