import React, { useState } from 'react';
import { View, Text, Button, Image, ActivityIndicator } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import ScanEditor from '../../components/ScanComponents/ScanEditor';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import scanBookCover from '../../apis/ScanApis/ScanBookCover';

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsCameraActive(true);
      return () => {
        setIsCameraActive(false);
        handleReset();
      };
    }, [])
  );

  const handleCapture = (photo) => {
    setCapturedImage(photo);
  };

  const handleReset = () => {
    setCapturedImage(null);
  };

  const handleScan = async () => {
    setLoading(true);
    try {
      const result = await scanBookCover(capturedImage);
      console.log(result);
      // Handle the result here (e.g., navigate to results screen)
    } catch (error) {
      console.error('Scan error:', error);
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false);
      setCapturedImage(null);
    }
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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-backgroundLight">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-textPrimary font-pmedium mt-4">
          Scanning book cover...
        </Text>
      </View>
    );
  }

  if (capturedImage && isCameraActive) {
    return (
      <View className="flex-1 mb-28">
        <Image source={{ uri: capturedImage.uri }} className="flex-1" />
        <View className="p-4 bg-backgroundLight flex-row justify-between">
          <Button title="Cancel" onPress={handleReset} />
          <Button title="Scan" onPress={handleScan} />
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