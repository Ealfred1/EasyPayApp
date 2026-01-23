import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from "react-native";
import React from "react";
// ScreenLayout wrapper
export default function ScreenLayout({ children, whitebg }: any) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <StatusBar style="dark"></StatusBar>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: "white",
            }}
            contentContainerStyle={{
              paddingBottom: 60,
              flexGrow: 1,
              // backgroundColor: "red",
            }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
