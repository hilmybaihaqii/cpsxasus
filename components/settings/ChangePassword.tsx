import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function ChangePasswordScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Change Password</Text>
        
        <View className="space-y-4">
          <View>
            <Text className="text-gray-600 text-sm mb-1">Current Password</Text>
            <TextInput 
              className="bg-white p-4 rounded-xl border border-gray-200"
              placeholder="Enter current password"
              secureTextEntry
            />
          </View>

          <View>
            <Text className="text-gray-600 text-sm mb-1">New Password</Text>
            <TextInput 
              className="bg-white p-4 rounded-xl border border-gray-200"
              placeholder="Enter new password"
              secureTextEntry
            />
          </View>

          <View>
            <Text className="text-gray-600 text-sm mb-1">Confirm New Password</Text>
            <TextInput 
              className="bg-white p-4 rounded-xl border border-gray-200"
              placeholder="Confirm new password"
              secureTextEntry
            />
          </View>
        </View>

        <View className="mt-8 space-y-3">
          <TouchableOpacity 
            className="bg-red-500 p-4 rounded-xl"
            onPress={() => router.back()}
          >
            <Text className="text-white text-center font-semibold">Update Password</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-gray-200 p-4 rounded-xl"
            onPress={() => router.back()}
          >
            <Text className="text-gray-700 text-center font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}