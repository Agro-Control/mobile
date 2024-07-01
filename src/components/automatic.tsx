import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SimulatorEvent } from "../interface/Event";
import Header from "../../src/components/header";
import Timer from "../../src/components/timer";
import Farm from "../../src/assets/farm.svg";
import Toast from "react-native-root-toast";
import { Text, View } from "react-native";
import { colors } from "../colors";
import { styles } from "./styles";
import React from "react";

export const automaticEvents: SimulatorEvent[] = [
 
];


interface AutomaticProps {
  event: string;
  resetTimer: boolean;
  setResetTimer: React.Dispatch<React.SetStateAction<boolean>>;
  orderId: number;
}

const Automatic = ({
  event,
  resetTimer,
  setResetTimer,
  orderId,
}: AutomaticProps) => {
  const { top } = useSafeAreaInsets();

  const toast = Toast.show(
    "Você está acima da velocidade descrita na ordem de serviço",
    
    {
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
    }
  );

  return (
    <View style={[styles.eventContainer, { paddingTop: top + 80 }]}>
      <Header />
      <View style={styles.eventTitleContainer}>
        <Text style={styles.eventTitle}>Eventos Automáticos</Text>
        <Text style={styles.title}>Ordem de Serviço - {orderId}</Text>
      </View>
      <Farm width={250} height={166} />
      <View style={styles.eventTimerContainer}>
        <Text style={styles.eventDescription}>{event || "Ocioso"}</Text>
        <Timer
          setShouldResetTimer={setResetTimer}
          shouldResetTimer={resetTimer}
        />
      </View>
    </View>
  );
};
export default Automatic;
