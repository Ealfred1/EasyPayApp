import React from "react";
import ScreenLayout from "../components/ScreenLayout";
import CustomizableMainText from "../components/CustomizableMainText";
import { Colors } from "../constants/Colors";
import { TouchableOpacity, View } from "react-native";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";
import { router } from "expo-router";

export default function Register() {
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
          Create an Account
        </CustomizableMainText>
        <CustomizableMainText
          style={{
            color: "black",
            opacity: 0.6,
            textAlign: "center",
          }}
        >
          Create an account to explore VTU offers and rewards
        </CustomizableMainText>
        <PrimaryInput inputText="Fullname"></PrimaryInput>
        <PrimaryInput inputText="Username"></PrimaryInput>
        <PrimaryInput inputText="Phone Number"></PrimaryInput>
        <PrimaryInput inputText="Email"></PrimaryInput>
        <PrimaryInput inputText="Password"></PrimaryInput>

        <PrimaryInput inputText="  Referral Code"></PrimaryInput>

        <PrimaryButton btnText={"Sign Up"}></PrimaryButton>
        <TouchableOpacity
          style={{ marginTop: "auto" }}
          onPress={() => {
            router.replace("/login");
          }}
        >
          <CustomizableMainText
            style={{
              color: "black",
              textAlign: "center",
              opacity: 0.7,
            }}
          >
            Already have an account?
            <CustomizableMainText
              style={{
                color: Colors.secondaryBlue,
                opacity: 1,
              }}
            >
              {" "}
              Login
            </CustomizableMainText>
          </CustomizableMainText>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}
