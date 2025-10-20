import { LogItem } from "../types/history"; // Pastikan LogItem diimpor
import { Move, Lightbulb, Fan, Clock } from "lucide-react-native";

// [FIX] Ubah parameter dari (type: LogType) menjadi (item: LogItem)
export const getLogVisuals = (item: LogItem) => {
  
  // Sekarang kita cek berdasarkan 'item.type'
  switch (item.type) {
    case "motion":
      return {
        Icon: Move,
        color: "text-state-alert-motion-text",
        bg: "bg-state-alert-motion-bg",
      };
    case "lamp":
      // Kita bisa cek 'item.title' untuk status on/off
      const isLampOn = item.title.includes("Dinyalakan");
      return {
        Icon: Lightbulb,
        color: isLampOn ? "text-state-on-lamp-text" : "text-state-off-text",
        bg: isLampOn ? "bg-state-on-lamp-bg" : "bg-state-off-bg",
      };
    case "fan":
      // Kita bisa cek 'item.title' untuk status on/off
      const isFanOn = item.title.includes("Dinyalakan");
      return {
        Icon: Fan,
        color: isFanOn ? "text-state-on-fan-text" : "text-state-off-text",
        bg: isFanOn ? "bg-state-on-fan-bg" : "bg-state-off-bg",
      };
    default:
      return {
        Icon: Clock,
        color: "text-gray-700", // Fallback
        bg: "bg-gray-200",    // Fallback
      };
  }
};