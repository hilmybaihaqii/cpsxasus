// api/notificationApi.ts
import { NotificationSection } from "../types/notification";

// --- DUMMY DATA ---
// Ini adalah "database" pusat notifikasi Anda di server.
// Perhatikan bahwa data ini tidak akan berubah saat pengguna menghapus notifikasi
// di aplikasi mereka, karena penghapusan ditangani secara lokal.
let MOCK_DATA: NotificationSection[] = [
  {
    title: "Baru",
    data: [
      {
        id: "1",
        type: "motion",
        title: "Gerakan Terdeteksi!",
        body: "Kamera Pintu Depan mendeteksi adanya gerakan.",
        time: "2m lalu",
        isRead: false,
        filterKey: "Pintu Depan",
      },
      {
        id: "2",
        type: "system",
        title: "Koneksi Perangkat Stabil",
        body: "Semua perangkat IoT Anda terhubung dan berjalan normal.",
        time: "10m lalu",
        isRead: false,
        filterKey: "System",
      },
    ],
  },
  {
    title: "Minggu Ini",
    data: [
      {
        id: "3",
        type: "lamp_on",
        title: "Lampu Ruang Tamu Dinyalakan",
        body: "Lampu dinyalakan secara manual melalui aplikasi.",
        time: "1j lalu",
        isRead: true,
        filterKey: "Ruang Tamu",
      },
      {
        id: "4",
        type: "lamp_off",
        title: "Lampu Teras Mati",
        body: "Lampu teras telah dimatikan sesuai jadwal.",
        time: "Kemarin",
        isRead: true,
        filterKey: "Teras",
      },
      {
        id: "5",
        type: "motion",
        title: "Gerakan di Garasi",
        body: "Pergerakan terdeteksi di dekat pintu garasi.",
        time: "2 hari lalu",
        isRead: false,
        filterKey: "Garasi",
      },
    ],
  },
];

// --- API FUNCTIONS ---

/**
 * Mengambil SEMUA notifikasi dari server.
 * Aplikasi kemudian akan memfilternya berdasarkan ID yang dihapus secara lokal.
 */
export const fetchNotifications = async (): Promise<NotificationSection[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_DATA;
};

/**
 * Mensimulasikan penghapusan notifikasi di database server.
 * FUNGSI INI TIDAK LAGI MENGUBAH MOCK_DATA.
 * Penghapusan dari tampilan pengguna ditangani secara lokal di perangkat.
 */
export const deleteNotification = async (id: string): Promise<boolean> => {
  console.log(`API: Memberi tahu server untuk menghapus notifikasi ID: ${id} (simulasi).`);
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Di aplikasi nyata, ini bisa berupa panggilan fetch('...', { method: 'DELETE' })
  return true;
};

/**
 * Menandai satu notifikasi sebagai telah dibaca di server.
 */
export const markAsRead = async (id: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  MOCK_DATA = MOCK_DATA.map(section => ({
    ...section,
    data: section.data.map(item => 
      item.id === id ? { ...item, isRead: true } : item
    ),
  }));
  return true;
};

/**
 * Menandai SEMUA notifikasi sebagai telah dibaca di server.
 */
export const markAllAsRead = async (): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  MOCK_DATA = MOCK_DATA.map(section => ({
    ...section,
    data: section.data.map(item => ({ ...item, isRead: true })),
  }));
  return true;
};