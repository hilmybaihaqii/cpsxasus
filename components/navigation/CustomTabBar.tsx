import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MotiView } from 'moti';
import { Home, History, Settings, LucideIcon } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

// --- Tipe dan Data Ikon ---
type IconName = 'home' | 'history' | 'settings';
const icons: { [key in IconName]: LucideIcon } = {
  home: Home,
  history: History,
  settings: Settings,
};
const iconNames: IconName[] = ['home', 'history', 'settings'];

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
    <Pressable onPress={onPress} className="flex-1 items-center justify-center h-full">
      <View className="items-center justify-center gap-y-1">
        <MotiView
          animate={{
            // PERBAIKAN: Kurangi nilai scale dan translateY
            scale: isFocused ? 1.1 : 1,
            translateY: isFocused ? -4 : 0, 
          }}
          transition={{
            type: 'spring',
            damping: 14,
            stiffness: 100,
          }}
        >
          <Icon
            size={28}
            color={isFocused ? '#4f46e5' : '#6b7280'}
            strokeWidth={isFocused ? 2.5 : 2}
          />
        </MotiView>
        
        {isFocused && (
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 100,
            }}
          >
            <Text className="text-xs font-semibold text-indigo-700">
              {label}
            </Text>
          </MotiView>
        )}
      </View>
    </Pressable>
  );
};

// --- Komponen Utama Tab Bar (Tidak ada perubahan) ---
export default function IconTextTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View className="absolute bottom-6 left-6 right-6 h-[70px] bg-white rounded-full flex-row justify-around items-center shadow-lg shadow-black/10">
      {state.routes.map((route) => {
        const isFocused = state.routes.findIndex(r => r.key === route.key) === state.index;
        const routeName = route.name as IconName;
        if (!iconNames.includes(routeName)) { return null; }
        const onPress = () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          const event = navigation.emit({
            type: 'tabPress',
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