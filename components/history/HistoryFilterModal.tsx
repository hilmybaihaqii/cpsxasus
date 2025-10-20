import React, { useState, useEffect } from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  History,
  Move,
  Lightbulb,
  Fan,
  LightbulbOff,
} from "lucide-react-native";
import { FilterValue } from "../../types/history";

const filterOptions: { name: string; value: FilterValue; Icon: any }[] = [
  { name: "Semua", value: "all", Icon: History },
  { name: "Gerakan", value: "motion", Icon: Move },
  { name: "Lampu Nyala", value: "lamp_on", Icon: Lightbulb },
  { name: "Lampu Mati", value: "lamp_off", Icon: LightbulbOff },
  { name: "Kipas Nyala", value: "fan_on", Icon: Fan },
  { name: "Kipas Mati", value: "fan_off", Icon: Fan },
];

interface Props {
  isVisible: boolean;
  onClose: () => void;
  currentFilters: FilterValue[];
  onApplyFilter: (filters: FilterValue[]) => void;
}

export default function HistoryFilterModal({
  isVisible,
  onClose,
  currentFilters,
  onApplyFilter,
}: Props) {
  const [selectedFilters, setSelectedFilters] =
    useState<FilterValue[]>(currentFilters);

  useEffect(() => {
    setSelectedFilters(currentFilters);
  }, [currentFilters, isVisible]);

  const handleApply = () => {
    onApplyFilter(selectedFilters);
    onClose();
  };

  const handleReset = () => {
    setSelectedFilters(["all"]);
  };

  const handleSelectFilter = (value: FilterValue) => {
    let newSelection = [...selectedFilters];
    if (value === "all") {
      setSelectedFilters(["all"]);
      return;
    }
    if (newSelection.includes("all")) {
      newSelection = [];
    }
    const index = newSelection.indexOf(value);
    if (index > -1) {
      newSelection.splice(index, 1);
    } else {
      newSelection.push(value);
    }
    setSelectedFilters(newSelection.length === 0 ? ["all"] : newSelection);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      {/* [MODIFIKASI] Backdrop ini sudah menangani "tutup saat menekan area kosong" */}
      <Pressable className="flex-1 bg-black/50" onPress={onClose} />

      {/* Modal container */}
      <SafeAreaView
        className="absolute bottom-0 left-0 right-0 bg-light rounded-t-2xl border-t border-gray-200"
        edges={["bottom"]}
      >
        <View className="p-6">
          {/* Handle bar (Petunjuk visual untuk "slide ke bawah") */}
          <View className="w-12 h-1.5 bg-gray-200 rounded-full self-center mb-6" />

          {/* [MODIFIKASI] Header - Tombol 'X' dihapus, "Reset" ditambahkan */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-dark">
              Filter Riwayat
            </Text>
            {/* [BARU] Tombol "Reset" sebagai link teks */}
            <Pressable
              onPress={handleReset}
              className="p-1 active:opacity-70"
            >
              <Text className="text-base font-semibold text-primary">
                Reset
              </Text>
            </Pressable>
          </View>

          {/* Grid Filter (Tidak berubah) */}
          <View className="flex-row flex-wrap -mx-2 mb-6">
            {filterOptions.map((option) => {
              const isSelected = selectedFilters.includes(option.value);
              return (
                <View key={option.value} className="w-1/3 p-2">
                  <Pressable
                    onPress={() => handleSelectFilter(option.value)}
                    className={`items-center justify-center p-4 rounded-xl h-24 border
                      ${
                        isSelected
                          ? "bg-primary-light-bg border-primary"
                          : "bg-gray-100 border-gray-200"
                      } active:opacity-80 shadow-sm`}
                  >
                    <option.Icon
                      size={24}
                      className={isSelected ? "text-primary" : "text-gray-700"}
                    />
                    <Text
                      className={`text-sm font-medium text-center mt-2 ${
                        isSelected ? "text-primary" : "text-dark"
                      }`}
                      numberOfLines={2}
                    >
                      {option.name}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>

          {/* [MODIFIKASI] Tombol "Reset" outline dihapus */}

          {/* Apply Button (Satu-satunya tombol aksi utama) */}
          <Pressable
            onPress={handleApply}
            className="bg-primary rounded-full py-4 items-center shadow-sm active:opacity-90"
          >
            <Text className="text-light text-base font-semibold">
              Terapkan Filter
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}