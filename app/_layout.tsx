// app/_layout.tsx

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
// 1. Import useState
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import CustomSplashScreen from "../components/layout/CustomSplashScreen";
import CustomHeader from "../components/navigation/CustomHeader";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 2. Tambahkan state baru untuk jeda buatan
  const [isAppReady, setIsAppReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-SemiBoldItalic": require("../assets/fonts/Roboto-SemiBoldItalic.ttf"),
  });

  useEffect(() => {
    if (fontError) {
      // Selalu cetak error jika ada
      console.error("===== GAGAL MEMUAT FONT, CEK PATH ANDA: =====");
      console.error(fontError);
      console.error("==============================================");
    }

    // Cek jika font sudah selesai (berhasil atau gagal)
    if (fontsLoaded || fontError) {
      // Sembunyikan splash native
      SplashScreen.hideAsync();

      // 3. Beri jeda 2 detik SEBELUM menandai aplikasi siap
      const timer = setTimeout(() => {
        setIsAppReady(true);
      }, 4000); // 2000 ms = 2 detik

      // Membersihkan timer
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, fontError]); // Efek ini bergantung pada font

  // 4. LOGIKA BARU:
  // Tampilkan splash screen jika FONT BELUM SIAP atau JEDA BELUM SELESAI
  if (!fontsLoaded || !isAppReady) {
    // Jika fontsLoaded=false, ini akan tampil (memuat font)
    // Jika fontsLoaded=true tapi isAppReady=false, ini akan tampil (menunggu jeda 2 detik)
    // Jika fontError=true, ini akan tampil (terjebak di splash screen)
    return <CustomSplashScreen />;
  }

  // 5. HANYA jika font dimuat DAN jeda 2 detik selesai, tampilkan aplikasi
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="notification"
            options={{
              header: () => <CustomHeader title="" />,
            }}
          />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
