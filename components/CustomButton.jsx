import { Text, TouchableOpacity } from 'react-native';
import React from 'react'

const CustomButton = ({title, handlePress, containerStyle, textStyle, isLoading }) => {
  return (
    <TouchableOpacity 
        onPress={handlePress} 
        activeOpacity={0.7}
        className={`${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
    >
        <Text className={`${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton