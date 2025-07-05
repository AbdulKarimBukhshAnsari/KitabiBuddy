import React, { useCallback, useRef } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

const ZoomControl = React.memo(function ZoomControl({ 
  zoom = 0, 
  onZoomChange,
  position = 'absolute bottom-32 left-5 right-5',
  showValue = true
}) {

  const lastUpdateTime = useRef(0);
  const throttleDelay = 500;

  const handleValueChange = useCallback((value) => {
    const now = Date.now();
    if (now - lastUpdateTime.current >= throttleDelay) {
      const roundedValue = Math.round(value * 100) / 100;
      onZoomChange(roundedValue);
      lastUpdateTime.current = now;
    }
  }, [onZoomChange]);

  return (
    <View className={`${position}`}>
      {showValue && (
        <View className="flex-row justify-end mb-1">
          <Text className="text-backgroundLight text-xs font-pmedium bg-backgroundDark/70 px-2 py-1 rounded-md">
            { Math.round(zoom * 100)}%
          </Text>
        </View>
      )}
      <View className="flex-row items-center">
        <Text className="text-backgroundLight mr-2 text-xs">1x</Text>
        <Slider
          style={{flex: 1, height: 40}}
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          value={zoom}
          onValueChange={handleValueChange}
          minimumTrackTintColor="#A2B9BC"
          maximumTrackTintColor="#FFF7FF"
          thumbTintColor="#3B5B5B"
          animationType="timing"
        />
        <Text className="text-backgroundLight ml-2 text-xs">10x</Text>
      </View>
    </View>
  );
});

export default ZoomControl;