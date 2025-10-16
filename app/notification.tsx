import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Hapus impor useRouter

export default function NotificationScreen() {
  // Hapus baris ini
  // const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800">
          Notifikasi
        </Text>
        <Text className="text-base text-gray-500 mt-4">
          Semua notifikasi dan pemberitahuan akan muncul di sini.
        </Text>
      </View>
    </SafeAreaView>
  );
}