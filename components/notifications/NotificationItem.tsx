// components/notifications/NotificationItem.tsx

import React, { useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { NotificationItem as NotificationItemType } from "../../types/notification";
import { getNotificationVisuals } from "../../utils/notificationUtils";
import { Swipeable } from "react-native-gesture-handler";
import { Trash2 } from "lucide-react-native";
import * as Haptics from 'expo-haptics';

interface Props {
  item: NotificationItemType;
  onDelete: (id: string) => void;
  onPress: () => void;
}

export default function NotificationItem({ item, onDelete, onPress }: Props) {
  const { Icon, color, bg } = getNotificationVisuals(item.type);
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1.2, 0.5], 
      extrapolate: "clamp",
    });
    const opacity = dragX.interpolate({
      inputRange: [-100, -50, 0],
      outputRange: [1, 0.5, 0], 
      extrapolate: "clamp",
    });

    const handlePress = () => {
      swipeableRef.current?.close();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      onDelete(item.id);
    };

    return (
      <Pressable
        className="bg-primary items-center justify-center w-24 h-full"
        onPress={handlePress}
      >
        <Animated.View style={{ transform: [{ scale }], opacity }}>
          <Trash2 size={24} className="text-light" />
        </Animated.View>
      </Pressable>
    );
  };

  const handlePressCard = () => {
    if (!item.isRead) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress(); 
    }
  };

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}
      containerStyle={{ marginBottom: 12 }}
    >
      <Pressable
        className={`p-4 rounded-xl flex-row items-center border
          ${item.isRead
            ? 'bg-gray-100 border-gray-100'
            : 'bg-light border-gray-200 shadow-sm'
          }
        `}
        onPress={handlePressCard}
      >
        {/* Lingkaran Ikon */}
        <View className={`p-3 rounded-full ${bg}`}>
          <Icon size={22} className={color} />
        </View>

        <View className="ml-4 flex-1">
          <Text 
            className={`text-base font-semibold ${item.isRead ? 'text-gray-700' : 'text-dark'}`}
          >
            {item.title}
          </Text>
          <Text 
            className={`text-sm ${item.isRead ? 'text-gray-500' : 'text-gray-700'}`} 
            numberOfLines={2}
          >
            {item.body}
          </Text>
        </View>

        <Text className="text-xs text-gray-400 self-start ml-2">
          {item.time}
        </Text>
      </Pressable>
    </Swipeable>
  );
}