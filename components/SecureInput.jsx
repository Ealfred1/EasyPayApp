import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Fonts } from "../constants/Fonts";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function PrimaryInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      style={{
        marginVertical: 10,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontFamily: Fonts.semiBold,
          opacity: 0.7,
        }}
      >
        {props.inputText}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          borderRadius: 12,
          borderColor: Colors.secondaryBlue,
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}
      >
        <TextInput
          {...props}
          secureTextEntry={showPassword == false}
          style={{
            fontSize: 12,

            width: "90%",
          }}
        ></TextInput>
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off-sharp"}
            size={20}
            color={"black"}
          ></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
}
