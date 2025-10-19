import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { History, Home, LucideIcon, Settings } from "lucide-react-native";
import { MotiView } from "moti";
import React from "react";
import { Pressable, Text, View } from "react-native";
// [FIX 1] Impor 'useSafeAreaInsets' untuk mendeteksi tombol navigasi Android
import { useSafeAreaInsets } from "react-native-safe-area-context";

// --- Tipe dan Data Ikon ---
type IconName = "home" | "history" | "settings";
const icons: { [key in IconName]: LucideIcon } = {
  home: Home,
  history: History,
  settings: Settings,
};
const iconNames: IconName[] = ["home", "history", "settings"];

// --- Komponen untuk satu item Tab ---
const TabItem = ({
  isFocused,
  routeName,
  onPress,
}: {
  isFocused: boolean;
  routeName: IconName;
  onPress: () => void;
}) => {
  const Icon = icons[routeName];
  const label = routeName.charAt(0).toUpperCase() + routeName.slice(1);

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-center h-full"
    >
      <View className="items-center justify-center gap-y-1">
        <MotiView
          animate={{
            scale: isFocused ? 1.1 : 1,
            translateY: isFocused ? -4 : 0,
          }}
          transition={{
            type: "spring",
            damping: 14,
            stiffness: 100,
          }}
        >
          <Icon
            size={28}
            // [FIX 2] Ganti warna hardcode ungu menjadi merah primer Anda
            color={isFocused ? "#BA2025" : "#6b7280"}
            strokeWidth={isFocused ? 2.5 : 2}
          />
        </MotiView>

        {isFocused && (
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 100,
            }}
          >
            {/* [FIX 3] Ganti kelas 'text-indigo-700' menjadi 'text-primary' */}
            <Text className="text-xs font-semibold text-primary">{label}</Text>
          </MotiView>
        )}
      </View>
    </Pressable>
  );
};

// --- Komponen Utama Tab Bar ---
export default function IconTextTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  // [FIX 4] Dapatkan nilai 'bottom' dari safe area
  const insets = useSafeAreaInsets();

  return (
    <View
      // [FIX 5] Hapus 'bottom-6', kita akan gunakan 'style'
      className="absolute left-6 right-6 h-[70px] bg-white rounded-full flex-row justify-around items-center shadow-lg shadow-black/10"
      // [FIX 6] Atur 'bottom' secara dinamis:
      // 'insets.bottom' (jarak aman dari bawah) + 24px (jarak margin 'bottom-6' Anda)
      style={{ bottom: insets.bottom + 24 }}
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
            key={routeName}
            isFocused={isFocused}
            routeName={routeName}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}
