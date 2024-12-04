import React from "react";
import ScreenLayout from "../components/ScreenLayout";
import PrimaryInput from "../components/PrimaryInput";
import CustomizableMainText from "../components/CustomizableMainText";
import { View } from "react-native";
import { Colors } from "../constants/Colors";
import PrimaryButton from "../components/PrimaryButton";

export default function ForgetPassword() {
  return (
    <ScreenLayout>
      <View
        style={{
          marginTop: 30,

          flex: 1,
        }}
      >
        <CustomizableMainText
          style={{
            color: Colors.mainTheme,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Forget Password
        </CustomizableMainText>
      </View>
      <PrimaryInput inputText="Enter your email"></PrimaryInput>

      <PrimaryButton btnText={"Submit"}></PrimaryButton>
    </ScreenLayout>
  );
}
