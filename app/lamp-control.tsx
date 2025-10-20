// app/lamp-control.tsx

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Lightbulb, Power, User } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Komponen StatusItem (sudah benar)
const StatusItem: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string;
  colorClass: string;
}> = ({ icon: Icon, label, value, colorClass }) => (
  <View className="flex-1 items-center bg-light p-4 rounded-xl">
    <Icon size={28} className="text-primary" />
    <Text className="font-poppins-regular text-sm text-gray-500 mt-2">
      {label}
    </Text>
    <Text className={`font-poppins-semibold text-base mt-1 ${colorClass}`}>
      {value}
    </Text>
  </View>
);

export default function LampControlScreen() {
  const router = useRouter();

  const [isLampOn, setIsLampOn] = useState(true);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [motionStatus] = useState("Detected");
  const [isActionLoading, setActionLoading] = useState(false);
  const deviceName = "Lampu Kelas";

  // [FIX] Mengisi logika untuk tombol power
  const handleLampToggle = () => {
    if (isAutoMode) return; // Jika mode otomatis, tombol power tidak berfungsi
    setActionLoading(true);
    setTimeout(() => {
      setIsLampOn(!isLampOn);
      setActionLoading(false);
    }, 500);
  };

  // [FIX] Mengisi logika untuk switch mode otomatis
  const handleAutoModeToggle = () => {
    if (isActionLoading) return; // Mencegah toggle saat aksi lain berjalan
    setIsAutoMode(!isAutoMode);
  };

  const lampColorClass = isLampOn ? "text-yellow-500" : "text-gray-400";
  const lampStatusText = isLampOn ? "Menyala" : "Mati";
  const motionColorClass =
    motionStatus === "Detected" ? "text-green-500" : "text-gray-500";

  return (
    <SafeAreaView className="flex-1 bg-light">
      {/* Header Kustom (Fixed) */}
      <View className="p-5 flex-row items-center border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={28} color="#000000" />
        </TouchableOpacity>
        <Text className="font-poppins-semibold text-xl text-dark ml-4">
          {deviceName}
        </Text>
      </View>

      {/* Konten Scrollable */}
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View className="items-center my-8">
          <Lightbulb size={150} className={lampColorClass} />
        </View>
        <View className="items-center mb-10">
          <TouchableOpacity
            className={`w-24 h-24 rounded-full items-center justify-center border-4 ${
              isAutoMode
                ? "bg-gray-200 border-gray-300"
                : isLampOn
                ? "bg-primary/10 border-primary/30"
                : "bg-gray-100 border-gray-300"
            }`}
            onPress={handleLampToggle}
            disabled={isAutoMode || isActionLoading}
          >
            {isActionLoading ? (
              <ActivityIndicator size="large" color="#BA2025" />
            ) : (
              <Power
                size={48}
                className={
                  isAutoMode
                    ? "text-gray-400"
                    : isLampOn
                    ? "text-primary"
                    : "text-gray-600"
                }
              />
            )}
          </TouchableOpacity>
          <Text
            className={`font-poppins-semibold text-2xl mt-4 ${
              isLampOn ? "text-dark" : "text-gray-500"
            }`}
          >
            {isAutoMode ? "Mode Otomatis" : `Lampu ${lampStatusText}`}
          </Text>
        </View>
        <View className="flex-row w-full justify-around gap-x-4 mb-6">
          <StatusItem
            icon={User}
            label="Person Status"
            value={motionStatus}
            colorClass={motionColorClass}
          />
          <StatusItem
            icon={Lightbulb}
            label="Lamp Status"
            value={lampStatusText}
            colorClass={isLampOn ? "text-green-500" : "text-red-500"}
          />
        </View>
        <View className="flex-row justify-between items-center bg-gray-100 rounded-2xl p-5 w-full">
          <View>
            <Text className="font-poppins-semibold text-lg text-dark">
              Mode Otomatis
            </Text>
            <Text className="font-poppins-regular text-sm text-gray-500 mt-1">
              Kontrol lampu berdasarkan deteksi
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#C7C7C7", true: "#BA2025" }}
            thumbColor={"#FFFFFF"}
            ios_backgroundColor="#C7C7C7"
            onValueChange={handleAutoModeToggle}
            value={isAutoMode}
            disabled={isActionLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
