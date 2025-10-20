// types/history.ts

// [BARU] Ini adalah tipe baru untuk nilai filter Anda
export type FilterValue =
  | "all"
  | "motion"
  | "lamp_on"
  | "lamp_off"
  | "fan_on"
  | "fan_off";

// [DIHAPUS] LogType tidak lagi relevan seperti ini
// export type LogType = "motion" | "lamp" | "fan";

export interface LogItem {
  id: string;
  type: "motion" | "lamp" | "fan"; // 'type' ini tetap berguna untuk getLogVisuals
  title: string;
  location: string;
  time: string;
}

export interface LogSection {
  title: string;
  data: LogItem[];
}

// [MODIFIKASI] Query API sekarang mengirim array filter
export interface HistoryQuery {
  search: string;
  filters: FilterValue[]; // <-- Diubah dari filterType: LogType | null
}