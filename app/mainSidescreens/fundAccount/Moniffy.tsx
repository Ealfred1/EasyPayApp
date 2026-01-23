import React, { useContext, useState } from "react";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomizableMainText from "../../../components/CustomizableMainText";
import PrimaryInput from "../../../components/PrimaryInput";
import PrimaryButton from "../../../components/PrimaryButton";
import { Fonts } from "../../../constants/Fonts";
import { useRouter } from "expo-router";
import { createAuthAxios } from "../../../api/authAxios";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";
import { DashboardContext } from "../../../context/DashboardContext";

export default function Moniffy() {
  const router = useRouter();
  const authAxios = createAuthAxios();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const { user } = useContext(DashboardContext);
  const handleAmountChange = (e) => {
    const value = e;
    if (value === "") {
      setAmount(""); // Allow clearing the input completely
    } else {
      const numericValue = Math.min(Number(value), 100000);
      setAmount(numericValue);
    }
  };

  const handleCheckout = (url) => {
    // navigate.push("/checkout", { url });
    router.push({ pathname: "/checkout", params: { url } });
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
      .post("paystack/", { amount, email: user.email })
      .then((res) => {
        let url = res.data.message;
        handleCheckout(url);
      })
      .catch((err) => {
        console.log(err);

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
        Enter an amount and click &quot;Proceed&quot; to be redirected to the checkout
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
        btnText={
          loading ? (
            <ActivityIndicator size={20} color={"white"}></ActivityIndicator>
          ) : (
            "Proceed"
          )
        }
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
