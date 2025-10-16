import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import CustomHeader from '../components/navigation/CustomHeader';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

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

