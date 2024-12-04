import React from "react";
import ScreenLayout from "../components/ScreenLayout";
import PrimaryInput from "../components/PrimaryInput";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Fonts } from "../constants/Fonts";
import PrimaryButton from "../components/PrimaryButton";

export default function ElectricityPayment() {
  return (
    <ScreenLayout>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontFamily: Fonts.semiBold,
            opacity: 0.7,
          }}
        >
          Provider
        </Text>
        <Picker selectedValue={"java"}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="Python" value="python" />
        </Picker>
      </View>
      <PrimaryInput
        inputText="Meter Number"
        keyboardType="numeric"
      ></PrimaryInput>
      <PrimaryButton btnText={"Purchase"}></PrimaryButton>
    </ScreenLayout>
  );
}
