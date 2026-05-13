import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import React from "react";

export default function ScreenLayout({ children, whitebg, refreshing, onRefresh }: any) {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark"></StatusBar>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: whitebg ? "white" : "#f5f5f5",
            }}
            contentContainerStyle={{
              paddingBottom: 60,
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              refreshing !== undefined && onRefresh ? (
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007BFF" />
              ) : undefined
            }
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
