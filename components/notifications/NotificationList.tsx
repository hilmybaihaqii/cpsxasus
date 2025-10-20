// components/notifications/NotificationList.tsx
import React from "react";
import {
  View,
  Text,
  SectionList,
  ActivityIndicator,
} from "react-native";
import { Bell } from "lucide-react-native";
// Impor tipe data yang relevan
import {
  NotificationSection,
  NotificationItem as NotificationItemType,
} from "../../types/notification";
import NotificationItem from "./NotificationItem";

interface Props {
  sections: NotificationSection[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  // Prop ini akan menangani klik pada notifikasi
  onNotificationPress: (item: NotificationItemType) => void;
}

export default function NotificationList({
  sections,
  isLoading,
  onDelete,
  onNotificationPress,
}: Props) {
  // --- 1. Tampilan Loading ---
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#E43636" />
      </View>
    );
  }

  // --- 2. Tampilan Kosong (Empty State) ---
  if (sections.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <View className="bg-gray-200 p-4 rounded-full">
          <Bell size={32} className="text-gray-700" />
        </View>
        <Text className="text-xl font-semibold text-dark mt-5">
          Tidak Ada Notifikasi
        </Text>
        <Text className="text-base text-gray-700 mt-2 text-center">
          Semua notifikasi baru akan muncul di sini.
        </Text>
      </View>
    );
  }

  // --- 3. Tampilan Daftar ---
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled={true} // Membuat header menempel
      renderItem={({ item }) => (
        // Bungkus item dengan View untuk padding, agar header bisa full-width
        <View className="px-6">
          <NotificationItem
            item={item}
            onDelete={onDelete}
            onPress={() => onNotificationPress(item)}
          />
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        // Tambahkan 'px-6' agar teks header sejajar dengan item di bawahnya
        <View className="bg-background py-3 mb-3 px-6">
          <Text className="text-base font-bold text-dark">{title}</Text>
        </View>
      )}
      contentContainerStyle={{
        // Padding bawah agar item terakhir tidak tertutup oleh tab bar
        paddingBottom: 118,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}