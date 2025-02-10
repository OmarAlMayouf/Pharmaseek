import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";


const Settings = () => {
    const [selected, setSelected] = useState("English");

    const options = [
        { id: "English", label: "English" },
        { id: "Arabic", label: "عربي" },
    ];

    return (
        <View className="flex-1 p-5 bg-white">
            <Text className="font-semibold text-[17px] mb-6">Change app language</Text>

            {options.map((option) => (
                <TouchableOpacity
                    key={option.id}
                    onPress={() => setSelected(option.id)}
                    className={`flex-row items-center p-3 mb-3 rounded-lg border ${selected === option.id ? "border-[#154C79] bg-[#154C7933]" : "border-gray-400 bg-white"
                        }`}
                >
                    <Ionicons
                        name={selected === option.id ? "checkmark-circle" : "ellipse-outline"}
                        size={24}
                        color={selected === option.id ? "#154C79" : "#7D7D7D"}
                        className="mr-3"
                    />

                    <Text className="text-[20px] flex-1">{option.label}</Text>
                </TouchableOpacity>
            ))}
            <View className="flex-1 justify-end mb-10">
                <CustomButton
                    title="Update app settings"
                    handlePress={null}
                    containerStyle="bg-primary mt-16 rounded-[15px] justify-center items-center min-h-[55px]"
                    textStyle={"text-white font-rmedium text-[18px]"}
                />
            </View>

        </View>
    );
};

export default Settings;
