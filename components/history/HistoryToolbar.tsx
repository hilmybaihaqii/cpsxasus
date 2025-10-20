// components/history/HistoryToolbar.tsx
import React from "react";
// [MODIFIKASI] Impor 'Text'
import { View, TextInput, Pressable, Text } from "react-native"; 
import { Search, SlidersHorizontal } from "lucide-react-native";

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterPress: () => void;
  activeFilter: boolean;
}

export default function HistoryToolbar({
  searchQuery,
  onSearchChange,
  onFilterPress,
  activeFilter,
}: Props) {
  const isFiltered = activeFilter;

  return (
    <View className="px-6 pt-6"> 
      <Text className="text-3xl font-bold text-dark mb-4">
        Riwayat
      </Text>

      <View className="flex-row items-center gap-x-3 pb-4">
        <View className="flex-1 flex-row items-center bg-light rounded-full border border-gray-200 px-4 py-3 shadow-sm">
          <Search size={20} className="text-gray-400" />
          <TextInput
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Cari riwayat (mis: Pintu Depan)"
            placeholderTextColor="#9CA3AF"
            className="text-base ml-2 flex-1 text-dark"
          />
        </View>

        <Pressable
          onPress={onFilterPress}
          className={`
            p-3 rounded-full border shadow-sm
            ${isFiltered
              ? 'bg-primary-light-bg border-primary-light-border'
              : 'bg-light border-gray-200'
            }
          `}
        >
          <SlidersHorizontal
            size={20}
            className={isFiltered ? "text-primary" : "text-gray-700"}
          />
        </Pressable>
      </View>
    </View>
  );
}