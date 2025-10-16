import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { History } from 'lucide-react-native';

export default function HistoryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center p-6">
        <History size={48} color="#9ca3af" />
        <Text className="text-2xl font-bold text-gray-800 mt-4">
          Riwayat
        </Text>
        <Text className="text-base text-gray-500 mt-2 text-center">
          Halaman ini akan menampilkan riwayat aktivitas perangkat Anda.
        </Text>
      </View>
    </SafeAreaView>
  );
}
