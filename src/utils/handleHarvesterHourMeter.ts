import Toast from "react-native-root-toast";
import { colors } from "../colors";
import { useRouter } from "expo-router";

export const handleHarvesterHourMeter = (hourMeter: number) => {
  const router = useRouter();
  router.push("pages/event");

  // if (isNaN(hourMeter) || hourMeter < 0) {
  //   const hourMeterDescription = isNaN(hourMeter)
  //     ? "Digite um valor válido"
  //     : "O horímetro atual não pode ser menor que o anterior";
  //   const toast = Toast.show(hourMeterDescription, {
  //     duration: Toast.durations.LONG,
  //     position: 50,
  //     shadow: true,
  //     animation: true,
  //     hideOnPress: true,
  //     delay: 0,
  //     backgroundColor: colors.red[500],
  //     textColor: colors.default.bg,
  //     onShow: () => {},
  //     onShown: () => {},
  //     onHide: () => {},
  //     onHidden: () => {},
  //   });

  //   setTimeout(function () {
  //     Toast.hide(toast);
  //   }, 2500);
  // } else {
  //   router.push("pages/event");
  // }
};
