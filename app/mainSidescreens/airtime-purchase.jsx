import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAuthAxios } from "../../api/authAxios";
import ScreenLayout from "../../components/ScreenLayout";
import CustomizableMainText from "../../components/CustomizableMainText";
import PrimaryInput from "../../components/PrimaryInput";
import PrimaryButton from "../../components/PrimaryButton";

import Mtn from "../../assets/assets/mtn.svg";
import Glo from "../../assets/assets/glo.svg";
import NineMobile from "../../assets/assets/9mobile.svg";
import Airtel from "../../assets/assets/airtel.svg";

import { Fonts } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";

export default function AirtimePurchase() {
  const [network, setNetwork] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [adjustedAmount, setAdjustedAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [bypassValidator, setBypassValidator] = useState(false);
  const authAxios = createAuthAxios();

  const networks = [
    { id: "1", name: "MTN", logo: <Mtn width={50} height={50} /> },
    { id: "2", name: "AIRTEL", logo: <Airtel width={50} height={50} /> },
    { id: "3", name: "9MOBILE", logo: <NineMobile width={50} height={50} /> },
    { id: "4", name: "GLO", logo: <Glo width={50} height={50} /> },
  ];

  // Create an axios instance for authenticated requests

  // Calculate adjusted amount (1.5% discount)
  useEffect(() => {
    if (amount) {
      const discount = (parseFloat(amount) * 0.015).toFixed(2);
      const adjusted = (parseFloat(amount) - parseFloat(discount)).toFixed(2);
      setAdjustedAmount(adjusted);
    } else {
      setAdjustedAmount("");
    }
  }, [amount]);

  // Handle purchase
  const handlePurchase = async () => {
    // Validate inputs
    if (!network || !phoneNumber || !amount) {
      Alert.alert(
        "Error",
        "Please select a network, enter a phone number, and specify an amount."
      );
      return;
    }

    // Validate phone number
    if (phoneNumber.length !== 11) {
      Alert.alert("Error", "Please enter a valid 11-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      // Create authenticated axios instance

      // Prepare request body
      const requestBody = {
        network: networks.find((n) => n.name === network).id,
        number: phoneNumber,
        amount: amount,
        bypass_validator: bypassValidator,
      };

      // Make API call
      const response = await authAxios.post("/airtime/", requestBody);

      // Handle response
      if (response.data.status === "error") {
        Alert.alert("Error", response.data.message);
      } else {
        Alert.alert("Success", response.data.message);
        // Reset form or perform any additional actions
        setPhoneNumber("");
        setAmount("");
        setNetwork(null);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomizableMainText style={styles.selectNetworkText}>
          Select Your Network
        </CustomizableMainText>

        <View style={styles.networkContainer}>
          {networks.map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => setNetwork(item.name)}
              style={[
                styles.networkButton,
                {
                  opacity: network === item.name ? 1 : 0.7,

                  backgroundColor: Colors.mainBlue,
                },
              ]}
            >
              {item.logo}
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryInput
          inputText="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          maxLength={11}
        />

        <PrimaryInput
          inputText="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        {adjustedAmount ? (
          <View style={styles.adjustedAmountContainer}>
            <Text style={styles.adjustedAmountText}>
              Adjusted Amount (1.5% discount): ₦{adjustedAmount}
            </Text>
          </View>
        ) : null}

        <PrimaryButton
          btnText={loading ? "Processing..." : "Purchase"}
          onPress={handlePurchase}
          disabled={loading}
        />

        {loading && (
          <ActivityIndicator
            size="large"
            color={Colors.vibrantGreen}
            style={styles.loadingIndicator}
          />
        )}
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  selectNetworkText: {
    fontSize: 16,
    opacity: 0.7,
    fontFamily: Fonts.BoldText,
    color: "black",
    marginBottom: 10,
  },
  networkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  networkButton: {
    borderRadius: 10,
    padding: 10,
  },
  adjustedAmountContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: Colors.lightBackground,
    borderRadius: 5,
  },
  adjustedAmountText: {
    textAlign: "center",
    fontFamily: Fonts.RegularText,
    color: Colors.textPrimary,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
