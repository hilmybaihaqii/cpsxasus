import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Home } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center p-6">
        <Home size={48} color="#9ca3af" />
        <Text className="text-2xl font-bold text-gray-800 mt-4">
          Halaman Utama
        </Text>
        <Text className="text-base text-gray-500 mt-2 text-center">
          Selamat datang di aplikasi Anda.
        </Text>
      </View>
    </SafeAreaView>
  );
}

