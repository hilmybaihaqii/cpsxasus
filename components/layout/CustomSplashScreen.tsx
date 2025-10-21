// components/layout/CustomSplashScreen.tsx

import { View } from "react-native";
import Logo from "../../assets/images/logodmouv.svg";

export default function CustomSplashScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-light">
      <Logo width={306} height={100} />
    </View>
  );
}
