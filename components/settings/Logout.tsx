import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LogOut, ChevronRight } from 'lucide-react-native';

type Props = {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'accent' | 'danger';
  onPress?: () => void;
};

export default function LogoutPlaceholder({
  title = 'Logout',
  subtitle = 'Keluar dari akun Anda',
  variant = 'danger',
  onPress = () => {},
}: Props) {
  const iconColor = variant === 'accent' ? '#ef4444' : variant === 'danger' ? '#ef4444' : '#6b7280';
  const textColor = variant === 'danger' ? 'text-red-600' : 'text-gray-800';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-full bg-white rounded-xl p-4 mb-4 shadow-sm"
      onPress={onPress}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <LogOut size={24} color={iconColor} />
          <View className="ml-4">
            <Text className={`text-lg font-medium ${textColor}`}>{title}</Text>
            {subtitle ? <Text className="text-sm text-gray-500">{subtitle}</Text> : null}
          </View>
        </View>
        <ChevronRight size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );
}
