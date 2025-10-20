import React from "react";
import { View, Text, Pressable } from "react-native";
import { LogItem } from "../../types/history";
import { getLogVisuals } from "../../utils/historyUtils";

interface Props {
  item: LogItem;
}

export default function HistoryItem({ item }: Props) {

  const { Icon, color, bg } = getLogVisuals(item);

  return (
    <Pressable className="bg-light p-4 rounded-xl shadow-sm flex-row items-center mb-3">
      <View className={`p-3 rounded-full ${bg}`}>
        <Icon size={22} className={color} />
      </View>

      <View className="ml-4 flex-1">
        <Text className="text-base font-semibold text-dark">
          {item.title}
        </Text>
        <Text className="text-sm text-gray-700">{item.location}</Text>
      </View>

      <Text className="text-xs text-gray-400">{item.time}</Text>
    </Pressable>
  );
}