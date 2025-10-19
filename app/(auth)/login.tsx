// app/(auth)/login.tsx

import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
// [GEMINI] 1. Impor useRouter kembali
import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";

import FullLogo from "../../assets/images/logodmouv.svg";

// Fungsi validasi
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email harus diisi";
  if (!emailRegex.test(email)) return "Format email tidak valid";
  return "";
};

const validatePassword = (password: string) => {
  if (!password) return "Password harus diisi";
  if (password.length < 8) return "Password minimal 8 karakter";
  return "";
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  // [GEMINI] 2. Deklarasikan router kembali
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const clearErrorsOnChange = () => {
    if (errors.email || errors.password) {
      setErrors({ email: "", password: "" });
    }
  };

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setIsLoading(true);
    try {
      // Panggil signIn dari context Anda
      signIn();

      // [GEMINI] 3. Arahkan ke halaman ip-device SETELAH signIn
      router.replace("/(auth)/ip-device");
    } catch (error) {
      console.error(error);
      Alert.alert("Login Gagal", "Terjadi kesalahan.");
      setIsLoading(false); // Pastikan loading stop jika ada error
    }
    // (Jangan set isLoading(false) di sini jika navigasi berhasil,
    //  karena halaman akan berganti)
  };

  return (
    <SafeAreaView className="flex-1 bg-light">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center p-5"
      >
        <View className="items-center mb-8">
          <FullLogo width={280} height={60} className="mb-5" />
          <Text className="font-poppins-medium text-2xl text-primary text-center mt-2">
            Welcome to D&apos;mouv
          </Text>
        </View>

        <View className="bg-gray-100 rounded-2xl p-6 shadow-lg shadow-black/20">
          <View className="mb-4">
            <Text className="font-poppins-semibold text-lg text-dark mb-2">
              Email
            </Text>
            <TextInput
              className={`border rounded-xl px-4 h-12 text-base font-roboto-regular text-dark bg-light shadow-sm ${
                focusedInput === "email"
                  ? "border-primary border-2"
                  : "border-gray-200"
              } ${!!errors.email ? "border-red-500" : ""}`}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                clearErrorsOnChange();
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={"#C7C7C7"}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.email ? (
              <Text className="text-red-500 font-roboto-regular text-xs mt-1 pl-1">
                {errors.email}
              </Text>
            ) : null}
          </View>

          <View className="mb-4">
            <Text className="font-poppins-semibold text-lg text-dark mb-2">
              Password
            </Text>
            <View
              className={`flex-row items-center border rounded-xl bg-light shadow-sm ${
                focusedInput === "password"
                  ? "border-primary border-2"
                  : "border-gray-200"
              } ${!!errors.password ? "border-red-500" : ""}`}
            >
              <TextInput
                className="flex-1 px-4 h-12 text-base font-roboto-regular text-dark"
                placeholder="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  clearErrorsOnChange();
                }}
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor={"#C7C7C7"}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                className="px-2.5"
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color={"#BA2025"}
                />
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text className="text-red-500 font-roboto-regular text-xs mt-1 pl-1">
                {errors.password}
              </Text>
            ) : null}
          </View>

          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center">
              <Checkbox
                className="mr-2"
                value={rememberMe}
                onValueChange={setRememberMe}
                color={rememberMe ? "#BA2025" : undefined}
              />
              <Text className="font-roboto-regular text-sm text-gray-500">
                Keep me Signed in
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("./(auth)/forgot-password")}
            >
              <Text className="font-roboto-regular text-sm text-primary">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className={`py-4 rounded-2xl items-center ${
              isLoading ? "bg-primary/70" : "bg-primary"
            }`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={"#FFFFFF"} />
            ) : (
              <Text className="font-poppins-semibold text-lg text-light">
                Sign In
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}