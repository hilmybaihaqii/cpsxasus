import React from "react";
import { Pressable, Text, View } from "react-native";
import { MotiView } from "moti";
import { LucideIcon, Home, History, Settings } from "lucide-react-native";

// --- Tipe dan Data Ikon ---
// Ekspor tipe ini agar bisa digunakan di file lain
export type IconName = "home" | "history" | "settings";

const icons: { [key in IconName]: LucideIcon } = {
  home: Home,
  history: History,
  settings: Settings,
};

// Ekspor array ini agar bisa digunakan untuk validasi
export const iconNames: IconName[] = ["home", "history", "settings"];

// --- Tipe Props ---
interface TabItemProps {
  isFocused: boolean;
  routeName: IconName;
  onPress: () => void;
}

// --- Komponen untuk satu item Tab ---
export default function TabItem({
  isFocused,
  routeName,
  onPress,
}: TabItemProps) {
  const Icon = icons[routeName];
  const label = routeName.charAt(0).toUpperCase() + routeName.slice(1);

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-center h-full"
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgba(228, 54, 54, 0.2)" : "transparent",
        },
      ]}
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
            <Text className="text-xs font-semibold text-primary">{label}</Text>
          </MotiView>
        )}
      </View>
    </Pressable>
  );
}