// components/layout/ScreenLayout.tsx

import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../navigation/CustomHeader';

type ScreenLayoutProps = {
  headerContent: React.ReactNode; 
  children: React.ReactNode;
};

export default function ScreenLayout({ headerContent, children }: ScreenLayoutProps) {
  return (
    // Pastikan ada className="flex-1" di sini
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 120, flexGrow: 1 }}>
        
        {/* Pastikan CustomHeader dipanggil di sini */}
        <CustomHeader>
          {headerContent}
        </CustomHeader>

        <View className="p-6">
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}