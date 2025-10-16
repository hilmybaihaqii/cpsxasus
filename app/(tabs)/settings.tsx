import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center p-6">
        <Settings size={48} color="#9ca3af" />
        <Text className="text-2xl font-bold text-gray-800 mt-4">
          Pengaturan
        </Text>
        <Text className="text-base text-gray-500 mt-2 text-center">
          Pengaturan aplikasi dan profil Anda akan tersedia di sini.
        </Text>
      </View>
    </SafeAreaView>
  );
}
