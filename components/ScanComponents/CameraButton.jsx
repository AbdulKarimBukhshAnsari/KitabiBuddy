import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * A reusable button component for camera controls
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onPress - Function to call when button is pressed
 * @param {string} props.icon - Name of the MaterialIcons icon to display
 * @param {string} props.label - Optional text label to display
 * @param {string} props.type - Button type: 'control', 'capture', or 'action'
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {string} props.position - CSS position classes (e.g., 'top-5 right-5')
 */
const CameraButton = ({ 
  onPress, 
  icon, 
  label, 
  type = 'control',
  disabled = false,
  position = '',
  iconColor = '#FFF7FF'
}) => {
  // Button styles based on type
  const getButtonStyle = () => {
    switch(type) {
      case 'capture':
        return `rounded-full p-1 border-4 ${disabled ? 'border-interaction-disabledBg' : 'border-backgroundLight'}`;
      case 'action':
        return `rounded-full p-4 ${disabled ? 'bg-interaction-disabledBg' : 'bg-primary'}`;
      case 'control':
      default:
        return `bg-backgroundDark/70 rounded-full p-3 ${disabled ? 'opacity-50' : ''}`;
    }
  };

  // Render capture button (special case)
  if (type === 'capture') {
    return (
      <TouchableOpacity 
        onPress={onPress}
        disabled={disabled}
        className={getButtonStyle()}
      >
        <View className={`h-16 w-16 rounded-full ${disabled ? 'bg-interaction-disabledBg' : 'bg-backgroundLight'}`} />
      </TouchableOpacity>
    );
  }

  // Render standard button with icon and optional label
  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={disabled}
      className={`${getButtonStyle()} ${position} ${label ? 'items-center' : ''}`}
    >
      {icon && <MaterialIcons name={icon} size={24} color={disabled ? '#8F9696' : iconColor} />}
      {label && (
        <Text className={`${type === 'control' ? 'text-backgroundLight' : 'text-backgroundLight'} font-pmedium ${icon ? 'mt-1' : ''} ${disabled ? 'text-interaction-disabledText' : ''}`}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CameraButton; 