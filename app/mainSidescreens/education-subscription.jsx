import React, { useEffect, useState } from "react";
import ScreenLayout from "../../components/ScreenLayout";
import { createAuthAxios } from "../../api/authAxios";
import { ActivityIndicator, Modal, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Fonts } from "../../constants/Fonts";
import PrimaryInput from "../../components/PrimaryInput";
import PrimaryButton from "../../components/PrimaryButton";
import PinPopup from "../../components/PinPopup";

import Toast from "react-native-toast-message";
export default function EducationSubscription() {
  const authAxios = createAuthAxios();
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [packageDetails, setPackageDetails] = useState({});
  const [iucNumber, setIucNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState("");
  console.log(packages);

  useEffect(() => {
    authAxios
      .post("/education/", { action: "get_vendor" })
      .then((res) => setVendors(res.data.message))
      .catch((err) => console.error(err.response?.data || err.message));
  }, []);

  const handleCloseModal = () => setIsModalOpen(false);

  const handlePinSuccess = () => {
    setIsModalOpen(false);
    setLoading(true);

    authAxios
      .post("/education/", {
        action: "purchase",
        vendor_id: selectedVendor,
        package_id: selectedPackage,
        number: iucNumber,
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

  const fetchVendorPackages = (vendorId) => {
    setLoading(true);
    authAxios
      .post("/education/", { action: "get_packages", vendor_id: vendorId })
      .then((res) => {
        setLoading(false);
        setPackages(res.data.message.packages);
        setSelectedPackage("");
        setPackageDetails({});
      })
      .catch((err) => {
        setLoading(false);
        console.error(err.response?.data || err.message);
      });
  };

  const handleVendorChange = (e) => {
    const vendorId = e;
    setSelectedVendor(vendorId);
    fetchVendorPackages(vendorId);
  };

  const handlePackageChange = (e) => {
    const packageId = e;
    setSelectedPackage(packageId);

    const packageInfo = packages.find((pkg) => pkg.package === packageId);
    if (packageInfo) {
      setPackageDetails({
        price: parseInt(packageInfo.price) + 150,
        fee: (parseInt(packageInfo.Fee) + 200).toString(),
      });
    }
  };
  console.log(packageDetails.price, "fu ");

  const handlePurchase = () => {
    if (!selectedVendor || !selectedPackage) {
      Toast.show({
        type: "error",
        text1: "Please select a vendor and package.",
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
            fontSize: 10,
            fontFamily: Fonts.semiBold,
            opacity: 0.7,
          }}
        >
          Select Vendor
        </Text>
        <Picker onValueChange={(e) => handleVendorChange(e)}>
          <Picker.Item label="Select a Vendor" enabled={false}></Picker.Item>
          {vendors.map((vendor, index) => {
            return (
              <Picker.Item
                label={Object.values(vendor)[0]}
                value={Object.keys(vendor)[0]}
                key={index}
              />
            );
          })}
        </Picker>
      </View>
      {packages.length > 0 && (
        <View>
          <Text
            style={{
              fontSize: 10,
              fontFamily: Fonts.semiBold,
              opacity: 0.7,
            }}
          >
            Select Package
          </Text>
          <Picker onValueChange={(e) => handlePackageChange(e)}>
            <Picker.Item label="Select a Package" enabled={false}></Picker.Item>
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
          value={packageDetails.price.toString()}
          keyboardType="numeric"
          editable={false}
          inputText={"Price"}
        ></PrimaryInput>
      )}

      <PrimaryInput
        inputText={"Number"}
        keyboardType={"numeric"}
        value={iucNumber}
        onChangeText={(e) => {
          setIucNumber(e);
        }}
        placeholder="Enter your JAMB or WAEC number"
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
        onPress={() => handlePurchase()}
      ></PrimaryButton>

      <PinPopup
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pin={pin}
        setPin={setPin}
        onSuccess={handlePinSuccess}
        onError={handlePinError}
      ></PinPopup>
    </ScreenLayout>
  );
}
