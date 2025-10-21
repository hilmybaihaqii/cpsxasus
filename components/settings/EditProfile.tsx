import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</Text>
        
        <View className="space-y-4">
          <View>
            <Text className="text-gray-600 text-sm mb-1">Full Name</Text>
            <TextInput 
              className="bg-white p-4 rounded-xl border border-gray-200"
              placeholder="Enter your full name"
              defaultValue="ASUS TELKOM UNIVERSITY"
            />
          </View>

          <View>
            <Text className="text-gray-600 text-sm mb-1">Email</Text>
            <TextInput 
              className="bg-white p-4 rounded-xl border border-gray-200"
              placeholder="Enter your email"
              keyboardType="email-address"
              defaultValue="admin@telkomuniversity.ac.id"
            />
          </View>

          <View>
            <Text className="text-gray-600 text-sm mb-1">Role</Text>
            <TextInput 
              className="bg-white p-4 rounded-xl border border-gray-200"
              placeholder="Your role"
              defaultValue="Super User"
              editable={false}
            />
          </View>
        </View>

        <View className="mt-8 space-y-3">
          <TouchableOpacity 
            className="bg-red-500 p-4 rounded-xl"
            onPress={() => router.back()}
          >
            <Text className="text-white text-center font-semibold">Save Changes</Text>
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