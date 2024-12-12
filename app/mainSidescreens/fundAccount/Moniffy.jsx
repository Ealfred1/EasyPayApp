import React, { useState } from "react";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomizableMainText from "../../../components/CustomizableMainText";
import PrimaryInput from "../../../components/PrimaryInput";
import PrimaryButton from "../../../components/PrimaryButton";
import MainText from "../../../components/MainText";
import { Fonts } from "../../../constants/Fonts";
import { useRouter } from "expo-router";
import { createAuthAxios } from "../../../api/authAxios";
import Toast from "react-native-toast-message";
import { Linking } from "react-native";

export default function Moniffy() {
  const navigate = useRouter();
  const authAxios = createAuthAxios();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleAmountChange = (e) => {
    const value = e;
    if (value === "") {
      setAmount(""); // Allow clearing the input completely
    } else {
      const numericValue = Math.min(Number(value), 100000);
      setAmount(numericValue);
    }
  };

  const redirectToExternalUrl = (url) => {
    Linking(url);
  };

  const handleProceed = () => {
    if (!amount || amount <= 0) {
      Toast.show({
        type: "error",
        text1: "Please enter a valid amount",
      });
      return;
    } else if (amount < 20) {
      Toast.show({
        type: "error",
        text1: "Minimum amount fundable is ₦20",
      });
      return;
    }

    setLoading(true); // Set loading to true
    console.log(amount, "lls");

    authAxios
      .post("/monnify/", { amount })
      .then((res) => {
        console.log("correct");

        redirectToExternalUrl(res.data.message);
      })
      .catch((err) => {
        console.error(err.data);
        alert("An error occurred. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };
  return (
    <ScreenLayout>
      <CustomizableMainText
        style={{
          color: "black",
          textAlign: "center",
          opacity: 0.6,
        }}
      >
        Enter an amount and click "Proceed" to be redirected to the checkout
        page, where you can choose to pay with your bank card or via transfer.
      </CustomizableMainText>
      <PrimaryInput
        inputText="Amount (₦)"
        placeHolder="Enter Amount"
        keyboardType={"numeric"}
        value={amount}
        onChangeText={handleAmountChange}
      ></PrimaryInput>
      <PrimaryButton
        btnText={"Proceed"}
        disabled={loading}
        onPress={handleProceed}
      ></PrimaryButton>
      <CustomizableMainText
        style={{
          color: "black",
          marginTop: 0,
          fontFamily: Fonts.semiBold,
        }}
      >
        Fee: 1.2%
      </CustomizableMainText>
      <CustomizableMainText
        style={{
          color: "black",
          textAlign: "center",
          opacity: 0.6,
        }}
      >
        *Funding delays may occur. Refresh your dashboard after using Monnify.
      </CustomizableMainText>
    </ScreenLayout>
  );
}
