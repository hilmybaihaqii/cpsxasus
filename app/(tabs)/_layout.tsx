// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { View } from "react-native";
import React from "react";
import CustomHeader from "../../components/navigation/CustomHeader";
import CustomTabBar from "../../components/navigation/CustomTabBar";

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F6EFD2" }}>
      <CustomHeader forceShowTabsHeader={true} />

      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="history" />
        <Tabs.Screen name="settings" />
      </Tabs>
    </View>
  );
}