// app/(auth)/ip-device.tsx

import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// [GEMINI] Path ke logo, 2 level keluar (../../)
import FullLogo from "../../assets/images/logodmouv.svg";

// [GEMINI] API 'onboardDevice' belum ada, kita akan simulasikan
// import { onboardDevice } from "../../api/auth";

// [GEMINI] Ganti nama komponen agar sesuai file (opsional, tapi rapi)
export default function IpDeviceScreen() {
  const [uniqueId, setUniqueId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<boolean>(false);
  const router = useRouter();

  const validateField = () => {
    if (!uniqueId.trim()) {
      setError("Device ID tidak boleh kosong.");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegisterDevice = async () => {
    if (!validateField()) {
      return;
    }
    setIsLoading(true);

    // --- [GEMINI] SIMULASI API ---
    // Kita simulasikan sukses setelah 2 detik.
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Sukses", "Device berhasil didaftarkan!", [
        {
          text: "OK",
          // Arahkan ke dashboard utama
          onPress: () => router.replace("/(tabs)/home"),
        },
      ]);
    }, 2000);

    /* // --- [GEMINI] INI KODE ASLI JIKA API ('onboardDevice') SUDAH SIAP ---
     try {
       const response = await onboardDevice({ uniqueId: uniqueId.trim() });
       if (response) {
         Alert.alert("Success", "Device registered successfully!", [
           {
             text: "OK",
             onPress: () => router.replace("/(tabs)/home"),
           },
         ]);
       }
     } catch (error) {
       console.error("Onboarding failed unexpectedly:", error);
       Alert.alert("Error", "Gagal mendaftarkan device.");
     } finally {
       setIsLoading(false);
     }
    */
  };

  return (
    // [GEMINI] Tema: bg-light (putih)
    <SafeAreaView className="flex-1 bg-light">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center p-5"
      >
        <View className="items-center mb-8">
          <FullLogo width={280} height={60} className="mb-5" />
          <Text className="font-poppins-medium text-2xl text-primary text-center mt-2">
            Register a New Device
          </Text>
        </View>

        {/* [GEMINI] Tema: bg-gray-100 */}
        <View className="bg-gray-100 rounded-2xl p-6 shadow-lg shadow-black/20">
          <View className="mb-5">
            <Text className="font-poppins-semibold text-lg text-dark mb-2">
              Device ID
            </Text>
            <TextInput
              // [GEMINI] Tema: border-primary, border-gray-200, border-red-500
              className={`border rounded-xl px-4 h-12 text-base font-roboto-regular text-dark bg-light shadow-sm ${
                focusedInput ? "border-primary border-2" : "border-gray-200"
              } ${!!error ? "border-red-500" : ""}`}
              placeholder="Example: dmouv-utama"
              placeholderTextColor={"#C7C7C7"} // gray-200
              value={uniqueId}
              onChangeText={(text) => {
                setUniqueId(text);
                if (error) setError("");
              }}
              autoCapitalize="none"
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
            />
            {error ? (
              // [GEMINI] Tema: text-red-500
              <Text className="text-red-500 font-roboto-regular text-xs mt-1 pl-1">
                {error}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            // [GEMINI] Tema: bg-primary
            className={`py-4 rounded-2xl items-center mt-2.5 ${
              isLoading ? "bg-primary/70" : "bg-primary"
            }`}
            onPress={handleRegisterDevice}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={"#FFFFFF"} />
            ) : (
              <Text className="font-poppins-semibold text-lg text-light">
                Register Device
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
