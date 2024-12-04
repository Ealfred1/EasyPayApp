import React, { useState } from "react";
import { Image, Text, View } from "react-native";
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
import ModalDropdown from "react-native-modal-dropdown";
import { Picker } from "@react-native-picker/picker";

// import { MainHeader } from "../../components/MainHeader";
export default function BuyData() {
  const [network, setNetwork] = useState(null);
  const networks = [
    {
      id: "1",
      name: "MTN",
      color: "",
      logo: <Mtn width={50} height={50}></Mtn>,
    },
    {
      id: "2",
      name: "AIRTEL",
      logo: <Airtel width={50} height={50}></Airtel>,
    },
    {
      id: "3",
      name: "9MOBILE",
      logo: <NineMobile width={50} height={50} />,
    },
    { id: "4", name: "GLO", logo: <Glo width={50} height={50}></Glo> },
  ];

  return (
    <ScreenLayout>
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
                setNetwork(item.name);
              }}
              key={item.name}
              style={{
                backgroundColor: Colors.mainBlue,
                borderRadius: 10,
                padding: 10,
                opacity: network == item.name ? 1 : 0.5,
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
        ></PrimaryInput>

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
            Data Type
          </Text>
          <Picker selectedValue={"java"}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Python" value="python" />
          </Picker>
        </View>

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
            Data Plan
          </Text>
          <Picker selectedValue={"java"}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Python" value="python" />
          </Picker>
        </View>
        <PrimaryInput
          inputText={"Amount"}
          keyboardType="numeric"
        ></PrimaryInput>
        <PrimaryInput inputText={"Month Validation"}></PrimaryInput>
        <PrimaryButton btnText={"Purchase"}></PrimaryButton>
      </View>
    </ScreenLayout>
  );
}
