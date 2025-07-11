import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import ScanEditor from '../../components/ScanComponents/ScanEditor';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsCameraActive(true);
      return () => {
        setIsCameraActive(false);
        handleReset();
      }
    }, [])
  );

  const handleCapture = (photo) => {
    setCapturedImage(photo);
  };

  const handleReset = () => {
    setCapturedImage(null);
  };

  if (!permission) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-textPrimary font-pmedium text-lg">
          Loading camera permissions...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-backgroundLight p-5">
        <Text className="text-textPrimary font-pmedium text-lg text-center mb-4">
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  if (capturedImage && isCameraActive) {
    return (
      <View className="flex-1 mb-28">
        <Image source={{ uri: capturedImage.uri }} className="flex-1" />
        <View className="p-4 bg-backgroundLight">
          <Button title="Take Another Photo" onPress={handleReset} />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black mb-16">
      {isCameraActive && <ScanEditor onCapture={handleCapture} />}
    </SafeAreaView>
  );
}
