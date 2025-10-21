import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function AboutAppScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">About App</Text>
        
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <View className="items-center mb-6">
            <Image
              source={{ uri: 'https://placehold.co/100x100/ef4444/ffffff/png?text=ASUS' }}
              className="w-24 h-24 rounded-2xl mb-4"
            />
            <Text className="text-xl font-bold text-gray-800">ASUS Control App</Text>
            <Text className="text-gray-500 mt-1">Version 1.0.0</Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-gray-600 font-medium mb-1">Developer</Text>
              <Text className="text-gray-800">Telkom University</Text>
            </View>

            <View>
              <Text className="text-gray-600 font-medium mb-1">Contact</Text>
              <Text className="text-gray-800">support@telkomuniversity.ac.id</Text>
            </View>

            <View>
              <Text className="text-gray-600 font-medium mb-1">Website</Text>
              <Text className="text-red-500">www.telkomuniversity.ac.id</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          className="mt-6 bg-gray-200 p-4 rounded-xl"
          onPress={() => router.back()}
        >
          <Text className="text-gray-700 text-center font-semibold">Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}