import React, { useContext, useEffect, useState } from "react";
import ScreenLayout from "../components/ScreenLayout";
import CustomizableMainText from "../components/CustomizableMainText";
import { Colors } from "../constants/Colors";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";
import { router } from "expo-router";
import { createAuthAxios } from "../api/authAxios";
import { AuthContext } from "../context/AuthContext";
import SecureInput from "../components/SecureInput";
import { Fonts } from "../constants/Fonts";
import MainHeader from "../components/MainHeader";
import Toast from "react-native-toast-message";

export default function Register() {
  const authAxios = createAuthAxios();
  const { loginUser, register, otpSent, verifyOtp, resendOtp } =
    useContext(AuthContext) as any;
  const [userData, setUserData] = useState({
    full_name: "",
    username: "",
    phone_number: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Handle changes in input fields

  const handleChange = (e: string, id: string) => {
    let value = e;
    // const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "password") {
      checkPasswordStrength(value);
    }
  };

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (/[a-zA-Z]/.test(password)) strength += 20; // Letters only
    if (/\d/.test(password) && /[a-zA-Z]/.test(password)) strength += 30; // Letters + Numbers
    if (
      /\d/.test(password) &&
      /[a-zA-Z]/.test(password) &&
      /[!@#$%^&*()_+~`|}{[\]:;.,<>/?-]/.test(password)
    ) {
      strength += 50; // Letters + Numbers + Special Characters
    }
    setPasswordStrength(strength);
  };

  // Register handler
  const handleRegister = async () => {
    setLoading(true); // Start loader for registration

    if (!userData.full_name || userData.full_name.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter your Full Name",
      });
      setLoading(false);
      return;
    }

    if (!userData.username || userData.username.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter a Username",
      });
      setLoading(false);
      return;
    }

    await register({
      first_name: userData.full_name.trim().split(" ")[0],
      last_name: userData.full_name.trim().split(" ")[1] || "",
      phone_number: userData.phone_number.trim(),
      email: userData.email.trim().toLowerCase(),
      username: userData.username.trim(),
      password: userData.password,
      is_active: false,
    });

    setLoading(false); // End loader after registration
    console.log("")
  };

  // OTP Verification handler
  const handleVerifyOtp = async () => {
    setVerifying(true); // Start loader for OTP verification
    await verifyOtp(userData.email.trim().toLowerCase(), otp.trim());
    loginUser(
      userData.username.trim(),
      userData.password,
      "Redirecting to dashboard..."
    );
    setVerifying(false); // End loader after OTP verification
  };

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: any;
    if (otpSent && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setResendEnabled(true); // Enable resend button after 60 seconds
    }
    return () => clearInterval(timer);
  }, [otpSent, countdown]);

  // Resend OTP handler
  const handleResendOtp = async () => {
    // Reset countdown

    setResendEnabled(false); // Disable resend button again
    try {
      await resendOtp(userData.email.trim().toLowerCase());
      setCountdown(60);
    } catch (error) {
      console.log(error, "fe");
    }
  };

  return (
    <ScreenLayout>
      <View
        style={{
          marginTop: 30,

          flex: 1,
        }}
      >
        <MainHeader
          style={
            {
              // textAlign: "center",
            }
          }
        >
          NextOp9ja
        </MainHeader>
        <CustomizableMainText
          style={{
            color: Colors.mainTheme,
            fontSize: 20,
            textAlign: "center",
            fontFamily: Fonts.semiBold,
            marginTop: 30,
          }}
        >
          {otpSent ? "Enter OTP" : "Create an Account"}
        </CustomizableMainText>
        <CustomizableMainText
          style={{
            color: "black",
            opacity: 0.6,
            textAlign: "center",
            fontSize: 12,
          }}
        >
          {otpSent
            ? "Check your email for the OTP."
            : " Create an account to explore VTU offers and rewards"}
        </CustomizableMainText>
        {otpSent ? (
          <View style={{}}>
            <PrimaryInput
              inputText="OTP"
              keyboardType="numeric"
              maxLength={4}
              onChangeText={(e: string) => {
                setOtp(e);
              }}
            ></PrimaryInput>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomizableMainText
                style={{
                  color: "black",
                  // backgroundColor: "red",
                  flex: 0.6,
                }}
              >
                {countdown <= 0
                  ? "Request new OTP"
                  : `Resend OTP in ${countdown}s`}
              </CustomizableMainText>
              <PrimaryButton
                btnText={"Resend OTP"}
                onPress={handleResendOtp}
                disabled={!resendEnabled}
              ></PrimaryButton>
            </View>
          </View>
        ) : (
          <View>
            <PrimaryInput
              inputText="Fullname"
              id="full_name"
              value={userData.full_name}
              onChangeText={(e: string) => handleChange(e, "full_name")}
              placeholder="Ayo"
              autoCapitalize="words"
            ></PrimaryInput>
            <PrimaryInput
              inputText="Username"
              value={userData.username}
              onChangeText={(e: string) => handleChange(e, "username")}
              placeholder="ghostrider"
              id="username"
              autoCapitalize="none"
            ></PrimaryInput>
            <PrimaryInput
              inputText="Phone Number"
              value={userData.phone_number}
              keyboardType="numeric"
              placeholder="09132347584"
              onChangeText={(e: string) => handleChange(e, "phone_number")}
              id="phone_number"
            ></PrimaryInput>
            <PrimaryInput
              inputText="Email"
              value={userData.email}
              onChangeText={(e: string) => handleChange(e, "email")}
              keyboardType="email-address"
              id="email"
              placeholder="me@you.com"
              autoCapitalize="none"
            ></PrimaryInput>
            <SecureInput
              inputText="Password"
              value={userData.password}
              onChangeText={(e: string) => handleChange(e, "password")}
              placeholder="invicible***%%"
              id="password"
            ></SecureInput>

            <PrimaryInput inputText="Referral Code"></PrimaryInput>
          </View>
        )}

        <PrimaryButton
          btnText={
            loading || verifying ? (
              <ActivityIndicator size={20} color={"white"}></ActivityIndicator>
            ) : otpSent ? (
              "Verify OTP"
            ) : (
              "Sign Up"
            )
          }
          onPress={otpSent ? handleVerifyOtp : handleRegister}
          disabled={loading || verifying}
        ></PrimaryButton>
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
              // opacity: 0.7,
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
