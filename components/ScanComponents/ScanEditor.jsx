import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';
import CameraButton from './CameraButton';
import ZoomControl from './ZoomControl';

function ScanEditor({ onCapture }) {
  const [torch, setTorch] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef(null);

  const toggleTorch = () => setTorch((prev) => !prev);

  const takePicture = async () => {
    if (cameraRef.current && !isCapturing) {
      try {
        setIsCapturing(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        setCapturedImage(photo);
      } catch (error) {
        console.error('Error taking picture:', error);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const handleAccept = () => {
    if (capturedImage && onCapture) {
      onCapture(capturedImage);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  if (capturedImage) {
    return (
      <View className="flex-1 bg-black justify-center flex-col">
        <Image source={{ uri: capturedImage.uri }} className="flex-1" />
        <View className="absolute bottom-10 w-[95%] flex-row  space-x-8 justify-between ">
          <CameraButton
            onPress={handleRetake}
            icon="close"
            type="action"
            iconColor="#FFF7FF"
          />
          <CameraButton
            onPress={handleAccept}
            icon="check"
            type="action"
            iconColor="#FFF7FF"
          />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black relative">
      <CameraView
        ref={cameraRef}
        zoom={zoom}
        enableTorch = {torch}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Flash Toggle */}
      <View className="absolute top-16 right-5 z-50">
        <CameraButton
          onPress={toggleTorch}
          icon={torch === true ? 'flash-on' : 'flash-off'}
        />
      </View>

      {/* Zoom Control */}
        <ZoomControl zoom={zoom} onZoomChange={setZoom} />
    

      {/* Capture Button */}
      <View className="absolute bottom-10 w-full flex-row justify-center z-50">
        <CameraButton
          onPress={takePicture}
          disabled={isCapturing}
          type="capture"
        />
      </View>
    </View>
  );
}

export default ScanEditor;