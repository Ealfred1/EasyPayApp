import React, { useContext, useEffect, useState } from "react";
import ScreenLayout from "../../components/ScreenLayout";
import ActionCard from "../../components/ActionCard";
import { Colors } from "../../constants/Colors";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { createAuthAxios } from "@/api/authAxios";
import { DashboardContext } from "../../context/DashboardContext";
import { ToastAndroid, TouchableOpacity, View } from "react-native";
import CustomizableMainText from "../../components/CustomizableMainText";
import PrimaryInput from "../../components/PrimaryInput";
import PrimaryButton from "../../components/PrimaryButton";
import SecureInput from "../../components/SecureInput";
import Toast from "react-native-toast-message";
import { Fonts } from "../../constants/Fonts";
export default function Settings() {
  const authAxios = createAuthAxios();
  const { user, setUser: updateGeneralInfo } = useContext(DashboardContext);
  const [activeTab, setActiveTab] = useState("main");
  const [selectedTab, setSelectedTab] = useState(null);
  const [showResetPin, setShowResetPin] = useState(false);

  // Form data state
  const [generalInfo, setGeneralInfo] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    user_pin: user?.pin,
  });
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [pinData, setPinData] = useState({
    old_pin: "",
    new_pin: "",
    confirm_pin: "",
  });
  const [resetPinData, setResetPinData] = useState({
    password: "",
    new_pin: "",
  });

  useEffect(() => {
    if (user) {
      setGeneralInfo({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        username: user.username || "",
        phone_number: user.phone_number || "",
        email: user.email || "",
        user_pin: user.pin,
      });
    }
  }, [user]);
  console.log(generalInfo, "user");

  const UpdatePassword = (e) => {
    authAxios
      .post("/users/auth/users/set_password/", {
        current_password: e.old_password,
        new_password: e.new_password,
      })
      .then((res) => {
        if (res.status === 204) {
          toast.success("Password updated successfully");
        }
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: err.response?.data.message || "Server Error",
        });
        console.error(err.response?.data || err.message);
      });
  };

  const UpdatePin = (e) => {
    if (generalInfo.user_pin == null) {
      authAxios
        .post("/pin/", { action: "create", new_pin: e.new_pin })

        .then((res) =>
          Toast.show({
            type: "success",
            text1: res.data.message,
          })
        )
        .catch((err) =>
          Toast.show({
            type: "error",
            text1: err.response?.data.message || err.message,
          })
        );
    } else {
      authAxios
        .post("/pin/", {
          action: "change",
          prev_pin: e.old_pin,
          new_pin: e.new_pin,
        })
        .then((res) =>
          Toast.show({
            type: "success",
            text1: res.data.message,
          })
        )
        .catch((err) =>
          Toast.show({
            type: "error",
            text1: err.response?.data.message || err.message,
          })
        );
    }
  };

  const ResetPin = (e) => {
    authAxios
      .post("/pin/", {
        action: "reset",
        password: resetPinData.password,
        new_pin: resetPinData.new_pin,
      })
      .then((res) =>
        Toast.show({
          type: "success",
          text1: res.data.message,
        })
      )
      .catch((err) =>
        Toast.show({
          type: "error",
          text1: err.response?.data.message || "Server Error",
        })
      );
  };

  const handleGeneralSubmit = (e) => {
    updateGeneralInfo(generalInfo);
    Toast.show({
      type: "success",
      text1: "Update Successful",
    });
  };
  const handlePasswordSubmit = (e) => {
    if (passwordData.new_password === passwordData.confirm_password)
      UpdatePassword(passwordData);
    else {
      ToastAndroid.show("Passwords don't match!", ToastAndroid.LONG);
    }
  };

  const handlePinSubmit = (e) => {
    if (pinData.new_pin === pinData.confirm_pin) UpdatePin(pinData);
    else {
      ToastAndroid.show("Pins don't match!", ToastAndroid.LONG);
    }
  };
  console.log(activeTab, selectedTab, showResetPin);

  return (
    <ScreenLayout>
      {activeTab == "main" ? (
        <>
          <ActionCard
            bgColor={Colors.mainBlue}
            mainTxt={"Update your general information"}
            headerTxt={"User Information"}
            iconbgColor={Colors.secondaryBlue}
            onPress={() => {
              console.log("hmm");

              setActiveTab("settings");
              setSelectedTab("general");
            }}
          >
            <AntDesign name="user" size={30} color={"white"}></AntDesign>
          </ActionCard>
          <ActionCard
            bgColor={"rgb(220, 252, 231)"}
            iconbgColor={"rgb(134 ,239 ,172)"}
            mainTxt={"Update your password"}
            headerTxt={"Change Password"}
            onPress={() => {
              setActiveTab("settings");
              setSelectedTab("password");
            }}
          >
            <AntDesign size={30} color={"white"} name="lock1"></AntDesign>
          </ActionCard>
          <ActionCard
            bgColor={"rgb(254 ,249 ,195)"}
            iconbgColor={"rgb(253,224,71)"}
            mainTxt={"Update your transaction PIN"}
            onPress={() => {
              setActiveTab("settings");
              setSelectedTab("pin");
            }}
            headerTxt={"Change Pin"}
          >
            <Feather size={30} color={"white"} name="key"></Feather>
          </ActionCard>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              if (showResetPin) setShowResetPin(false);
              // Return to Change PIN tab if in Reset PIN
              else setActiveTab("main"); // Return to main tab
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Ionicons name="arrow-back" size={20}></Ionicons>
              <CustomizableMainText
                style={{
                  color: "black",
                  fontSize: 14,
                }}
              >
                Go back
              </CustomizableMainText>
            </View>
          </TouchableOpacity>

          {selectedTab == "general" && (
            <View>
              <CustomizableMainText
                style={{
                  fontSize: 15,
                  color: "black",
                  textAlign: "center",
                  fontFamily: Fonts.semiBold,
                }}
              >
                User Information
              </CustomizableMainText>
              <PrimaryInput
                inputText={"Firstname"}
                value={generalInfo.first_name}
                onChangeText={(e) =>
                  setGeneralInfo({ ...generalInfo, first_name: e })
                }
              ></PrimaryInput>
              <PrimaryInput
                inputText={"Lastname"}
                value={generalInfo.last_name}
                onChangeText={(e) =>
                  setGeneralInfo({ ...generalInfo, last_name: e })
                }
              ></PrimaryInput>
              <PrimaryInput
                inputText={"Username"}
                value={generalInfo.username}
                onChangeText={(e) =>
                  setGeneralInfo({ ...generalInfo, username: e })
                }
              ></PrimaryInput>
              <PrimaryInput
                inputText={"Phone Number"}
                value={generalInfo.phone_number}
                onChangeText={(e) =>
                  setGeneralInfo({ ...generalInfo, phone_number: e })
                }
              ></PrimaryInput>
              <PrimaryInput
                inputText={"Email"}
                value={generalInfo.email}
                onChangeText={(e) =>
                  setGeneralInfo({ ...generalInfo, email: e })
                }
              ></PrimaryInput>
              <PrimaryButton
                btnText={"Save Changes"}
                onPress={() => handleGeneralSubmit()}
              ></PrimaryButton>
            </View>
          )}

          {selectedTab == "pin" &&
            (!showResetPin ? (
              <>
                <CustomizableMainText
                  style={{
                    fontSize: 15,
                    color: "black",
                    textAlign: "center",
                    fontFamily: Fonts.semiBold,
                  }}
                >
                  Change PIN
                </CustomizableMainText>
                <PrimaryInput
                  inputText={"Old PIN"}
                  value={pinData.old_pin}
                  onChangeText={(e) => {
                    setPinData({ ...pinData, old_pin: e });
                  }}
                  keyboardType="numeric"
                  maxLength={4}
                ></PrimaryInput>
                <PrimaryInput
                  inputText={"New PIN"}
                  value={pinData.new_pin}
                  onChangeText={(e) => {
                    setPinData({ ...pinData, new_pin: e });
                  }}
                  keyboardType="numeric"
                  maxLength={4}
                ></PrimaryInput>
                <PrimaryInput
                  inputText={"Confirm New PIN"}
                  value={pinData.confirm_pin}
                  onChangeText={(e) => {
                    setPinData({ ...pinData, confirm_pin: e });
                  }}
                  keyboardType="numeric"
                  maxLength={4}
                ></PrimaryInput>
                <PrimaryButton
                  btnText={"Change PIN"}
                  onPress={handlePinSubmit}
                ></PrimaryButton>
                <TouchableOpacity onPress={() => setShowResetPin(true)}>
                  <CustomizableMainText
                    style={{
                      color: "black",
                      textAlign: "center",
                      color: Colors.secondaryBlue,
                    }}
                  >
                    Reset Pin
                  </CustomizableMainText>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <CustomizableMainText
                  style={{
                    fontSize: 15,
                    color: "black",
                    textAlign: "center",
                    fontFamily: Fonts.semiBold,
                  }}
                >
                  Reset PIN
                </CustomizableMainText>
                <SecureInput
                  inputText={"Current Password"}
                  value={resetPinData.password}
                  onChangeText={(e) => {
                    setResetPinData({ ...resetPinData, password: e });
                  }}
                />
                <PrimaryInput
                  inputText={"New PIN"}
                  value={resetPinData.new_pin}
                  onChangeText={(e) => {
                    setResetPinData({ ...resetPinData, new_pin: e });
                  }}
                  keyboardType="numeric"
                  maxLength={4}
                ></PrimaryInput>
                <PrimaryButton
                  btnText={"Reset Pin"}
                  onPress={() => ResetPin()}
                ></PrimaryButton>
              </>
            ))}

          {selectedTab == "password" && (
            <>
              <CustomizableMainText
                style={{
                  fontSize: 15,
                  color: "black",
                  textAlign: "center",
                  fontFamily: Fonts.semiBold,
                }}
              >
                Change Password
              </CustomizableMainText>
              <SecureInput
                inputText={"Old Password"}
                value={passwordData.old_password}
                onChangeText={(e) => {
                  setPasswordData({
                    ...passwordData,
                    old_password: e,
                  });
                }}
              />
              <SecureInput
                inputText={"New Password"}
                value={passwordData.new_password}
                onChangeText={(e) => {
                  setPasswordData({
                    ...passwordData,
                    new_password: e,
                  });
                }}
              />
              <SecureInput
                inputText={"Confirm New Password"}
                value={passwordData.confirm_password}
                onChangeText={(e) => {
                  setPasswordData({
                    ...passwordData,
                    confirm_password: e,
                  });
                }}
              />
              <PrimaryButton
                btnText="Change Password"
                onPress={() => handlePasswordSubmit()}
              ></PrimaryButton>
            </>
          )}
        </>
      )}
    </ScreenLayout>
  );
}
