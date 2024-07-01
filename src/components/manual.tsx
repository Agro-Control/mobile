import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";
import Timer from "../../src/components/timer";
import { colors } from "../../src/colors";
import Header from "./header";
import { SimulatorEvent } from "../interface/Event";
import { useRouter } from "expo-router";

interface EventProps {
  event: string;
  handleEvent: (event: SimulatorEvent) => void;
  resetTimer: boolean;
  setResetTimer: React.Dispatch<React.SetStateAction<boolean>>;
  orderId: number;
}

export const eventsArray: SimulatorEvent[] = [
  {
    id: 1,
    name: "Abastecimento",
    value: "abastecimento",
    isAutomatic: false,
    maxDuration: 400000,
    minDuration: 200000,
    rpm: 0,
    maxSpeed: 0,
    minSpeed: 0,
  },
  {
    id: 2,
    name: "Aguard. Trans.",
    value: "aguardando_transbordo",
    isAutomatic: false,
    maxDuration: 13000,
    minDuration: 8000,
    rpm: 0,
    maxSpeed: 0,
    minSpeed: 0,
  },
  {
    id: 3,
    name: "Troca de Turno",
    value: "troca_turno",
    isAutomatic: false,
    maxDuration: 35000,
    minDuration: 15000,
    rpm: 0,
    maxSpeed: 0,
    minSpeed: 0,
  },
  {
    id: 4,
    name: "Manutenção",
    value: "manutencao",
    isAutomatic: false,
    maxDuration: 160000,
    minDuration: 90000,
    rpm: 0,
    maxSpeed: 0,
    minSpeed: 0,
  },
  {
    id: 5,
    name: "Clima",
    value: "clima",
    isAutomatic: false,
    maxDuration: 60000,
    minDuration: 20000,
    rpm: 0,
    maxSpeed: 0,
    minSpeed: 0,
  },
  {
    id: 6,
    name: "Operação",
    value: "operacao",
    isAutomatic: true,
    maxDuration: 40000,
    minDuration: 16000,
    rpm: 1500,
    maxSpeed: 5.0,
    minSpeed: 1.5,
  },
  {
    id: 7,
    name: "Transbordo",
    value: "aguardando_transbordo",
    isAutomatic: true,
    maxDuration: 13000,
    minDuration: 8000,
    rpm: 0,
    maxSpeed: 0,
    minSpeed: 0,
  },
  {
    id: 8,
    name: "Deslocamento",
    value: "deslocamento",
    isAutomatic: true,
    maxDuration: 8000,
    minDuration: 4000,
    rpm: 1000,
    maxSpeed: 3.0,
    minSpeed: 1.0,
  },
];

const Manual = ({
  orderId,
  event,
  handleEvent,
  resetTimer,
  setResetTimer,
}: EventProps) => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={[styles.eventContainer, { paddingTop: top + 80 }]}>
      <Header />

      <View style={styles.eventTitleContainer}>
        <Text style={styles.eventTitle}>Eventos Manuais</Text>
        <Text style={styles.title}>Ordem de Serviço - {orderId}</Text>
      </View>
      <View style={styles.eventButtonContainer}>
        {eventsArray.slice(0,5).map((event) => (
          <TouchableOpacity
            onPress={() => handleEvent(event)}
            key={event.id}
            style={[
              styles.eventButton,
              {
                backgroundColor: colors.green[400],
              },
            ]}
          >
            <Text style={styles.buttonText}>{event.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => {
            handleEvent({
              id: 9,
              name: "Finalizar OS",
              value: "fim_ordem",
              isAutomatic: false,
              maxDuration: 0,
              minDuration: 0,
              rpm: 0,
              maxSpeed: 0,
              minSpeed: 0,
            });
            router.push("pages/endTurn");
          }}
          style={[
            styles.eventButton,
            {
              backgroundColor: colors.green[700],
            },
          ]}
        >
          <Text style={styles.buttonText}>Finalizar OS</Text>
        </TouchableOpacity>
      </View>

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
export default Manual;
