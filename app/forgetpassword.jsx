// import React from "react";
// import ScreenLayout from "../components/ScreenLayout";
// import PrimaryInput from "../components/PrimaryInput";
// import CustomizableMainText from "../components/CustomizableMainText";
// import { View } from "react-native";
// import { Colors } from "../constants/Colors";
// import PrimaryButton from "../components/PrimaryButton";

// export default function ForgetPassword() {
//   return (
//     <ScreenLayout>
//       <View
//         style={{
//           marginTop: 30,

//           flex: 1,
//         }}
//       >
//         <CustomizableMainText
//           style={{
//             color: Colors.mainTheme,
//             fontSize: 20,
//             textAlign: "center",
//           }}
//         >
//           Forget Password
//         </CustomizableMainText>
//       </View>
//       <PrimaryInput inputText="Enter your email"></PrimaryInput>

//       <PrimaryButton btnText={"Submit"}></PrimaryButton>
//     </ScreenLayout>
//   );
// }

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import CustomizableMainText from "../components/CustomizableMainText";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";
import axiosInstance from "../api/axios";
import { Colors } from "../constants/Colors";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const authAxios = axiosInstance;

  const handleEmailSubmit = async () => {
    setLoading(true);
    try {
      const response = await authAxios.post("/users/forgot-password/", {
        email,
      });
      setMessage(response.data.message);
      Toast.show({
        type: "info",
        text1: response.data.message,
      });
      setStep(2);
    } catch (error) {
      console.log(error.response.data);

      // Toast.show({
      //   type: "error",
      //   text1: error.response?.data || error.message,
      // });
      // alert(error.response?.data.error || "Something went wrong!");
      Toast.show({
        type: "error",
        text1: error.response?.data.error || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetCodeSubmit = async () => {
    setLoading(true);
    try {
      const response = await authAxios.post("/users/verify-reset-code/", {
        email,
        reset_code: resetCode,
      });
      setMessage(response.data.message);
      setResetToken(response.data.reset_token);
      Toast.show({
        type: "info",
        text1: response.data.message,
      });
      setStep(3);
    } catch (error) {
      console.error(error.response?.data || error.message);
      Toast.show({
        type: "error",
        text1: error.response?.data.error || "Invalid reset code!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    setLoading(true);
    try {
      const response = await authAxios.post("/users/reset-password/", {
        reset_token: resetToken,
        new_password: newPassword,
      });
      setMessage("Password reset successfully! You can now log in.");
      Toast.show({
        type: "success",
        text1: "Password reset successfully! You can now log in.",
      });
      setStep(4);
    } catch (error) {
      console.error(error.response?.data || error.message);
      Toast.show({
        type: "error",
        text1: "Password reset failed. Please try again.",
      });
      // alert("Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout>
      <CustomizableMainText
        style={{
          color: Colors.mainTheme,
          fontSize: 20,
          textAlign: "center",
          marginTop: "40",
        }}
      >
        Forget Password
      </CustomizableMainText>
      <View
        style={{
          marginTop: "auto",
          flex: 1,
        }}
      >
        {step === 1 && (
          <>
            <PrimaryInput
              inputText="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <PrimaryButton
              btnText={loading ? <ActivityIndicator color="white" /> : "Submit"}
              onPress={handleEmailSubmit}
              disabled={loading}
            />
          </>
        )}

        {step === 2 && (
          <>
            <PrimaryInput
              inputText="Enter the reset code"
              value={resetCode}
              onChangeText={(text) => setResetCode(text)}
            />
            <PrimaryButton
              btnText={
                loading ? <ActivityIndicator color="white" /> : "Verify Code"
              }
              onPress={handleResetCodeSubmit}
              disabled={loading}
            />
          </>
        )}

        {step === 3 && (
          <>
            <PrimaryInput
              inputText="Enter your new password"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry
            />
            <PrimaryButton
              btnText={
                loading ? <ActivityIndicator color="white" /> : "Reset Password"
              }
              onPress={handlePasswordSubmit}
              disabled={loading}
            />
          </>
        )}

        {step === 4 && (
          <CustomizableMainText
            style={{ textAlign: "center", color: "black", opacity: 0.7 }}
          >
            {message}
          </CustomizableMainText>
        )}
        <TouchableOpacity
          onPress={() => {
            router.replace("/login");
          }}
        >
          <CustomizableMainText
            style={{
              color: "black",
              textAlign: "center",
              color: Colors.secondaryBlue,
              fontSize: 14,
            }}
          >
            Login
          </CustomizableMainText>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}
