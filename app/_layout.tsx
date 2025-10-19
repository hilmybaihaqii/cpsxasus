// app/_layout.tsx

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import CustomHeader from "../components/navigation/CustomHeader";
import { useFonts } from "expo-font";
import CustomSplashScreen from "../components/layout/CustomSplashScreen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
      console.error("===== GAGAL MEMUAT FONT: =====");
      console.error(fontError);
    }
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
      const timer = setTimeout(() => {
        setIsAppReady(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded || !isAppReady) {
    return <CustomSplashScreen />;
  }

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

          {/* [FIX] TAMBAHKAN DUA BARIS INI 
            Ini akan menyembunyikan header bawaan untuk halaman
            kontrol dan menyelesaikan masalah tumpang tindih.
          */}
          <Stack.Screen name="lamp-control" options={{ headerShown: false }} />
          <Stack.Screen name="fan-control" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
