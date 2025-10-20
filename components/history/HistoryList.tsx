// components/history/HistoryList.tsx
import React from "react";
import {
  View,
  Text,
  SectionList,
  RefreshControl,
  FlatList,
} from "react-native";
import { History } from "lucide-react-native";
import { LogSection } from "../../types/history";
import HistoryItem from "./HistoryItem";
import { MotiView } from "moti";

// [FIX] Tambahkan 'isRefreshing' dan 'onRefresh' ke Props
interface Props {
  sections: LogSection[];
  isLoading: boolean;
  isRefreshing: boolean; // <-- Tambahkan ini
  onRefresh: () => void; // <-- Tambahkan ini
}

// Komponen Skeleton untuk loading state
const SkeletonItem = () => (
  <View className="bg-light p-4 rounded-xl shadow-sm flex-row items-center mb-3 border border-gray-200">
    <View className="w-[44px] h-[44px] rounded-full bg-gray-200" />
    <View className="ml-4 flex-1">
      <View className="w-3/4 h-5 bg-gray-200 rounded" />
      <View className="w-1/2 h-4 bg-gray-200 rounded mt-2" />
    </View>
    <View className="w-1/6 h-3 bg-gray-200 rounded" />
  </View>
);

// [FIX] Terima 'isRefreshing' dan 'onRefresh' dari props
export default function HistoryList({ sections, isLoading, isRefreshing, onRefresh }: Props) {
  // Gunakan Skeleton Loader
  if (isLoading && !isRefreshing) {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={item => item.toString()}
        renderItem={() => <SkeletonItem />}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      />
    );
  }

  // Tampilan Kosong (Empty State)
  if (sections.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <View className="bg-gray-200 p-4 rounded-full">
          <History size={32} className="text-gray-700" />
        </View>
        <Text className="text-xl font-semibold text-dark mt-5">
          Tidak Ada Riwayat Ditemukan
        </Text>
        <Text className="text-base text-gray-700 mt-2 text-center">
          Coba ubah kata kunci pencarian atau filter Anda.
        </Text>
      </View>
    );
  }

  // Tampilan Daftar
  return (
    <SectionList
      sections={sections}
      stickySectionHeadersEnabled={true}
      keyExtractor={(item) => item.id}
      
      renderItem={({ item, index }) => (
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 300,
            delay: index * 50,
          }}
        >
          <View className="px-6">
            <HistoryItem item={item} />
          </View>
        </MotiView>
      )}

      renderSectionHeader={({ section: { title } }) => (
        <View className="bg-background py-3 mb-3 px-6">
          <Text className="text-base font-bold text-dark">{title}</Text>
        </View>
      )}
      
      // [FIX] Gunakan props baru di sini
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor="#E43636"
          colors={["#E43636"]}
        />
      }

      contentContainerStyle={{
        paddingBottom: 118,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}