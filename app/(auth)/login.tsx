import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Aperture } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi.');
      return;
    }
    signIn();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 justify-center">
      <View className="p-8">
        <View className="items-center mb-10">
          <Aperture size={60} color="#4f46e5" />
          <Text className="text-4xl font-bold text-gray-800 mt-4">Welcome Back</Text>
          <Text className="text-lg text-gray-500 mt-1">Sign in to continue</Text>
        </View>

        <View className="gap-y-4">
          <TextInput
            className="bg-white p-4 rounded-xl text-base border border-gray-200"
            placeholder="Email or Username"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="bg-white p-4 rounded-xl text-base border border-gray-200"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Pressable 
          onPress={handleLogin}
          className="bg-indigo-600 p-4 rounded-xl mt-8"
        >
          <Text className="text-white text-center text-lg font-bold">Sign In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}