// utils/notificationUtils.ts
import { NotificationType } from "../types/notification";
import { Move, Lightbulb, LightbulbOff, AlertTriangle } from "lucide-react-native";

export const getNotificationVisuals = (type: NotificationType) => {
  switch (type) {
    case "motion":
      return {
        Icon: Move,
        color: "text-state-alert-motion-text",
        bg: "bg-state-alert-motion-bg",
      };
    case "lamp_on":
      return {
        Icon: Lightbulb,
        color: "text-state-on-lamp-text",
        bg: "bg-state-on-lamp-bg",
      };
    case "lamp_off":
      return {
        Icon: LightbulbOff,
        color: "text-state-off-text",
        bg: "bg-state-off-bg",
      };
    case "system":
    default:
      return {
        Icon: AlertTriangle,
        color: "text-primary", // Gunakan warna primer untuk 'alert'
        bg: "bg-primary-light-bg",
      };
  }
};