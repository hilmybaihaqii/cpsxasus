import React, { useState, useEffect } from 'react'; // 1. Impor useState dan useEffect
import { View, Pressable, Text } from 'react-native';
import { Bell, Aperture, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CustomHeaderProps = {
  title?: string;
  children?: React.ReactNode; 
};

export default function CustomHeader({ title, children }: CustomHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // 2. Buat state lokal untuk menyimpan status 'canGoBack'
  const [showBackButton, setShowBackButton] = useState(false);

  // 3. Pindahkan logika ke dalam useEffect
  useEffect(() => {
    // Cek apakah bisa kembali HANYA SETELAH komponen siap
    setShowBackButton(router.canGoBack());
  }, [router]); // Jalankan efek ini jika router berubah

  return (
    <View 
      style={{ paddingTop: insets.top }} 
      className="px-4 pb-2 bg-white border-b border-gray-200"
    >
      <View className="flex-row justify-between items-center h-12">
        {/* Gunakan state 'showBackButton' untuk rendering kondisional */}
        {showBackButton ? (
          <>
            <View className="w-1/4">
              <Pressable onPress={() => router.back()} className="h-full flex-row items-center">
                <ArrowLeft size={30} color="black" />
                <Text className="text-lg text-black ml-1">Back</Text> 
              </Pressable>
            </View>
            <View className="flex-1 items-center justify-center">
              <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>
                {title}
              </Text>
            </View>
            <View className="w-1/4" />
          </>
        ) : (
          <View className="flex-1 flex-row justify-between items-center">
            <Pressable onPress={() => router.push('/(tabs)/home')}>
              <Aperture size={35} color="black" />
            </Pressable>
            <Pressable onPress={() => router.push('/notification')}>
              <Bell size={30} color="black" />
            </Pressable>
          </View>
        )}
      </View>
      {children}
    </View>
  );
}