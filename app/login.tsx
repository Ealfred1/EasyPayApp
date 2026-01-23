// import React from "react";
// import ScreenLayout from "../components/ScreenLayout";
// import CustomizableMainText from "../components/CustomizableMainText";
// import { Colors } from "../constants/Colors";
// import { TouchableOpacity, View } from "react-native";
// import PrimaryInput from "../components/PrimaryInput";
// import PrimaryButton from "../components/PrimaryButton";
// import { router } from "expo-router";

// export default function login() {
//   return (
//     <ScreenLayout>
//       <View
//         style={{
//           marginTop: 30,

//           flex: 1,
//         }}
//       >
//         <CustomizableMainText
//           style={{
//             color: Colors.mainTheme,
//             fontSize: 20,
//             textAlign: "center",
//           }}
//         >
//           Sign In
//         </CustomizableMainText>
//         <CustomizableMainText
//           style={{
//             color: "black",
//             opacity: 0.6,
//             textAlign: "center",
//           }}
//         >
//           Enter your credentials to Login to your account
//         </CustomizableMainText>

//         <PrimaryInput inputText="Username"></PrimaryInput>
//         <PrimaryInput inputText="Password"></PrimaryInput>
//         <TouchableOpacity
//           style={{ alignSelf: "flex-end" }}
//           onPress={() => {
//             router.replace("/forgetpassword");
//           }}
//         >
//           <CustomizableMainText
//             style={{
//               color: Colors.secondaryBlue,
//             }}
//           >
//             Forget your Password?
//           </CustomizableMainText>
//         </TouchableOpacity>

//         <PrimaryButton btnText={"Login"}></PrimaryButton>
//         <TouchableOpacity
//           style={{ marginTop: "auto" }}
//           onPress={() => {
//             router.replace("/register");
//           }}
//         >
//           <CustomizableMainText
//             style={{
//               color: "black",
//               textAlign: "center",
//               opacity: 0.7,
//             }}
//           >
//             Don't have an account?
//             <CustomizableMainText
//               style={{
//                 color: Colors.secondaryBlue,
//                 opacity: 1,
//               }}
//             >
//               {" "}
//               Sign up
//             </CustomizableMainText>
//           </CustomizableMainText>
//         </TouchableOpacity>
//       </View>
//     </ScreenLayout>
//   );
// }

////////

import React, { useState, useContext } from "react";
import ScreenLayout from "../components/ScreenLayout";
import CustomizableMainText from "../components/CustomizableMainText";
import { Colors } from "../constants/Colors";
import SecureInput from "../components/SecureInput";
import {
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";
import { AuthContext } from "../context/AuthContext"; // Context for login logic
import { router } from "expo-router";
import { Fonts } from "../constants/Fonts";
import MainHeader from "../components/MainHeader";
// import { toast } from "react-toastify"; // Replace with a React Native alternative if needed

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { loginUser } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginUser(username, password, "Login Successful");
      router.replace("/mainSidescreens"); // Navigate to the dashboard on success
    } catch (error) {
      // Alert.alert("Error", "Login failed. Please check your credentials.");
      Toast.show({
        type: "error",
        text1: "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout>
      <View
        style={{
          justifyContent: "center",

          flex: 1,
        }}
      >
        <MainHeader
          style={
            {
              // textAlign: "center",
            }
          }
        >
          NextOp9ja
        </MainHeader>
        <CustomizableMainText
          style={{
            color: Colors.mainTheme,
            fontSize: 20,
            textAlign: "center",
            fontFamily: Fonts.semiBold,
            marginTop: 30,
          }}
        >
          Sign In
        </CustomizableMainText>
        <CustomizableMainText
          style={{
            color: "black",
            opacity: 0.6,
            textAlign: "center",
            fontSize: 12,
          }}
        >
          Enter your credentials to Login to your account
        </CustomizableMainText>

        <PrimaryInput
          inputText="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <SecureInput
          inputText="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></SecureInput>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => {
            router.replace("/forgetpassword");
          }}
        >
          <CustomizableMainText
            style={{
              color: Colors.secondaryBlue,
              marginVertical: 10,
            }}
          >
            Forget your Password?
          </CustomizableMainText>
        </TouchableOpacity>

        <PrimaryButton
          btnText={
            loading ? (
              <ActivityIndicator size={20} color={"white"}></ActivityIndicator>
            ) : (
              "Login"
            )
          }
          disabled={loading}
          onPress={handleLogin}
        />
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => {
            router.replace("/register");
          }}
        >
          <CustomizableMainText
            style={{
              color: "black",
              textAlign: "center",
              // opacity: 0.7,
            }}
          >
            Don&apos;t have an account?
            <CustomizableMainText
              style={{
                color: Colors.secondaryBlue,
                opacity: 1,
              }}
            >
              {" "}
              Sign up
            </CustomizableMainText>
          </CustomizableMainText>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}
