import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device'; 
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// --- Konfigurasi Penanganan Notifikasi ---
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// --- Fungsi untuk Registrasi ---
export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  let token;

  if (!Device.isDevice) {
    alert('Harus menggunakan perangkat fisik untuk Push Notifikasi');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Gagal mendapatkan izin untuk push notifikasi!');
    return;
  }

  try {
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    if (!projectId) {
      alert('Project ID tidak ditemukan. Pastikan sudah diatur di app.json.');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    console.log('Expo Push Token:', token);
  } catch (e) {
    console.error("Gagal mendapatkan Expo push token:", e);
    alert('Gagal mendapatkan push token.');
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// --- Fungsi untuk Mengirim Token ke Backend Anda ---
async function sendTokenToBackend(token: string) {
  try {
    console.log(`Mengirim token (${token}) ke backend...`);
    // Ganti dengan endpoint API Anda
    // await fetch('https://api.anda.com/register-token', { ... });
    console.log('Token berhasil dikirim (simulasi).');
  } catch (error) {
    console.error('Gagal mengirim token ke backend:', error);
  }
}

// --- Fungsi Utama yang Dipanggil dari app/_layout.tsx ---
export async function setupPushNotifications() {
  const token = await registerForPushNotificationsAsync();
  if (token) {
    await sendTokenToBackend(token);
  }
}

