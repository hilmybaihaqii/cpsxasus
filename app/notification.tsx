// app/notification.tsx
import React, { useState, useCallback } from "react";
// [FIX] Tambahkan 'Pressable' yang hilang ke dalam impor ini
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NotificationList from "../components/notifications/NotificationList";
import {
  NotificationSection,
  NotificationItem as NotificationItemType,
} from "../types/notification";
import {
  fetchNotifications,
  deleteNotification,
  markAsRead,
  markAllAsRead,
} from "../api/notificationApi";

const DELETED_NOTIFICATIONS_KEY = 'deleted_notifications';

export default function NotificationScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<NotificationSection[]>([]);
  const router = useRouter();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const allNotificationsFromApi = await fetchNotifications();
      const deletedIdsJson = await AsyncStorage.getItem(DELETED_NOTIFICATIONS_KEY);
      const deletedIds = deletedIdsJson ? JSON.parse(deletedIdsJson) : [];
      
      const visibleNotifications = allNotificationsFromApi
        .map(section => ({
          ...section,
          data: section.data.filter(item => !deletedIds.includes(item.id)),
        }))
        .filter(section => section.data.length > 0);

      setNotifications(visibleNotifications);
    } catch (error) {
      console.error("Gagal memuat notifikasi:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { loadData(); }, [loadData]));

  const handleDelete = async (id: string) => {
    const deletedIdsJson = await AsyncStorage.getItem(DELETED_NOTIFICATIONS_KEY);
    const deletedIds = deletedIdsJson ? JSON.parse(deletedIdsJson) : [];
    const newDeletedIds = [...deletedIds, id];
    await AsyncStorage.setItem(DELETED_NOTIFICATIONS_KEY, JSON.stringify(newDeletedIds));

    await deleteNotification(id);
    
    setNotifications((prevSections) =>
      prevSections
        .map((section) => ({
          ...section,
          data: section.data.filter((item) => item.id !== id),
        }))
        .filter((section) => section.data.length > 0)
    );
  };

  const handleNotificationPress = async (item: NotificationItemType) => {
    if (item.filterKey && item.filterKey !== "System") {
      router.push({
        pathname: "/(tabs)/history",
        params: { prefillSearch: item.filterKey },
      });
    }

    if (!item.isRead) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setNotifications((prevSections) =>
        prevSections.map((section) => ({
          ...section,
          data: section.data.map((i) =>
            i.id === item.id ? { ...i, isRead: true } : i
          ),
        }))
      );
      await markAsRead(item.id);
    }
  };

  const handleMarkAllAsRead = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNotifications((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        data: section.data.map((item) => ({ ...item, isRead: true })),
      }))
    );
    await markAllAsRead();
  };

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["left", "right"]} 
    >
      {/* Header Halaman */}
      <View className="flex-row justify-between items-center px-6 pt-5 pb-4 bg-gray-100"> 
        <Text className="text-3xl font-bold text-dark">Notifikasi</Text>
        <Pressable onPress={handleMarkAllAsRead} className="p-1 active:opacity-70">
          <Text className="text-sm font-semibold text-primary"> 
            Tandai Semua Terbaca
          </Text>
        </Pressable>
      </View>

      {/* Tampilan List (atau Loading/Empty) */}
      <NotificationList
        sections={notifications}
        isLoading={isLoading}
        onDelete={handleDelete}
        onNotificationPress={handleNotificationPress}
      />
    </SafeAreaView>
  );
}