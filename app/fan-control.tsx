// app/fan-control.tsx

// [FIX 1] Hapus Ionicons
// import { Ionicons } from "@expo/vector-icons";
// [FIX 1] Tambahkan ikon Lucide yang dibutuhkan
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Clock,
  Fan,
  Lock,
  Pencil,
  Power,
  Trash2,
  User,
} from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  LayoutAnimation,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

// --- Tipe dan Helper ---
type Schedule = { id: string; day: string; onTime: string; offTime: string };
const dayMap: { [key: string]: string } = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};
const dayMapReverse: { [key: string]: string } = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const timeToMinutes = (time: string): number => {
  if (!time || !time.includes(":")) return NaN;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// --- Komponen ---
const ScheduleFormComponent: React.FC<{
  schedulesForDevice: Schedule[];
  onSubmit: (data: Omit<Schedule, "id">) => void;
}> = ({ schedulesForDevice, onSubmit }) => {
  const [isDayModalVisible, setDayModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [inputOnTime, setInputOnTime] = useState("");
  const [inputOffTime, setInputOffTime] = useState("");
  const [error, setError] = useState<{ field: string; message: string } | null>(
    null
  );
  const isSubmitDisabled = !selectedDay || !inputOnTime || !inputOffTime;
  const handleTimeInputChange = (
    text: string,
    setter: (value: string) => void
  ) => {
    if (error?.field === "time" || error?.field === "submit") setError(null);
    const nums = text.replace(/[^0-9]/g, "");
    if (nums.length > 4) return;
    let formattedText = nums;
    if (nums.length > 2) formattedText = `${nums.slice(0, 2)}:${nums.slice(2)}`;
    setter(formattedText);
  };
  const clearForm = () => {
    setSelectedDay(null);
    setInputOnTime("");
    setInputOffTime("");
    setError(null);
  };
  const proceedSubmit = () => {
    if (!selectedDay || !inputOnTime || !inputOffTime) return;
    const dayKey = dayMap[selectedDay] || selectedDay;
    onSubmit({ day: dayKey, onTime: inputOnTime, offTime: inputOffTime });
    clearForm();
  };
  const handleLocalSubmit = () => {
    setError(null);
    Keyboard.dismiss();
    if (isSubmitDisabled) {
      if (!selectedDay)
        return setError({ field: "day", message: "Please select a day." });
      return setError({
        field: "time",
        message: "Please fill in both On and Off times.",
      });
    }
    const newStartTime = timeToMinutes(inputOnTime);
    const newEndTime = timeToMinutes(inputOffTime);
    if (isNaN(newStartTime) || isNaN(newEndTime)) {
      return setError({
        field: "submit",
        message: "Invalid time format. Please use HH:MM.",
      });
    }
    if (newEndTime <= newStartTime) {
      return setError({
        field: "submit",
        message: "Off time must be after on time.",
      });
    }
    const isDayAlreadyScheduled = schedulesForDevice.some(
      (s) => dayMapReverse[s.day] === selectedDay
    );
    if (isDayAlreadyScheduled) {
      Alert.alert(
        "Schedule Exists",
        `A schedule for ${selectedDay} already exists. Do you want to overwrite it?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Overwrite", onPress: proceedSubmit },
        ]
      );
    } else {
      proceedSubmit();
    }
  };
  return (
    <>
      <View className="bg-light rounded-2xl p-5 mb-5 shadow-sm shadow-black/5">
        <Text className="text-lg font-poppins-semibold text-dark mb-4">
          Set Fan Schedule
        </Text>
        <TouchableOpacity
          className="flex-row justify-between items-center bg-gray-100 rounded-xl p-4"
          onPress={() => {
            setError(null);
            setDayModalVisible(true);
          }}
        >
          {/* [FIX 2] Ganti ikon ke Lucide */}
          <Calendar size={20} className="text-primary" />
          <Text className="flex-1 text-center text-base font-poppins-medium text-dark">
            {selectedDay || "Select Day"}
          </Text>
          {/* [FIX 2] Ganti ikon ke Lucide */}
          <ChevronDown size={20} color="#BA2025" />
        </TouchableOpacity>
        {error && error.field === "day" && (
          <Text className="text-red-500 text-sm mt-2 ml-2 font-poppins-regular">
            {error.message}
          </Text>
        )}
        <View className="mt-4">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 mb-2.5">
            {/* [FIX 2] Ganti ikon ke Lucide */}
            <Clock size={20} color="#6b7280" />
            <Text className="text-lg text-dark mx-2.5 font-poppins-regular">
              On Time
            </Text>
            <TextInput
              className="flex-1 py-4 text-base text-right font-poppins-regular"
              placeholder="HH:MM"
              keyboardType="numeric"
              maxLength={5}
              value={inputOnTime}
              onChangeText={(text) =>
                handleTimeInputChange(text, setInputOnTime)
              }
            />
          </View>
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4">
            {/* [FIX 2] Ganti ikon ke Lucide */}
            <Clock size={20} color="#6b7280" />
            <Text className="text-lg text-dark mx-2.5 font-poppins-regular">
              Off Time
            </Text>
            <TextInput
              className="flex-1 py-4 text-base text-right font-poppins-regular"
              placeholder="HH:MM"
              keyboardType="numeric"
              maxLength={5}
              value={inputOffTime}
              onChangeText={(text) =>
                handleTimeInputChange(text, setInputOffTime)
              }
            />
          </View>
        </View>
        {error && error.field === "time" && (
          <Text className="text-red-500 text-sm mt-2 ml-2 font-poppins-regular">
            {error.message}
          </Text>
        )}
        <TouchableOpacity
          className={`rounded-2xl py-4 items-center mt-4 ${
            isSubmitDisabled ? "bg-gray-300" : "bg-primary"
          }`}
          onPress={handleLocalSubmit}
          disabled={isSubmitDisabled}
        >
          <Text className="text-lg font-poppins-semibold text-white">
            Save Schedule
          </Text>
        </TouchableOpacity>
        {error && error.field === "submit" && (
          <Text className="text-red-500 text-sm text-center mt-4 font-poppins-regular">
            {error.message}
          </Text>
        )}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDayModalVisible}
        onRequestClose={() => setDayModalVisible(false)}
      >
        <Pressable
          className="flex-1 justify-center bg-black/50 p-5"
          onPress={() => setDayModalVisible(false)}
        >
          <Pressable className="bg-white rounded-2xl p-5">
            <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
            <Text className="text-lg font-poppins-bold mb-4 text-center">
              Select a Day
            </Text>
            {daysOfWeek.map((item) => (
              <TouchableOpacity
                key={item}
                className="py-4 border-b border-gray-200"
                onPress={() => {
                  setSelectedDay(item);
                  setDayModalVisible(false);
                }}
              >
                <Text className="text-center text-base text-dark">{item}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

// [FIX] Mengembalikan JSX yang lengkap
const AutoModeOverlay: React.FC = () => (
  <View className="absolute inset-0 bg-gray-100/90 justify-center items-center rounded-2xl z-10 p-4 border border-gray-200">
    <Lock size={32} color="#6b7280" />
    <Text className="text-center font-poppins-bold text-gray-500 mt-2">
      Automatic Mode is On
    </Text>
    <Text className="text-center text-base text-gray-500">
      Schedules are disabled.
    </Text>
  </View>
);

// [FIX] Mengembalikan definisi tipe dan JSX yang lengkap
const TabSegment: React.FC<{
  label: string;
  isActive: boolean;
  onPress: () => void;
}> = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 p-3 rounded-full ${isActive ? "bg-white shadow" : ""}`}
  >
    <Text
      className={`text-center font-poppins-semibold text-base ${
        isActive ? "text-primary" : "text-gray-500"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// [FIX] Mengembalikan definisi tipe dan JSX yang lengkap
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

// --- Halaman Kontrol Utama ---
export default function FanControlScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"control" | "schedule">("control");
  const [isFanOn, setIsFanOn] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [motionStatus] = useState("Clear");
  const [isActionLoading, setActionLoading] = useState(false);
  const deviceName = "Kipas Angin";
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [editOnTime, setEditOnTime] = useState("");
  const [editOffTime, setEditOffTime] = useState("");
  const [editError, setEditError] = useState<string | null>(null);
  const handleFanToggle = () => {
    if (isAutoMode) return;
    setActionLoading(true);
    setTimeout(() => {
      setIsFanOn(!isFanOn);
      setActionLoading(false);
    }, 500);
  };
  const handleAutoModeToggle = () => {
    if (isActionLoading) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsAutoMode(!isAutoMode);
  };
  const handleSubmitNewSchedule = useCallback(
    (newScheduleData: Omit<Schedule, "id">) => {
      setActionLoading(true);
      setTimeout(() => {
        setSchedules((currentSchedules) => {
          const existingIndex = currentSchedules.findIndex(
            (s) => s.day === newScheduleData.day
          );
          const newSchedule = { ...newScheduleData, id: Date.now().toString() };
          if (existingIndex > -1) {
            const updatedSchedules = [...currentSchedules];
            updatedSchedules[existingIndex] = newSchedule;
            return updatedSchedules;
          } else {
            return [...currentSchedules, newSchedule];
          }
        });
        setActionLoading(false);
        Alert.alert("Sukses", "Jadwal berhasil disimpan.");
      }, 500);
    },
    []
  );
  const handleDeleteSchedule = useCallback((dayToDelete: string) => {
    setActionLoading(true);
    setTimeout(() => {
      setSchedules((current) => current.filter((s) => s.day !== dayToDelete));
      setActionLoading(false);
      Alert.alert("Sukses", "Jadwal berhasil dihapus.");
    }, 500);
  }, []);
  const handleStartEdit = useCallback((schedule: Schedule) => {
    setEditingSchedule(schedule);
    setEditOnTime(schedule.onTime);
    setEditOffTime(schedule.offTime);
    setEditError(null);
    setIsEditModalVisible(true);
  }, []);
  const handleEditTimeChange = useCallback(
    (text: string, setter: (value: string) => void) => {
      setEditError(null);
      const nums = text.replace(/[^0-9]/g, "");
      if (nums.length > 4) return;
      let formattedText = nums;
      if (nums.length > 2)
        formattedText = `${nums.slice(0, 2)}:${nums.slice(2)}`;
      setter(formattedText);
    },
    []
  );
  const handleUpdateSchedule = useCallback(() => {
    if (!editingSchedule) return;
    setEditError(null);
    const newStartTime = timeToMinutes(editOnTime);
    const newEndTime = timeToMinutes(editOffTime);
    if (isNaN(newStartTime) || isNaN(newEndTime)) {
      return setEditError("Invalid time format. Please use HH:MM.");
    }
    if (newEndTime <= newStartTime) {
      return setEditError("Off time must be after on time.");
    }
    setActionLoading(true);
    setTimeout(() => {
      setSchedules((current) =>
        current.map((s) =>
          s.id === editingSchedule.id
            ? { ...s, onTime: editOnTime, offTime: editOffTime }
            : s
        )
      );
      setActionLoading(false);
      setIsEditModalVisible(false);
      setEditingSchedule(null);
      Alert.alert("Sukses", "Jadwal berhasil diperbarui.");
    }, 500);
  }, [editingSchedule, editOnTime, editOffTime]);
  const renderScheduleItem = ({ item }: { item: Schedule }) => (
    <View
      className={`rounded-2xl p-4 mb-2.5 flex-row items-center justify-between shadow-sm shadow-black/5 border border-gray-100 ${
        isAutoMode ? "bg-gray-100" : "bg-white"
      }`}
    >
      <View className="flex-1">
        <View className="flex-row items-center mb-2">
          <Text className="text-lg font-poppins-bold text-primary">
            {dayMapReverse[item.day] || item.day}
          </Text>
          {isAutoMode && (
            <View className="bg-gray-200 px-2 py-0.5 rounded-full ml-2">
              <Text className="text-xs font-poppins-semibold text-gray-600">
                DISABLED
              </Text>
            </View>
          )}
        </View>
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            <Text className="text-base text-gray-500 mr-1">On</Text>
            <Text className="text-base font-poppins-semibold text-dark">
              {item.onTime}
            </Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
            <Text className="text-base text-gray-500 mr-1">Off</Text>
            <Text className="text-base font-poppins-semibold text-dark">
              {item.offTime}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleStartEdit(item)}
        className="pl-4 p-1"
        disabled={isAutoMode}
      >
        <Pencil size={20} color={isAutoMode ? "#9ca3af" : "#BA2025"} />
      </TouchableOpacity>
    </View>
  );
  const renderHiddenItem = (data: any, rowMap: any) => (
    <View className="items-center bg-red-500 flex-1 flex-row justify-end mb-2.5 rounded-2xl">
      <TouchableOpacity
        className="items-center justify-center absolute top-0 bottom-0 w-[90px] right-0"
        onPress={() => {
          rowMap[data.item.id].closeRow();
          handleDeleteSchedule(data.item.day);
        }}
        disabled={isAutoMode}
      >
        <Trash2 size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
  const fanColorClass = isFanOn ? "text-blue-500" : "text-gray-400";
  const fanStatusText = isFanOn ? "Menyala" : "Mati";
  const motionColorClass =
    motionStatus === "Detected" ? "text-green-500" : "text-gray-500";
  return (
    <SafeAreaView className="flex-1 bg-light">
      <View className="p-5 flex-row items-center border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ArrowLeft size={28} color="#000000" />
        </TouchableOpacity>
        <Text className="font-poppins-semibold text-xl text-dark ml-4">
          {deviceName}
        </Text>
      </View>
      <View className="flex-row p-1 bg-gray-100 rounded-full mx-6 my-4">
        <TabSegment
          label="Control"
          isActive={activeTab === "control"}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setActiveTab("control");
          }}
        />
        <TabSegment
          label="Schedule"
          isActive={activeTab === "schedule"}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setActiveTab("schedule");
          }}
        />
      </View>
      {activeTab === "control" && (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        >
          <View className="items-center my-8">
            <Fan size={150} className={fanColorClass} />
          </View>
          <View className="items-center mb-10">
            <TouchableOpacity
              className={`w-24 h-24 rounded-full items-center justify-center border-4 ${
                isAutoMode
                  ? "bg-gray-200 border-gray-300"
                  : isFanOn
                  ? "bg-primary/10 border-primary/30"
                  : "bg-gray-100 border-gray-300"
              }`}
              onPress={handleFanToggle}
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
                      : isFanOn
                      ? "text-primary"
                      : "text-gray-600"
                  }
                />
              )}
            </TouchableOpacity>
            <Text
              className={`font-poppins-semibold text-2xl mt-4 ${
                isFanOn ? "text-dark" : "text-gray-500"
              }`}
            >
              {isAutoMode ? "Mode Otomatis" : `Kipas ${fanStatusText}`}
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
              icon={Fan}
              label="Fan Status"
              value={fanStatusText}
              colorClass={isFanOn ? "text-green-500" : "text-red-500"}
            />
          </View>
          <View className="flex-row justify-between items-center bg-gray-100 rounded-2xl p-5 w-full">
            <View>
              <Text className="font-poppins-semibold text-lg text-dark">
                Mode Otomatis
              </Text>
              <Text className="font-poppins-regular text-sm text-gray-500 mt-1">
                Kontrol kipas berdasarkan deteksi
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
      )}
      {activeTab === "schedule" && (
        <View className="flex-1 px-6">
          <SwipeListView
            data={schedules.sort(
              (a, b) =>
                daysOfWeek.indexOf(dayMapReverse[a.day]) -
                daysOfWeek.indexOf(dayMapReverse[b.day])
            )}
            renderItem={renderScheduleItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-90}
            disableRightSwipe={isAutoMode}
            keyExtractor={(item: Schedule) => item.id}
            ListHeaderComponent={
              <ScheduleFormComponent
                schedulesForDevice={schedules}
                onSubmit={handleSubmitNewSchedule}
              />
            }
            ListEmptyComponent={() => (
              <View className="items-center justify-center py-10 bg-gray-50 rounded-2xl">
                <Calendar size={40} color="#9ca3af" />
                <Text className="font-poppins-medium text-base text-gray-400 mt-4">
                  No schedules added yet.
                </Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 48 }}
          />
          <AutoModeOverlay />
        </View>
      )}
      {editingSchedule && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isEditModalVisible}
          onRequestClose={() => setIsEditModalVisible(false)}
        >
          <Pressable
            className="flex-1 justify-center bg-black/50 p-5"
            onPress={() => setIsEditModalVisible(false)}
          >
            <Pressable className="bg-white rounded-2xl p-6 w-full self-center shadow-lg">
              <Text className="text-lg font-poppins-bold text-center mb-2">
                Edit Schedule
              </Text>
              <Text className="text-base text-center text-gray-500 mb-5">
                {"Editing for "}
                <Text className="font-bold">
                  {dayMapReverse[editingSchedule.day] || editingSchedule.day}
                </Text>
              </Text>
              <View>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 mb-2.5">
                  <Clock size={20} color="#6b7280" />{" "}
                  <Text className="text-lg text-dark mx-2.5">On Time</Text>
                  <TextInput
                    className="flex-1 py-4 text-base text-right"
                    placeholder="HH:MM"
                    keyboardType="numeric"
                    maxLength={5}
                    value={editOnTime}
                    onChangeText={(text) =>
                      handleEditTimeChange(text, setEditOnTime)
                    }
                  />
                </View>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4">
                  <Clock size={20} color="#6b7280" />
                  <Text className="text-lg text-dark mx-2.5">Off Time</Text>
                  <TextInput
                    className="flex-1 py-4 text-base text-right"
                    placeholder="HH:MM"
                    keyboardType="numeric"
                    maxLength={5}
                    value={editOffTime}
                    onChangeText={(text) =>
                      handleEditTimeChange(text, setEditOffTime)
                    }
                  />
                </View>
              </View>
              {editError && (
                <Text className="text-red-500 text-sm text-center mt-4 font-poppins-regular">
                  {editError}
                </Text>
              )}
              <TouchableOpacity
                className="bg-primary rounded-2xl py-4 items-center mt-5"
                onPress={handleUpdateSchedule}
              >
                <Text className="text-base font-poppins-bold text-white">
                  Save Changes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-transparent border border-gray-400 rounded-2xl py-4 items-center mt-2.5"
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text className="text-base font-poppins-bold text-gray-500">
                  Cancel
                </Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </SafeAreaView>
  );
}
