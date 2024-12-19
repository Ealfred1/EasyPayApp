import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import MainHeader from "../../components/MainHeader";

export default function _layout() {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <Drawer
        screenOptions={{
          drawerItemStyle: {
            marginVertical: 5,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            headerTitle: () => {
              return <MainHeader>EasyPay</MainHeader>;
            },
            // title: "Dashboard",
            drawerIcon: ({ color, size, focused }) => {
              return <Ionicons name="grid-outline" size={size} color={color} />;
            },
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="fundAccount"
          options={{
            headerTitle: "Fund Account",

            title: "Fund Account",
            drawerIcon: ({ color, size, focused }) => {
              return (
                <Ionicons name="wallet-outline" size={size} color={color} />
              );
            },
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="buyData"
          options={{
            headerTitle: "Buy Data",
            title: "Data Sub",
            drawerIcon: ({ color, size, focused }) => {
              return <Ionicons name="wifi" size={size} color={color} />;
            },
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="airtime-purchase"
          options={{
            headerTitle: "Airtime Purchase",
            title: "Airtime Sub",
            drawerIcon: ({ color, size, focused }) => {
              return <Feather name="smartphone" size={size} color={color} />;
            },
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="cable-subscription"
          options={{
            headerTitle: "Cable Subscription",
            title: "Cable Sub",
            drawerIcon: ({ color, size, focused }) => {
              return <AntDesign name="creditcard" size={size} color={color} />;
            },
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="education-subscription"
          options={{
            headerTitle: "Education Subscription",
            title: "Education Sub",
            drawerIcon: ({ color, size, focused }) => {
              return <Ionicons name="book" size={size} color={color} />;
            },
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="refer-screen"
          options={{
            headerTitle: "Refer a Friend",
            title: "referrals",
            drawerIcon: ({ color, size, focused }) => {
              return <Ionicons name="people" size={size} color={color} />;
            },
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="settings"
          options={{
            headerTitle: "Settings",
            title: "Settings",
            drawerIcon: ({ color, size, focused }) => {
              return <Ionicons name="settings" size={size} color={color} />;
            },
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="faq"
          options={{
            headerTitle: "FAQ",
            title: "FAQs",
            drawerIcon: ({ color, size, focused }) => {
              return (
                <AntDesign name="questioncircle" size={size} color={color} />
              );
            },
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="support-center"
          options={{
            headerTitle: "Support Center",
            title: "Contact Us",
            drawerIcon: ({ color, size, focused }) => {
              return <Ionicons name="mail" size={size} color={color} />;
            },
          }}
        ></Drawer.Screen>
      </Drawer>
    </GestureHandlerRootView>
  );
}
