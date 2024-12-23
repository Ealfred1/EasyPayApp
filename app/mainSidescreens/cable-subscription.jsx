import React, { useEffect, useState } from "react";
import ScreenLayout from "../../components/ScreenLayout";
import { ActivityIndicator, Modal, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Fonts } from "../../constants/Fonts";
import PrimaryInput from "../../components/PrimaryInput";
import PrimaryButton from "../../components/PrimaryButton";
import Toast from "react-native-toast-message";
import { createAuthAxios } from "@/api/authAxios";
import PinPopup from "../../components/PinPopup";
import { Colors } from "../../constants/Colors";
export default function CableSubscription() {
  const authAxios = createAuthAxios();
  const [cables, setCables] = useState([]);
  const [selectedCable, setSelectedCable] = useState("");
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [packageDetails, setPackageDetails] = useState({});
  const [iucNumber, setIucNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0.0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState("");

  useEffect(() => {
    authAxios
      .post("/cable/", { action: "get_cables" })
      .then((res) => setCables(res.data.message))
      .catch((err) => console.error(err.response?.data || err.message));
  }, []);

  useEffect(() => {
    if (iucNumber.length === 10) {
      setLoading(true);
      authAxios
        .post("/cable/", {
          action: "validate",
          vendor_id: selectedCable,
          account_number: iucNumber,
        })
        .then((res) => {
          const { status, data } = res.data.message;
          if (status === "success") {
            setAccountName(data.customer_name);

            Toast.show({
              type: "success",
              text1: "IUC number validated!",
            });
          } else {
            setAccountName("");

            Toast.show({
              type: "error",
              text1: "Validation failed. Please check the IUC number.",
            });
          }
        })
        .catch((err) => {
          setAccountName("");

          Toast.show({
            type: "error",
            text1: err.response?.data?.message || err.message,
          });
        })
        .finally(() => setLoading(false));
    } else if (iucNumber.length < 10) {
      setAccountName("");
      setLoading(false);
    }
  }, [iucNumber]);

  // Handle opening the modal
  // const handlePay = () => setIsModalOpen(true);

  // Handle closing the modal
  const handleCloseModal = () => setIsModalOpen(false);

  // const handleSubmitPin = () => {
  //   setIsModalOpen(false);
  //   Toast.show({
  //     type: "success",
  //     text1: "Payment processed!",
  //   });
  // };

  useEffect(() => {
    setAccountName("");
  }, [selectedCable]);

  const fetchCableDetails = (cableKey) => {
    setLoading(true);
    setAccountName("");
    authAxios
      .post("/cable/", { action: "get_packages", vendor_id: cableKey })
      .then((res) => {
        setLoading(false);
        setPackages(res.data.message.packages);
        setSelectedPackage("");
        setPackageDetails({});
        setIucNumber("");
      })
      .catch((err) => console.error(err.response?.data || err.message));
  };

  const handleCableChange = (e) => {
    const selectedKey = e;
    setSelectedCable(selectedKey);
    fetchCableDetails(selectedKey);
  };

  const handlePackageChange = (e) => {
    const selectedPackageId = e;
    setSelectedPackage(selectedPackageId);

    const selectedPackageDetails = packages.find(
      (pkg) => pkg.package === selectedPackageId
    );
    if (selectedPackageDetails) {
      setPackageDetails({
        price: parseInt(selectedPackageDetails.price) + 150,
        fee: (parseInt(selectedPackageDetails.Fee) + 200).toString(),
      });
    }
  };

  const handlePinSuccess = () => {
    setIsModalOpen(false);
    setLoading(true);

    authAxios
      .post("/cable/", {
        action: "purchase",
        vendor_id: selectedCable,
        package_id: selectedPackage,
        account_number: iucNumber,
      })
      .then((res) => {
        if (res.data.status === "error") {
          Toast.show({
            type: "error",
            text1: res.data.message.message,
          });
        } else {
          Toast.show({
            type: "success",
            text1: res.data.message.message,
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
      .finally(() => setLoading(false));
  };

  const handlePinError = () => {
    setPin("");
  };

  const handlePurchase = () => {
    if (!selectedCable || !selectedPackage || !iucNumber) {
      Toast.show({
        type: "error",
        text1: "Please select a cable, package, and enter your IUC number.",
      });

      return;
    }
    setIsModalOpen(true);
  };
  return (
    <ScreenLayout>
      <Modal visible={loading} transparent={true}>
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
          Cable Type
        </Text>
        <Picker
          selectedValue={selectedCable}
          selectionColor={Colors.mainBlue}
          onValueChange={(e) => handleCableChange(e)}
        >
          <Picker.Item enabled={false} label="Select a Cable"></Picker.Item>
          {cables.map((cable, index) => (
            <Picker.Item
              key={index}
              value={Object.keys(cable)[0]}
              label={Object.values(cable)[0]}
            ></Picker.Item>
          ))}
        </Picker>
      </View>

      {cables.length > 0 && (
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
            Select Package
          </Text>
          <Picker
            selectedValue={selectedPackage}
            selectionColor={Colors.mainBlue}
            onValueChange={(e) => handlePackageChange(e)}
          >
            <Picker.Item enabled={false} label="Select a Package"></Picker.Item>
            {packages.map((pkg) => (
              <Picker.Item
                key={pkg.package}
                value={pkg.package}
                label={pkg.package_name}
              ></Picker.Item>
            ))}
          </Picker>
        </View>
      )}

      {selectedPackage && (
        <PrimaryInput
          inputText="Price"
          editable={false}
          value={packageDetails.price.toString()}
        ></PrimaryInput>
      )}
      <PrimaryInput
        inputText={"IUC Number"}
        // keyboardType={"numeric"}
        value={iucNumber}
        onChangeText={(e) => setIucNumber(e)}
        maxLength={10}
      ></PrimaryInput>

      {accountName && (
        <PrimaryInput
          inputText="Account Name"
          value={accountName}
          editable={false}
        ></PrimaryInput>
      )}

      <PrimaryButton
        btnText={
          loading ? (
            <ActivityIndicator size={20} color={"white"}></ActivityIndicator>
          ) : (
            "Purchase"
          )
        }
        onPress={() => handlePurchase()}
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
