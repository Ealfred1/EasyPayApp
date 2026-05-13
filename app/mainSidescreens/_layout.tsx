import React from "react";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import MainHeader from "../../components/MainHeader";

function CustomDrawerContent({ navigation }: any) {
  const router = useRouter();

  const menuItems = [
    { name: "index", label: "Dashboard", icon: "grid-outline", iconFamily: "Ionicons" },
    { name: "fundAccount", label: "Fund Account", icon: "wallet-outline", iconFamily: "Ionicons" },
    { name: "buyData", label: "Data Sub", icon: "wifi", iconFamily: "Ionicons" },
    { name: "airtime-purchase", label: "Airtime Sub", icon: "smartphone", iconFamily: "Feather" },
    { name: "cable-subscription", label: "Cable Sub", icon: "tv", iconFamily: "Feather" },
    { name: "education-subscription", label: "Education Sub", icon: "book", iconFamily: "Ionicons" },
    { name: "refer-screen", label: "Referrals", icon: "people", iconFamily: "Ionicons" },
    { name: "settings", label: "Settings", icon: "settings", iconFamily: "Ionicons" },
    { name: "faq", label: "FAQs", icon: "questioncircleo", iconFamily: "AntDesign" },
    { name: "support-center", label: "Contact Us", icon: "mail", iconFamily: "Ionicons" },
  ];

  const renderIcon = (item: typeof menuItems[0], color: string, size: number) => {
    switch (item.iconFamily) {
      case "AntDesign":
        return <AntDesign name={item.icon as any} size={size} color={color} />;
      case "Feather":
        return <Feather name={item.icon as any} size={size} color={color} />;
      default:
        return <Ionicons name={item.icon as any} size={size} color={color} />;
    }
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Image
          source={require("../../../assets/images/icon.png")}
          style={styles.drawerLogo}
        />
        <Text style={styles.drawerTitle}>NextOp9ja</Text>
        <Text style={styles.drawerSubtitle}>VTU Services</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.name)}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconContainer}>
              {renderIcon(item, Colors.secondaryBlue, 22)}
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            width: 280,
          },
          drawerItemStyle: {
            marginVertical: 5,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            headerTitle: () => {
              return <MainHeader>NextOp9ja</MainHeader>;
            },
            headerStyle: {
              height: 90,
            },
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="fundAccount"
          options={{
            headerTitle: "Fund Account",
          }}
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

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  drawerHeader: {
    backgroundColor: Colors.mainTheme,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  drawerLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.5)",
  },
  drawerTitle: {
    fontSize: 22,
    fontFamily: Fonts.semiBold,
    color: "#ffffff",
  },
  drawerSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(51, 161, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 15,
    color: "#333",
    fontFamily: Fonts.regularText || "Poppins_400Regular",
  },
});
