import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, View } from "react-native";
import React from "react";

export default function ScreenLayout({ children, whitebg }) {
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
      </SafeAreaView>
    </View>
  );
}
