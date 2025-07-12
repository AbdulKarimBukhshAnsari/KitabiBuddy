import React, { useState } from "react";
import mime from "mime";
import * as FileSystem from "expo-file-system";
import { View, Text, Button, Image, ActivityIndicator } from "react-native";
import { useCameraPermissions } from "expo-camera";
import ScanEditor from "../../components/ScanComponents/ScanEditor";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import scanBookCover from "../../apis/ScanApis/ScanBookCover";

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

  const handleCapture = async (photo) => {
    try {
      const fileName = photo.uri.split("/").pop();
      const newUri = FileSystem.documentDirectory + fileName;

      // storing into local URL so that it can be accessed by Expo
      await FileSystem.copyAsync({
        from: photo.uri,
        to: newUri,
      });

      setCapturedImage({
        ...photo,
        uri: newUri,
      });
    } catch (err) {
      console.error("Failed to move image to permanent storage:", err);
      // Fallback condition
      setCapturedImage(photo);
    }
  };

  const handleReset = () => {
    setCapturedImage(null);
  };

  const handleScan = async () => {
    if (!capturedImage) return;

    setLoading(true);
    const mimeType = mime.getType(capturedImage.uri);

    const imageFile = {
      uri: capturedImage.uri,
      name: capturedImage.uri.split("/").pop(),
      type: mimeType || "image/jpeg",
    };

    try {
      const result = await scanBookCover(imageFile);
      console.log(result?.data?.author);
    } catch (error) {
      console.error("Scan error:", error);
    } finally {
      try {
        await FileSystem.deleteAsync(capturedImage.uri, { idempotent: true });
        console.log("Temp image deleted:", capturedImage.uri);
      } catch (deleteError) {
        console.warn("Failed to delete image:", deleteError);
      }

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

  if (capturedImage && isCameraActive) {
    return (
      <View className="flex-1 mb-28">
        <Image source={{ uri: capturedImage.uri }} className="flex-1" />
        <View className="p-4 bg-backgroundLight flex-row justify-between">
          <Button title="Cancel" onPress={handleReset} />
          <Button title="Scan" onPress={handleScan} />
        </View>

        {loading && (
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/60 justify-center items-center">
            <View className="bg-white px-6 py-4 rounded-xl items-center">
              <ActivityIndicator size = "large" color="#1E3A8A" />
              {/* Blue-800 */}
              <Text className="text-black font-pmedium mt-3 text-base">
                Scanning book cover...
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black mb-16">
      {isCameraActive && <ScanEditor onCapture={handleCapture} />}
    </SafeAreaView>
  );
}
