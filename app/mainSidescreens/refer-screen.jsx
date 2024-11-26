import React from "react";
import ScreenLayout from "../../components/ScreenLayout";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import CustomizableMainText from "../../components/CustomizableMainText";
import { Fonts } from "../../constants/Fonts";
import PrimaryButton from "../../components/PrimaryButton";
import { Colors } from "../../constants/Colors";
export default function ReferScreen() {
  return (
    <ScreenLayout whitebg>
      <View
        style={{
          flex: 1,
          alignItems: "center",

          //   backgroundColor: "pink",
        }}
      >
        <Image
          source={require("../../assets/assets/frens.jpg")}
          width={30}
          height={30}
          style={{
            width: 300,
            height: 300,
            alignSelf: "center",
          }}
        ></Image>
        <CustomizableMainText
          style={{
            fontFamily: Fonts.BoldText,
            fontSize: 14,
          }}
        >
          Refer a friend, Earn a reward
        </CustomizableMainText>
        <CustomizableMainText
          style={{
            opacity: 0.7,
            fontFamily: Fonts.regularText,
            textAlign: "center",
          }}
        >
          Invite a friend to signup and make a purchase Earn ₦10 on every
          purchase
        </CustomizableMainText>
      </View>
      <View
        style={{
          flexDirection: "row",
          borderRadius: 10,
          borderWidth: 2,
          borderColor: Colors.mainBlue,
          overflow: "hidden",
          marginVertical: 10,
        }}
      >
        <TextInput
          style={{
            padding: 10,
            // backgroundColor: "red",
            flex: 0.7,
          }}
        ></TextInput>
        <TouchableOpacity
          style={{
            flex: 0.3,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.mainBlue,
          }}
        >
          <CustomizableMainText
            style={{
              fontFamily: Fonts.semiBold,
              color: "white",
            }}
          >
            Copy Link
          </CustomizableMainText>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}
