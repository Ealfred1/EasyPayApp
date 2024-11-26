import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
export default function _layout() {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <Drawer>
        <Drawer.Screen name="index" options={{}}></Drawer.Screen>
        <Drawer.Screen
          name="fundAccount"
          options={{ headerTitle: "Fund Account" }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="buyData"
          options={{
            headerTitle: "Buy Data",
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="airtime-purchase"
          options={{
            headerTitle: "Airtime Purchase",
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="cable-subscription"
          options={{
            headerTitle: "Cable Subscription",
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="education-subscription"
          options={{
            headerTitle: "Education Subscription",
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="refer-screen"
          options={{
            headerTitle: "Refer a Friend",
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="settings"
          options={{
            headerTitle: "Settings",
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="faq"
          options={{
            headerTitle: "FAQ",
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="support-center"
          options={{
            headerTitle: "Support Center",
          }}
        ></Drawer.Screen>
      </Drawer>
    </GestureHandlerRootView>
  );
}
