// app/(auth)/forgot-password.tsx

import { Ionicons } from "@expo/vector-icons";
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

// [GEMINI] Path ke logo, disamakan dengan login.tsx
import FullLogo from "../../assets/images/logodmouv.svg";

// [GEMINI] Anda perlu membuat fungsi ini di API Anda.
// Untuk saat ini, kita akan simulasikan saja.
// import { resetPassword } from "../../api/auth";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Validasi dari referensi Anda
  const validateFields = () => {
    const newErrors = { email: "", newPassword: "", confirmPassword: "" };
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email harus diisi";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Format email tidak valid";
      isValid = false;
    }

    if (!newPassword) {
      newErrors.newPassword = "Password harus diisi";
      isValid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password minimal 8 karakter";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Silakan konfirmasi password";
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleResetPassword = async () => {
    if (!validateFields()) {
      return;
    }
    setIsLoading(true);

    // --- [GEMINI] SIMULASI API ---
    // Fungsi 'resetPassword' dari referensi Anda belum kita miliki.
    // Kita akan simulasikan sukses setelah 2 detik.
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Sukses", "Password Anda telah berhasil direset.", [
        {
          text: "OK",
          onPress: () => router.push("/(auth)/login"),
        },
      ]);
    }, 2000);

    /* // --- [GEMINI] INI KODE ASLI JIKA API SUDAH SIAP ---
     try {
       const response = await resetPassword(email, newPassword);
       if (response) {
         Alert.alert("Success", response.message, [
           {
             text: "OK",
             onPress: () => router.push("/(auth)/login"),
           },
         ]);
       }
     } catch (error) {
       console.error("Password reset failed unexpectedly:", error);
       Alert.alert("Error", "Gagal mereset password.");
     } finally {
       setIsLoading(false);
     }
    */
  };

  return (
    // [GEMINI] Disesuaikan dengan tema: bg-light
    <SafeAreaView className="flex-1 bg-light">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center p-5"
      >
        <View className="items-center mb-8">
          <FullLogo width={280} height={60} className="mb-5" />
          <Text className="font-poppins-medium text-2xl text-primary text-center mt-2">
            Reset Your Password
          </Text>
        </View>

        {/* [GEMINI] Disesuaikan dengan tema: bg-gray-100 */}
        <View className="bg-gray-100 rounded-2xl p-6 shadow-lg shadow-black/20">
          {/* Email Input */}
          <View className="mb-5">
            <Text className="font-poppins-semibold text-lg text-dark mb-2">
              Email
            </Text>
            <TextInput
              // [GEMINI] Disesuaikan dengan tema
              className={`border rounded-xl px-4 h-12 text-base font-roboto-regular text-dark bg-light shadow-sm ${
                focusedInput === "email"
                  ? "border-primary border-2"
                  : "border-gray-200"
              } ${!!errors.email ? "border-red-500" : ""}`}
              placeholder="Enter your registered email"
              placeholderTextColor={"#C7C7C7"} // gray-200
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.email ? (
              // [GEMINI] Disesuaikan dengan tema
              <Text className="text-red-500 font-roboto-regular text-xs mt-1 pl-1">
                {errors.email}
              </Text>
            ) : null}
          </View>

          {/* New Password Input */}
          <View className="mb-5">
            <Text className="font-poppins-semibold text-lg text-dark mb-2">
              New Password
            </Text>
            <View
              // [GEMINI] Disesuaikan dengan tema
              className={`flex-row items-center border rounded-xl bg-light shadow-sm ${
                focusedInput === "newPassword"
                  ? "border-primary border-2"
                  : "border-gray-200"
              } ${!!errors.newPassword ? "border-red-500" : ""}`}
            >
              <TextInput
                className="flex-1 px-4 h-12 text-base font-roboto-regular text-dark"
                placeholder="Minimum 8 characters"
                placeholderTextColor={"#C7C7C7"} // gray-200
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!isPasswordVisible}
                onFocus={() => setFocusedInput("newPassword")}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                className="px-2.5"
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color={"#BA2025"} // [GEMINI] Warna primer Anda
                />
              </TouchableOpacity>
            </View>
            {errors.newPassword ? (
              // [GEMINI] Disesuaikan dengan tema
              <Text className="text-red-500 font-roboto-regular text-xs mt-1 pl-1">
                {errors.newPassword}
              </Text>
            ) : null}
          </View>

          {/* Confirm New Password Input */}
          <View className="mb-5">
            <Text className="font-poppins-semibold text-lg text-dark mb-2">
              Confirm New Password
            </Text>
            <View
              // [GEMINI] Disesuaikan dengan tema
              className={`flex-row items-center border rounded-xl bg-light shadow-sm ${
                focusedInput === "confirmPassword"
                  ? "border-primary border-2"
                  : "border-gray-200"
              } ${!!errors.confirmPassword ? "border-red-500" : ""}`}
            >
              <TextInput
                className="flex-1 px-4 h-12 text-base font-roboto-regular text-dark"
                placeholder="Repeat new password"
                placeholderTextColor={"#C7C7C7"} // gray-200
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!isConfirmPasswordVisible}
                onFocus={() => setFocusedInput("confirmPassword")}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                onPress={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                className="px-2.5"
              >
                <Ionicons
                  name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color={"#BA2025"} // [GEMINI] Warna primer Anda
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? (
              // [GEMINI] Disesuaikan dengan tema
              <Text className="text-red-500 font-roboto-regular text-xs mt-1 pl-1">
                {errors.confirmPassword}
              </Text>
            ) : null}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            // [GEMINI] Disesuaikan dengan tema
            className={`py-4 rounded-2xl items-center mt-2.5 ${
              isLoading ? "bg-primary/70" : "bg-primary"
            }`}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={"#FFFFFF"} /> // [GEMINI] Warna putih
            ) : (
              <Text className="font-poppins-semibold text-lg text-light">
                Reset Password
              </Text>
            )}
          </TouchableOpacity>

          {/* Back to Sign In */}
          <View className="mt-8 items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="font-roboto-regular text-base text-primary">
                Back to Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
