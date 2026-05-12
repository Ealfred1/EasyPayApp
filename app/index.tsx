import { Redirect } from "expo-router";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { accessToken, loading, otpSent } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (accessToken) {
    return <Redirect href={"/mainSidescreens"} />;
  }

  if (otpSent) {
    return <Redirect href={"/register"} />;
  }

  return <Redirect href={"/login"} />;
}
