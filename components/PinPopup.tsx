import React, { useState } from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import { createAuthAxios } from "@/api/authAxios";
import Toast from "react-native-toast-message";
import CustomizableMainText from "./CustomizableMainText";
import PrimaryInput from "./PrimaryInput";
import { Fonts } from "../constants/Fonts";
import PrimaryButton from "./PrimaryButton";

export default function PinPopup({
  isOpen,
  onClose,
  pin,
  setPin,
  onSuccess,
  onError,
}) {
  console.log(isOpen);

  const [loading, setLoading] = useState(false); // State to track loading
  const authAxios = createAuthAxios();

  const verifyPin = async (pinEntered) => {
    try {
      const res = await authAxios.post("/pin/verify/", { pin: pinEntered });
      console.log(res.data.success);
      return res.data.success; // returns true or false based on verification
    } catch (err) {
      console.error(err);
      return false; // return false if there's an error
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (pin.length === 4) {
      setLoading(true); // Start loading
      try {
        const isVerified = await verifyPin(pin);
        if (isVerified) {
          onSuccess();
          // toast.success('PIN verified successfully');
        } else {
          onError();

          Toast.show({
            type: "error",
            text1: "Invalid PIN",
          });
        }
      } finally {
        setLoading(false); // End loading
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Please enter a complete PIN",
      });
    }
  };
  return (
    <Modal visible={isOpen} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: 20,
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 20 }}
        >
          <CustomizableMainText
            style={{
              color: "black",
              fontFamily: Fonts.semiBold,
              textAlign: "center",
              fontSize: 15,
            }}
          >
            Enter Your Pin
          </CustomizableMainText>
          <PrimaryInput
            inputText="Four digit pin"
            value={pin}
            keyboardType="numeric"
            onChangeText={(e) => {
              setPin(e);
            }}
          ></PrimaryInput>
          <View
            style={{
              flexDirection: "row",
              gap: 3,
            }}
          >
            <PrimaryButton
              btnText={
                loading ? (
                  <ActivityIndicator
                    size={20}
                    color={"white"}
                  ></ActivityIndicator>
                ) : (
                  "Continue"
                )
              }
              style={{
                flex: 1,
              }}
              onPress={handleSubmit}
            ></PrimaryButton>
            <PrimaryButton
              btnText={"Cancel"}
              onPress={onClose}
              style={{
                flex: 1,
              }}
              btnbcgstyle={{ backgroundColor: "red" }}
            ></PrimaryButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}
