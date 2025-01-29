import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const FormField = ({ title, value, handleChangeText, otherStyles, placeholder, ...props }) => {

    const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-rmedium">{title}</Text>
      
      <View className="border-2 border-primary w-full h-16 px-8 rounded-full focus:border-primary flex-row items-center">
        <TextInput 
            className="flex-1 text-white font-rsemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7D7D7D"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text className="text-black font-rsemibold text-base">{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField