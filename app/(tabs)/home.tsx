// app/(tabs)/home.tsx

import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// [FIX] Tambahkan ikon baru untuk jadwal
import {
  CalendarClock,
  ChevronRight,
  Clock,
  Fan,
  Lamp,
} from "lucide-react-native";

// --- Komponen DeviceCard (Tidak berubah) ---
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

// --- [BARU] Komponen untuk Ringkasan Jadwal ---
type ScheduleItemProps = {
  device: "Lamp" | "Fan";
  time: string;
  action: "On" | "Off";
  onPress: () => void;
};
const ScheduleItem: React.FC<ScheduleItemProps> = ({
  device,
  time,
  action,
  onPress,
}) => {
  const isLamp = device === "Lamp";
  const Icon = isLamp ? Lamp : Fan;
  const color = isLamp ? "text-yellow-500" : "text-blue-500";
  const actionColor = action === "On" ? "text-green-500" : "text-red-500";

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-4 flex-row items-center justify-between"
    >
      <View className="flex-row items-center">
        <Icon size={24} className={color} />
        <View className="ml-3">
          <Text className="font-poppins-semibold text-base text-dark">
            {isLamp ? "Smart Lamp" : "Smart Fan"}
          </Text>
          <Text className={`font-poppins-regular text-sm ${actionColor}`}>
            Akan {action === "On" ? "Menyala" : "Mati"}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center bg-gray-100 px-3 py-1 rounded-full">
        <Clock size={14} className="text-gray-600" />
        <Text className="font-poppins-semibold text-sm text-gray-700 ml-1.5">
          {time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const router = useRouter();

  // (Simulasi Data)
  // Nantinya, data ini akan diambil dari state global atau backend
  const upcomingSchedules = [
    { id: "1", device: "Lamp", time: "08:00", action: "On" },
    { id: "2", device: "Fan", time: "08:30", action: "On" },
    { id: "3", device: "Lamp", time: "17:00", action: "Off" },
  ];

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 24,
      }}
    >
      {/* Sapaan */}
      <View className="mb-6">
        <Text className="font-poppins-regular text-lg text-gray-600">
          Selamat Datang,
        </Text>
        <Text className="font-poppins-semibold text-3xl text-dark">
          Asus Telkom University! 👋
        </Text>
      </View>

      {/* Judul Bagian Perangkat */}
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

      {/* --- [BAGIAN BARU] Jadwal Mendatang --- */}
      <View className="mt-8">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="font-poppins-semibold text-2xl text-dark">
            Jadwal Hari Ini
          </Text>
          <TouchableOpacity
            // Tombol ini bisa mengarah ke halaman manajemen jadwal
            // Untuk saat ini, kita biarkan dulu
            onPress={() => {
              /* Navigasi ke halaman detail schedule jika ada */
            }}
          >
            <Text className="font-poppins-medium text-base text-primary">
              Lihat Semua
            </Text>
          </TouchableOpacity>
        </View>

        {upcomingSchedules.length > 0 ? (
          <View className="gap-y-3">
            <ScheduleItem
              device="Lamp"
              time="08:00"
              action="On"
              onPress={() => router.push({ pathname: "/lamp-control" })}
            />
            <ScheduleItem
              device="Fan"
              time="08:30"
              action="On"
              onPress={() => router.push({ pathname: "/fan-control" })}
            />
            <ScheduleItem
              device="Lamp"
              time="17:00"
              action="Off"
              onPress={() => router.push({ pathname: "/lamp-control" })}
            />
          </View>
        ) : (
          // Tampilan jika tidak ada jadwal
          <View className="bg-white rounded-2xl items-center justify-center py-10 px-5">
            <CalendarClock size={40} className="text-gray-400" />
            <Text className="font-poppins-semibold text-lg text-gray-600 mt-4">
              Tidak Ada Jadwal
            </Text>
            <Text className="font-poppins-regular text-base text-gray-500 text-center mt-1">
              Anda belum mengatur jadwal otomatis.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
