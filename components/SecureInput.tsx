import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Fonts } from "../constants/Fonts";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function SecureInput(props: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        marginVertical: 15,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: Fonts.semiBold,
          color: Colors.textPrimary,
          marginBottom: 8,
          opacity: 0.9,
        }}
      >
        {props.inputText}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: isFocused ? "#F0F9FF" : "#F9FAFB",
          borderRadius: 12,
          borderColor: isFocused ? Colors.secondaryBlue : "#E5E7EB",
          borderWidth: 1.5,
          paddingHorizontal: 16,
          height: 55,
        }}
      >
        <TextInput
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={!showPassword}
          style={{
            flex: 1,
            fontSize: 14,
            fontFamily: Fonts.regularText || "System",
            color: "#1F2937",
            paddingVertical: 10, // Ensure text is centered vertically
          }}
          placeholderTextColor="#9CA3AF"
        ></TextInput>
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ padding: 4 }}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off-outline"}
            size={22}
            color={Colors.secondaryBlue}
          ></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
}
