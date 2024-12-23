import React, { useEffect, useState } from "react";
import ScreenLayout from "../components/ScreenLayout";
import PrimaryInput from "../components/PrimaryInput";
import {
  ActivityIndicator,
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { Fonts } from "../constants/Fonts";
import PrimaryButton from "../components/PrimaryButton";
import { createAuthAxios } from "@/api/authAxios";
import { useRef } from "react";
import PinPopup from "../components/PinPopup";
import Toast from "react-native-toast-message";
import CustomizableMainText from "../components/CustomizableMainText";
import { Colors } from "../constants/Colors";

export default function Electricity() {
  const authAxios = createAuthAxios();
  const [discos, setDiscos] = useState([]);
  const [selectedDisco, setSelectedDisco] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [customerDetails, setCustomerDetails] = useState({});
  const [meterType, setMeterType] = useState("");
  const [amount, setAmount] = useState(1000);
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [baseLoader, setBaseLoader] = useState(true);
  useEffect(() => {
    authAxios
      .get("/electricity/")
      .then((res) => {
        const discoList = res.data.message;
        console.log(discoList, "hmm");

        setDiscos(discoList.cablelist);
        setBaseLoader(false);
      })
      .catch((err) => console.error(err.response?.data || err.message));
  }, []);

  const handleProviderChange = (e) => {
    const selectedDiscoId = e;
    setSelectedDisco(selectedDiscoId);
    setCustomerDetails({});
    setMeterNumber("");
  };

  const verifyMeterNumber = () => {
    if (
      !meterNumber ||
      meterNumber.length !== 13 ||
      !selectedDisco ||
      !meterType
    ) {
      Toast.show({
        type: "error",
        text1:
          "Ensure you Enter a valid meter number, select a disco and select a meter type.",
      });

      return;
    }
    setLoading(true);
    authAxios
      .post("/electricity/", {
        meter_number: meterNumber,
        disco_id: selectedDisco,
        action: "validate_meter",
        meter_typ: meterType,
      })
      .then((res) => {
        // setCustomerDetails(res.data.message);
        setCustomerAddress(res.data.message.address);
        setCustomerName(res.data.message.name);

        Toast.show({
          type: "success",
          text1: "Meter number verified successfully.",
        });
        setLoading(false);
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1:
            err.response?.data?.message || "Failed to verify meter number.",
        });
        setLoading(false);
      });
  };

  const handlePurchase = () => {
    if (
      !selectedDisco ||
      !meterNumber ||
      meterNumber.length !== 13 ||
      !meterType ||
      !customerPhone ||
      amount < 1000 ||
      !customerName ||
      !customerAddress
    ) {
      Toast.show({
        type: "error",
        text1: "Please fill in all required fields with valid data.",
      });

      return;
    }
    setIsModalOpen(true);
  };

  const handlePinSuccess = () => {
    setIsModalOpen(false);
    setLoading(true);

    authAxios
      .post("/electricity/", {
        action: "purchase",
        disco_id: selectedDisco,
        meter_number: meterNumber,
        meter_type: meterType,
        amount,
        customer_phone: customerPhone,
        customer_name: customerName,
        customer_address: customerAddress,
      })
      .then((res) => {
        if (res.data.status === "error") {
          Toast.show({
            type: "error",
            text1: res.data.message,
          });
        } else {
          const successMessage = res.response?.data?.message || res.message;
          // toast.success(res.data.message.message);

          Toast.show({
            type: "success",
            text1: "Success!",
            text2: successMessage,
          });
        }
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || err.message;

        Toast.show({
          type: "error",
          text1: "Error!",
          text2: errorMessage,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <ScreenLayout>
      <Modal visible={baseLoader} transparent={true}>
        <View
          style={{
            backgroundColor: "grey",
            flex: 1,
            justifyContent: "center",
            opacity: 0.3,
          }}
        >
          <ActivityIndicator size={50}></ActivityIndicator>
        </View>
      </Modal>
      <View
        style={{
          marginVertical: 30,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: Fonts.semiBold,
            opacity: 0.7,
          }}
        >
          State Provider
        </Text>
        <Picker
          onValueChange={(e) => {
            handleProviderChange(e);
          }}
          selectedValue={selectedDisco}
        >
          <Picker.Item label="Select a Disco" enabled={false}></Picker.Item>
          {discos.map((CustomizableMainText) => {
            return (
              <Picker.Item
                label={CustomizableMainText.disconame}
                value={CustomizableMainText.id}
                key={CustomizableMainText.id}
              />
            );
          })}
        </Picker>
      </View>

      <View
        style={{
          marginVertical: 30,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: Fonts.semiBold,
            opacity: 0.7,
          }}
        >
          Meter Type
        </Text>
        <Picker
          onValueChange={(e) => {
            setMeterType(e);
          }}
          selectedValue={meterType}
        >
          <Picker.Item label="Select Meter Type" enabled={false}></Picker.Item>
          <Picker.Item value="Prepaid" label="Prepaid"></Picker.Item>
          <Picker.Item value="Postpaid" label="Postpaid"></Picker.Item>
        </Picker>
      </View>

      <PrimaryInput
        inputText="Meter Number"
        value={meterNumber}
        onChangeText={(e) => setMeterNumber(e)}
        maxLength={13}
        placeholder="Enter your meter number eg.012xxxxxxxxx"
      ></PrimaryInput>

      <TouchableOpacity onPress={verifyMeterNumber}>
        <CustomizableMainText
          style={{
            color: Colors.secondaryBlue,
            marginVertical: 10,
            textAlign: "right",
          }}
        >
          Verify meter number
        </CustomizableMainText>
      </TouchableOpacity>

      <PrimaryInput
        inputText="Amount"
        value={amount}
        onChangeText={(e) => setAmount(e)}
        placeholder="Minimum amount ₦1000"
        keyboardType="numeric"
      ></PrimaryInput>

      <CustomizableMainText
        style={{
          color: "red",
          marginVertical: 10,
        }}
      >
        charge: ₦100
      </CustomizableMainText>

      <PrimaryInput
        inputText="Phone Number"
        value={customerPhone}
        onChangeText={(e) => setCustomerPhone(e)}
        placeholder="Enter your phone number"
        keyboardType="numeric"
      ></PrimaryInput>

      <PrimaryInput
        inputText="Customer Name"
        value={customerName}
        onChangeText={(e) => setCustomerName(e)}
        editable={false}
      ></PrimaryInput>

      <PrimaryInput
        inputText="Customer Address"
        value={customerAddress}
        onChangeText={(e) => setCustomerAddress(e)}
        editable={false}
      ></PrimaryInput>

      {customerDetails.name && (
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <CustomizableMainText
            style={{
              color: "black",
            }}
          >
            <CustomizableMainText
              style={{
                color: "black",
              }}
            >
              Name:
            </CustomizableMainText>{" "}
            {customerDetails.name}
          </CustomizableMainText>
          <CustomizableMainText
            style={{
              color: "black",
            }}
          >
            <CustomizableMainText
              style={{
                color: "black",
              }}
            >
              Address:
            </CustomizableMainText>{" "}
            {customerDetails.address}
          </CustomizableMainText>
        </View>
      )}
      <PrimaryButton
        btnText={
          loading ? (
            <ActivityIndicator size={20} color={"white"}></ActivityIndicator>
          ) : (
            "Purchase"
          )
        }
        disabled={loading}
        onPress={handlePurchase}
      ></PrimaryButton>

      <CustomizableMainText
        style={{
          color: "grey",
          opacity: 0.8,
        }}
      >
        *if you encounter any problem purchasing this product feel free to
        contact the support team
      </CustomizableMainText>

      <PinPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pin={pin}
        setPin={setPin}
        onSuccess={handlePinSuccess}
      />
    </ScreenLayout>
  );
}
