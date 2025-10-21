import { View, Text, ScrollView, Image, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Feather } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleNavigate = (path: "/settings/edit-profile" | "/settings/add-account" | "/settings/change-password" | "/settings/about") => {
    router.push(path);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            signOut();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="pt-4 px-5 pb-6">
          <View className="items-center mb-4">
            <View className="w-24 h-24 bg-white rounded-2xl shadow-sm items-center justify-center mb-3">
              <Image
                source={{ uri: 'https://placehold.co/140x140/ffffff/ef4444/png?text=ASUS' }}
                className="w-20 h-20"
              />
            </View>
            <Text className="text-[22px] font-bold text-gray-900">ASUS TELKOM UNIVERSITY</Text>
            <Text className="text-gray-500 mt-1">Super User • Administrator</Text>
          </View>
        </View>

        <View className="space-y-4">
          <View className="px-5">
            <Text className="text-gray-500 mb-3 text-sm">PROFILE SETTINGS</Text>
            <View className="space-y-2">
              <Pressable 
                onPress={() => handleNavigate('/settings/edit-profile')}
                className="bg-white px-4 py-4 rounded-2xl shadow-sm active:opacity-90 flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <View className="w-9 h-9 rounded-xl bg-gray-50 items-center justify-center">
                    <Feather name="user" size={18} color="#374151" />
                  </View>
                  <Text className="text-gray-900 text-base ml-3">Edit Profile</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#9CA3AF" />
              </Pressable>
              
              <Pressable 
                onPress={() => handleNavigate('/settings/add-account')}
                className="bg-white px-4 py-4 rounded-2xl shadow-sm active:opacity-90 flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <View className="w-9 h-9 rounded-xl bg-gray-50 items-center justify-center">
                    <Feather name="users" size={18} color="#374151" />
                  </View>
                  <Text className="text-gray-900 text-base ml-3">Add Account</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#9CA3AF" />
              </Pressable>
              
              <Pressable 
                onPress={() => handleNavigate('/settings/change-password')}
                className="bg-white px-4 py-4 rounded-2xl shadow-sm active:opacity-90 flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <View className="w-9 h-9 rounded-xl bg-gray-50 items-center justify-center">
                    <Feather name="lock" size={18} color="#374151" />
                  </View>
                  <Text className="text-gray-900 text-base ml-3">Change Password</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#9CA3AF" />
              </Pressable>
            </View>
          </View>

          <View className="px-5 mt-7">
            <Text className="text-gray-500 mb-3 text-sm">APP SETTINGS</Text>
            <Pressable 
              onPress={() => handleNavigate('/settings/about')}
              className="bg-white px-4 py-4 rounded-2xl shadow-sm active:opacity-90 flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-xl bg-gray-50 items-center justify-center">
                  <Feather name="info" size={18} color="#374151" />
                </View>
                <Text className="text-gray-900 text-base ml-3">About App</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9CA3AF" />
            </Pressable>
          </View>

          <View className="px-5 mt-7">
            <Pressable 
              onPress={handleLogout}
              className="bg-white px-4 py-4 rounded-2xl shadow-sm active:opacity-90 flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-xl bg-red-50 items-center justify-center">
                  <Feather name="log-out" size={18} color="#EF4444" />
                </View>
                <Text className="text-red-500 text-base ml-3">Logout</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9CA3AF" />
            </Pressable>
          </View>

          <View className="mt-8 mb-4">
            <Text className="text-center text-gray-400 text-sm">Versi 0.7</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}