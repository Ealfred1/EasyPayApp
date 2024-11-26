import React from "react";
import ScreenLayout from "../../components/ScreenLayout";

import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Fonts } from "../../constants/Fonts";
import PrimaryInput from "../../components/PrimaryInput";
import PrimaryButton from "../../components/PrimaryButton";
export default function EducationSubscription() {
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
          Select Vendor
        </Text>
        <Picker selectedValue={"java"}>
          <Picker.Item label="WAEC" value="WAEC" />
          <Picker.Item label="JAMB" value="JAMB" />
        </Picker>
      </View>

      <PrimaryInput
        inputText={"Number"}
        keyboardType={"numeric"}
        placeholder="Enter your JAMB or WAEC number"
      ></PrimaryInput>

      <PrimaryButton btnText={"Purchase"}></PrimaryButton>
    </ScreenLayout>
  );
}
