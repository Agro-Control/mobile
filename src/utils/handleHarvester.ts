import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../colors";
import { useRouter } from "expo-router";

const harvesters = [
  { id: "12345" },
  { id: "00000" },
  { id: "00001" },
  { id: "11111" },
  { id: "12312" },
];

export const handleHarvester = async (harvesterId: string) => {
  const router = useRouter();
  const harvesterExists = harvesters.some(
    (harvester) => harvester.id === harvesterId
  );
  if (!harvesterExists) {
    const toast = Toast.show("Colhedora não encontrada", {
      duration: Toast.durations.LONG,
      position: 50,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: colors.red[500],
      textColor: colors.default.bg,
      onShow: () => {},
      onShown: () => {},
      onHide: () => {},
      onHidden: () => {},
    });

    setTimeout(function () {
      Toast.hide(toast);
    }, 2500);
  } else {
    await AsyncStorage.setItem("selectedHarvester", harvesterId);
    router.push("pages/harvesterHourMeter");
  }
};
