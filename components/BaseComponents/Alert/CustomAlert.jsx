import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomAlert = ({ visible, message, type = 'success', onClose }) => {
  const isSuccess = type === 'success';
  
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/30">
        <View className="bg-white w-4/5 rounded-xl p-5 shadow-lg">
          <View className="items-center mb-3">
            {isSuccess ? (
              <View className="bg-success/10 p-3 rounded-full mb-2">
                <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
              </View>
            ) : (
              <View className="bg-error/10 p-3 rounded-full mb-2">
                <Ionicons name="close-circle" size={32} color="#D64545" />
              </View>
            )}
            
            <Text 
              className={`font-pmedium text-lg ${isSuccess ? 'text-success' : 'text-error'}`}
            >
              {isSuccess ? 'Success' : 'Error'}
            </Text>
          </View>
          
          <Text className="font-pregular text-textPrimary text-center mb-5">
            {message}
          </Text>
          
          <TouchableOpacity
            onPress={onClose}
            className={`py-3 rounded-lg ${isSuccess ? 'bg-success' : 'bg-error'}`}
          >
            <Text className="text-white font-pmedium text-center">OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
