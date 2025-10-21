import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Stack, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import CustomHeader from "../components/navigation/CustomHeader";
import { useFonts } from "expo-font";
import CustomSplashScreen from "../components/layout/CustomSplashScreen";
import { setupPushNotifications } from "../services/notifications";
import * as Notifications from "expo-notifications";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const router = useRouter();

  // Memuat semua font kustom
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

  // useEffect untuk mengelola splash screen
  useEffect(() => {
    if (fontError) console.error("Gagal memuat font:", fontError);
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
      const timer = setTimeout(() => setIsAppReady(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (isAppReady) {
      setupPushNotifications();

      const subscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const data = response.notification.request.content.data;
          console.log("Notifikasi diketuk! Data:", data);

          if (data.screen === "history" && data.filterKey) {
            router.push({
              pathname: "/(tabs)/history",
              params: { prefillSearch: data.filterKey as string },
            });
          }
        });

      return () => subscription.remove();
    }
  }, [isAppReady, router]);

  if (!fontsLoaded || !isAppReady) {
    return <CustomSplashScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="notification"
              options={{ header: () => <CustomHeader title="" /> }}
            />
            <Stack.Screen
              name="lamp-control"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="fan-control" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
