// components/navigation/CustomHeader.tsx
import React, { useState, useEffect } from 'react';
import { View, Pressable, Text } from 'react-native';
import { Bell, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../../assets/icons/O.svg';

type CustomHeaderProps = {
  title?: string;
  children?: React.ReactNode; 
  forceShowTabsHeader?: boolean;
};

const PRIMARY_COLOR = "#E43636";

export default function CustomHeader({ 
  title, 
  children, 
  forceShowTabsHeader = false 
}: CustomHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    if (!forceShowTabsHeader) {
      setShowBackButton(router.canGoBack());
    }
  }, [router, forceShowTabsHeader]);

  return (
    <View 
      style={{ paddingTop: insets.top }} 
      className="px-6 pb-2 bg-light border-b border-gray-200"
    >
      <View className="flex-row justify-between items-center h-12">
        {/* Tampilan "Back" untuk halaman detail */}
        {showBackButton && !forceShowTabsHeader ? (
          <>
            <View className="absolute left-0 z-10">
              <Pressable onPress={() => router.back()} className="h-full flex-row items-center p-2 -ml-2">
                <ArrowLeft size={28} color={PRIMARY_COLOR} />
                <Text className="text-lg text-primary ml-1">Back</Text> 
              </Pressable>
            </View>
            <View className="flex-1 items-center justify-center">
              <Text className="text-lg font-bold text-dark" numberOfLines={1}>
                {title}
              </Text>
            </View>
          </>
        ) : (
          /* [FIX] Tampilan Header Tab (selalu Logo + Lonceng) */
          <>
            <Pressable onPress={() => router.push('/(tabs)/home')}>
              <Logo width={35} height={35} color={PRIMARY_COLOR} />
            </Pressable>
            <Pressable onPress={() => router.push('/notification')}>
              <Bell size={28} color={PRIMARY_COLOR} />
            </Pressable>
          </>
        )}
      </View>
      {children}
    </View>
  );
}