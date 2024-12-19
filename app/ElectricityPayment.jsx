import React, { useEffect, useState } from "react";
import ScreenLayout from "../components/ScreenLayout";
import PrimaryInput from "../components/PrimaryInput";
import { ActivityIndicator, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Fonts } from "../constants/Fonts";
import PrimaryButton from "../components/PrimaryButton";
import { createAuthAxios } from "@/api/authAxios";
import { useRef } from "react";
import PinPopup from "../components/PinPopup";
import Toast from "react-native-toast-message";

export default function ElectricityPayment() {
  const authAxios = createAuthAxios();
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [customerDetails, setCustomerDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState("");

  useEffect(() => {
    authAxios
      .get("/electricity/", { action: "get_providers" })
      .then((res) => {
        console.log(res.data);

        const providerList = res.data.message.cablelist;
        console.log(providerList, "hm");

        setProviders(providerList);
      })
      .catch((err) => console.error(err.response?.data || err.message));
  }, []);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const handleMeterValidation = () => {
    if (meterNumber.length === 13 && selectedProvider) {
      setLoading(true);
      authAxios
        .post("/electricity/", {
          action: "validate_meter",
          provider: selectedProvider,
          meter_number: meterNumber,
        })
        .then((res) => {
          const responseData = res.data.message || res.data;
          const { status, name, minvend, maxvend, vendtype, address } =
            responseData || {};

          if (status) {
            setCustomerDetails({ name, vendtype, address });
            toast.success("Meter number validated!");
          } else {
            setCustomerDetails({});
            toast.error("Validation failed. Check the meter number.");
          }
        })
        .catch((err) => {
          setCustomerDetails({});
          toast.error(err.response?.data?.message || err.message);
        })
        .finally(() => setLoading(false));
    } else if (meterNumber.length < 13) {
      toast.error("Meter number must be 13 digits.");
      setCustomerDetails({});
    }
  };

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider.value);
    setCustomerDetails({});
    setMeterNumber("");
    setDropdownOpen(false);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handlePinSuccess = () => {
    setIsModalOpen(false);
    setLoading(true);

    authAxios
      .post("/electricity/", {
        action: "purchase",
        provider: selectedProvider,
        meter_number: meterNumber,
        amount: customerDetails.minvend,
      })
      .then((res) => {
        if (res.data.status === "error") {
          toast.error(res.data.message.message);
        } else {
          toast.success("Purchase successful!");
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  };

  const handlePinError = () => {
    setPin("");
  };

  const handlePurchase = () => {
    console.log("di");

    if (!selectedProvider || !meterNumber || meterNumber.length !== 13) {
      Toast.show({
        type: "error",
        text1: "Please select a provider and enter a valid meter number.",
      });

      return;
    }
    setIsModalOpen(true);
  };

  return (
    <ScreenLayout>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontFamily: Fonts.semiBold,
            opacity: 0.7,
          }}
        >
          Provider
        </Text>
        <Picker
        // onValueChange={(p) => {
        //   let okay = providers.find((p) => p.disconame == p);
        //   handleProviderChange(okay);
        // }}
        >
          {providers.map((p) => {
            return (
              <Picker.Item
                label={p.disconame}
                value={p.disconame}
                key={p.value}
              />
            );
          })}
        </Picker>
      </View>
      <PrimaryInput
        inputText="Meter Number"
        value={meterNumber}
        onChangeText={(e) => setMeterNumber(e)}
        keyboardType="numeric"
        editable={true}
      ></PrimaryInput>
      <PrimaryButton
        btnText={
          loading ? (
            <ActivityIndicator size={20} color={"white"}></ActivityIndicator>
          ) : (
            "Purchase"
          )
        }
        disabled={loading}
        // onPress={() => console.log("fuck")}
        onPress={() => {
          console.log("me");
        }}
      ></PrimaryButton>

      <PinPopup
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pin={pin}
        setPin={setPin}
        onSuccess={handlePinSuccess}
        onError={handlePinError}
      />
    </ScreenLayout>
  );
}
