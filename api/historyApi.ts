// api/historyApi.ts
import { HistoryQuery, LogSection } from "../types/history";

// --- DATA DARI DATABASE ANDA ---
const ALL_HISTORY_DATA: LogSection[] = [
  {
    title: "Senin, 20 Oktober 2025",
    data: [
      { id: "1", type: "motion", title: "Motion Detected", location: "Pintu Depan", time: "10:32 WIB" },
      { id: "2", type: "lamp", title: "Lampu Dinyalakan", location: "Ruang Tamu", time: "10:30 WIB" },
      { id: "3", type: "fan", title: "Kipas Dimatikan", location: "Kamar Tidur", time: "09:00 WIB" },
      { id: "4", type: "fan", title: "Kipas Dinyalakan", location: "Kamar Tidur", time: "08:30 WIB" },
    ],
  },
  {
    title: "Minggu, 19 Oktober 2025",
    data: [
      { id: "5", type: "lamp", title: "Lampu Dimatikan", location: "Semua Ruangan", time: "23:00 WIB" },
      { id: "6", type: "fan", title: "Kipas Dinyalakan", location: "Kamar Tidur", time: "22:00 WIB" },
      { id: "7", type: "motion", title: "Motion Detected", location: "Garasi", time: "18:15 WIB" },
    ],
  },
  { title: "Jumat, 17 Oktober 2025", data: [{ id: "8", type: "lamp", title: "Lampu Dinyalakan", location: "Dapur", time: "05:30 WIB" }] },
];

// [FIX] Fungsi ini sekarang menerima 'filters' (array)
export const fetchHistory = async (
  query: HistoryQuery
): Promise<LogSection[]> => {
  console.log("Fetching API with query:", query);
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { search, filters } = query;
  const lowerSearch = search.toLowerCase();

  // Jika filter adalah 'all' atau kosong, tidak perlu filter tipe
  const noTypeFilter = filters.includes("all") || filters.length === 0;

  const filteredSections = ALL_HISTORY_DATA.map((section) => {
    const filteredData = section.data.filter((item) => {
      // Filter berdasarkan search
      const searchMatch = !lowerSearch ||
        item.title.toLowerCase().includes(lowerSearch) ||
        item.location.toLowerCase().includes(lowerSearch);

      if (!searchMatch) return false;

      // Filter berdasarkan tipe (jika bukan 'all')
      if (noTypeFilter) {
        return true; // Jika 'all', loloskan semua
      }

      // Cek apakah item cocok dengan salah satu filter di array
      return filters.some(filter => {
        if (filter === 'motion') return item.title.includes('Motion');
        if (filter === 'lamp_on') return item.title.includes('Lampu Dinyalakan');
        if (filter === 'lamp_off') return item.title.includes('Lampu Dimatikan');
        if (filter === 'fan_on') return item.title.includes('Kipas Dinyalakan');
        if (filter === 'fan_off') return item.title.includes('Kipas Dimatikan');
        return false;
      });
    });

    return { ...section, data: filteredData };
  })
  .filter((section) => section.data.length > 0);

  return filteredSections;
};