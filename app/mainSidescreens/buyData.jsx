import React, { useState } from "react";
import { ActivityIndicator, Image, Modal, Text, View } from "react-native";
import ScreenLayout from "../../components/ScreenLayout";
import MainHeader from "../../components/MainHeader";
import CustomizableMainText from "../../components/CustomizableMainText";
import { Fonts } from "../../constants/Fonts";
import { Pressable } from "react-native";
import { Colors } from "../../constants/Colors";
import PrimaryInput from "../../components/PrimaryInput";
import Airtel from "../../assets/assets/airtel.svg";
import Mtn from "../../assets/assets/mtn.svg";
import Glo from "../../assets/assets/glo.svg";
import NineMobile from "../../assets/assets/9mobile.svg";
import PrimaryButton from "../../components/PrimaryButton";

import { Picker } from "@react-native-picker/picker";

import { createAuthAxios } from "@/api/authAxios";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import PinPopup from "../../components/PinPopup";

// import { MainHeader } from "../../components/MainHeader";
export default function BuyData() {
  console.log(Airtel, "hmm");

  const authAxios = createAuthAxios();
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  // const [network, setNetwork] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [dataType, setDataType] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [monthValidate, setMonthValidate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataTypes, setDataTypes] = useState([]);
  const [dataPlans, setDataPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for overlay loading
  // console.log("fuck", dataType, selectedPlan);
  const handleAutoFill = () =>
    setPhoneNumber(JSON.parse(localStorage.getItem("user")).phone_number);
  console.log(selectedPlan, "God abeg", dataType);

  const handlePay = () => {
    if (
      !selectedNetwork ||
      !phoneNumber ||
      !selectedPlan ||
      !amount ||
      amount <= 0
    ) {
      Toast.show({
        type: "error",
        text1: "Please fill in all required fields",
      });
      return;
    }
    console.log("llpkkpkp");

    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handlePinSuccess = () => {
    setIsModalOpen(false);
    setLoading(true);

    const requestBody = {
      network: selectedNetwork.id,
      phone_number: phoneNumber,
      plan_id: selectedPlan.dataplan_id,
      action: "purchase",
      data_type: dataType,
    };

    authAxios
      .post("/data/", requestBody)
      .then((res) => {
        if (res.data.status === "error") {
          // toast.error(res.data.message);
          Toast.show({
            type: "error",

            text1: res.data.message,
          });
        } else {
          // toast.success(res.data.message);
          Toast.show({
            type: "success",
            text1: "Success!",
            text2: res.data.message,
          });
          // Swal.fire("Success!", res.data.message, "success");
        }
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || err.message;
        // toast.error(errorMessage);
        // Swal.fire("Error!", errorMessage, "error");
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: errorMessage,
        });
      })
      .finally(() => setLoading(false));
  };

  const handlePinError = () => setPin("");

  useEffect(() => {
    if (selectedNetwork) {
      setDataType(""); // Reset data type when network changes
      setSelectedPlan(null); // Reset selected plan when network changes
      setAmount(0); // Reset amount when network changes
      setMonthValidate(""); // Reset month validation when network changes
      setIsLoading(true); // Start loading when network is selected

      authAxios
        .post(`/data/`, {
          action: "network_data",
          network_id: selectedNetwork.id,
        })
        .then((res) => {
          if (res.data.status === "success") {
            const networkData = res.data.message[selectedNetwork.name] || {};
            setDataTypes(Object.keys(networkData));

            setDataPlans([]); // Reset plans when network changes
          } else {
            Toast.show({
              type: "error",
              text1: res.data.message,
            });
          }
        })
        .catch((err) => {
          const errorMessage = err.response?.data?.message || err.message;

          Toast.show({
            type: "error",
            text1: errorMessage,
          });
        })
        .finally(() => setIsLoading(false)); // End loading after response
    }
  }, [selectedNetwork]);

  useEffect(() => {
    if (dataType && selectedNetwork) {
      console.log("toomuchplay", new Date().getMinutes());

      setIsLoading(true); // Start loading for data plans
      authAxios
        .post(`/data/`, {
          action: "get_plans",
          network_id: selectedNetwork.id,
          data_type: dataType,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setDataPlans(res.data.message);
            const defaultPlan = res.data.message[0]; // Set default plan to the first option
            setSelectedPlan(defaultPlan);
            const percentage = parseFloat(defaultPlan.plan_amount) * 0.05;
            console.log(percentage);
            // 'Math.ceil(percentage)'
            setAmount(parseFloat(defaultPlan.plan_amount) + 10);
            setMonthValidate(defaultPlan.month_validate);
          } else {
            Toast.show({
              type: "error",
              text1: res.data.message,
            });
          }
        })
        .catch((err) => {
          const errorMessage = err.response?.data?.message || err.message;
          Toast.show({
            type: "error",
            text1: errorMessage,
          });
        })
        .finally(() => setIsLoading(false)); // End loading after response
    }
  }, [dataType]);

  const handlePlanChange = (plan) => {
    console.log(plan, "prs");

    setSelectedPlan(plan);
    const percentage = parseFloat(plan.plan_amount) * 0.05;
    console.log(percentage);
    // Math.ceil(percentage)
    setAmount(parseFloat(plan.plan_amount) + 8);
    setMonthValidate(plan.month_validate);
  };

  // Utility function to extract plan size
  const getPlanSize = (plan) => {
    const match = plan.match(/\b\d+(\.\d+)?\s?(MB|GB|TB)\b/i);
    return match ? match[0] : plan;
  };

  const networks = [
    {
      id: "1",
      name: "MTN",
      color: "#EAB308",
      logo: <Mtn width={50} height={50}></Mtn>,
    },
    {
      id: "2",
      name: "AIRTEL",
      color: "rgb(220 38 38)",
      logo: <Airtel width={50} height={50}></Airtel>,
    },
    {
      id: "3",
      name: "9MOBILE",
      logo: <NineMobile width={50} height={50} />,
      color: "rgb(22 163 74)",
    },
    {
      id: "4",
      name: "GLO",
      logo: <Glo width={50} height={50}></Glo>,
      color: "rgb(34 197 94)",
    },
  ];

  return (
    <ScreenLayout>
      <Modal visible={isLoading} transparent={true}>
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
      <PinPopup
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pin={pin}
        setPin={setPin}
        onSuccess={handlePinSuccess}
        onError={handlePinError}
      />
      <CustomizableMainText
        style={{
          fontSize: 16,
          opacity: 0.7,
          fontFamily: Fonts.BoldText,
          color: "black",
        }}
      >
        Select Your Network
      </CustomizableMainText>

      <View
        style={{
          flexDirection: "row",
          // gap: 20,
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        {networks.map((item) => {
          return (
            <Pressable
              onPress={() => {
                setSelectedNetwork(item);
              }}
              key={item.name}
              style={{
                backgroundColor: item.color,
                borderRadius: 10,
                padding: 10,
                opacity: selectedNetwork?.name == item.name ? 1 : 0.5,
              }}
            >
              {item.logo}
            </Pressable>
          );
        })}
      </View>

      <View>
        <PrimaryInput
          inputText={"Phone Number"}
          keyboardType={"phone-pad"}
          value={phoneNumber}
          onChangeText={(e) => {
            setPhoneNumber(e);
          }}
        ></PrimaryInput>

        <View
          style={{
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: Fonts.semiBold,
              opacity: 0.7,
            }}
          >
            Data Type
          </Text>
          <Picker
            // selectedValue={dataTypes[0]}
            onValueChange={(itemValue) => setDataType(itemValue)}
            selectedValue={dataType}
          >
            <Picker.Item
              enabled={false}
              label={
                !selectedNetwork
                  ? "Choose a Network to get a list of Data Types"
                  : "Choose a Data Type"
              }
            ></Picker.Item>
            {dataTypes.map((item) => {
              return <Picker.Item label={item} value={item} key={item} />;
            })}
          </Picker>
        </View>

        <View
          style={{
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: Fonts.semiBold,
              opacity: 0.7,
            }}
          >
            Data Plan
          </Text>
          <Picker
            onValueChange={(v) => {
              // const selectedPlan = dataPlans.find(
              //   (plan) => plan.dataplan_id === v
              // );
              handlePlanChange(v);
            }}
            selectedValue={selectedPlan}
          >
            <Picker.Item
              enabled={false}
              label={
                !dataType
                  ? "Choose a Data type to get a list of Plans"
                  : "Choose a Data plan"
              }
              value="def"
            ></Picker.Item>
            {dataPlans.map((plan) => {
              return (
                <Picker.Item
                  label={getPlanSize(plan.plan)}
                  value={plan}
                  key={plan.dataplan_id}
                />
              );
            })}
          </Picker>
        </View>
        <PrimaryInput
          inputText={"Amount"}
          keyboardType="numeric"
          value={amount.toString()}
          editable={false}
          onChangeText={(e) => {
            setAmount(e);
          }}
        ></PrimaryInput>
        <PrimaryInput
          editable={false}
          inputText={"Month Validation"}
          value={monthValidate}
          onChangeText={(e) => {
            setMonthValidate(e);
          }}
        ></PrimaryInput>
        <PrimaryButton
          btnText={
            loading ? (
              <ActivityIndicator size={20} color={"white"}></ActivityIndicator>
            ) : (
              "Purchase"
            )
          }
          onPress={handlePay}
          disabled={loading}
        ></PrimaryButton>
      </View>
    </ScreenLayout>
  );
}
