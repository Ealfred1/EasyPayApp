import React from "react";
import ScreenLayout from "../components/ScreenLayout";
import CustomizableMainText from "../components/CustomizableMainText";
import { Colors } from "../constants/Colors";
import { TouchableOpacity, View } from "react-native";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";
import { router } from "expo-router";

export default function login() {
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
          Sign In
        </CustomizableMainText>
        <CustomizableMainText
          style={{
            color: "black",
            opacity: 0.6,
            textAlign: "center",
          }}
        >
          Enter your credentials to Login to your account
        </CustomizableMainText>

        <PrimaryInput inputText="Username"></PrimaryInput>
        <PrimaryInput inputText="Password"></PrimaryInput>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => {
            router.replace("/forgetpassword");
          }}
        >
          <CustomizableMainText
            style={{
              color: Colors.secondaryBlue,
            }}
          >
            Forget your Password?
          </CustomizableMainText>
        </TouchableOpacity>

        <PrimaryButton btnText={"Login"}></PrimaryButton>
        <TouchableOpacity
          style={{ marginTop: "auto" }}
          onPress={() => {
            router.replace("/register");
          }}
        >
          <CustomizableMainText
            style={{
              color: "black",
              textAlign: "center",
              opacity: 0.7,
            }}
          >
            Don't have an account?
            <CustomizableMainText
              style={{
                color: Colors.secondaryBlue,
                opacity: 1,
              }}
            >
              {" "}
              Sign up
            </CustomizableMainText>
          </CustomizableMainText>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}
