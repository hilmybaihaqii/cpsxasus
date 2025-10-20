import React from "react";
import { StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";

// Impor komponen TabItem dan tipe data ikon dari file terpisah
import TabItem, { IconName, iconNames } from "./TabItem";

// --- Komponen Utama Tab Bar ---
export default function IconTextTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={80}
      tint="light" 
      style={[
        styles.tabBarContainer,
        {
          bottom: insets.bottom + 24,
        },
      ]}
    >
      {state.routes.map((route) => {
        const isFocused =
          state.routes.findIndex((r) => r.key === route.key) === state.index;

        const routeName = route.name as IconName;

        if (!iconNames.includes(routeName)) {
          return null;
        }

        const onPress = () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(routeName);
          }
        };

        return (
          <TabItem
            key={route.key}
            isFocused={isFocused}
            routeName={routeName}
            onPress={onPress}
          />
        );
      })}
    </BlurView>
  );
}

// --- StyleSheet untuk Container BlurView ---
const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    left: 24,
    right: 24,
    height: 70,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
  },
});