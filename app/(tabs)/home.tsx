// app/(tabs)/home.tsx

import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// [FIX] Hapus 'Bell' dan 'useSafeAreaInsets', karena header sudah ada di layout
import { ChevronRight, Fan, Lamp } from "lucide-react-native";

// Komponen Kartu (Tidak berubah)
type DeviceCardProps = {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  onPress: () => void;
  iconColorClass: string;
};
const DeviceCard: React.FC<DeviceCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  onPress,
  iconColorClass,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-light p-5 rounded-2xl flex-row items-center shadow-md shadow-black/5"
  >
    <View
      className={`w-16 h-16 rounded-full items-center justify-center ${iconColorClass}`}
    >
      <Icon size={32} color="#FFFFFF" />
    </View>
    <View className="ml-4 flex-1">
      <Text className="font-poppins-semibold text-xl text-dark">{title}</Text>
      <Text className="font-poppins-regular text-base text-gray-500">
        {subtitle}
      </Text>
    </View>
    <ChevronRight size={24} color="#C7C7C7" />
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();

  return (
    // [FIX] Hapus <SafeAreaView> dan <View> header manual.
    // Mulai langsung dengan <ScrollView>.
    // Layout Anda (dari _layout.tsx) akan menangani header dan latar belakang.
    <ScrollView
      className="flex-1 bg-gray-100" // Set latar belakang
      // [FIX] Beri padding di atas (pt-6) agar ada jarak dari header Anda
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 24,
      }}
    >
      {/* [FIX] Semua kode header manual (logo D'Mouv & lonceng) 
          telah dihapus dari sini.
      */}

      {/* Sapaan */}
      <View className="mb-6">
        <Text className="font-poppins-regular text-lg text-gray-600">
          Selamat Datang,
        </Text>
        <Text className="font-poppins-semibold text-3xl text-dark">
          Asus Telkom University! 👋
        </Text>
      </View>

      {/* Judul Bagian */}
      <Text className="font-poppins-semibold text-2xl text-dark mb-4">
        Perangkat Anda
      </Text>

      {/* Daftar Kartu Perangkat */}
      <View className="gap-y-4">
        <DeviceCard
          title="Smart Lamp"
          subtitle="Atur pencahayaan Anda"
          icon={Lamp}
          iconColorClass="bg-primary"
          onPress={() => router.push({ pathname: "/lamp-control" })}
        />
        <DeviceCard
          title="Smart Fan"
          subtitle="Atur pendingin ruangan"
          icon={Fan}
          iconColorClass="bg-gray-800"
          onPress={() => router.push({ pathname: "/fan-control" })}
        />
      </View>
    </ScrollView>
  );
}
