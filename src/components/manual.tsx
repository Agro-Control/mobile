import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";
import Timer from "../../src/components/timer";
import { colors } from "../../src/colors";
import Header from "./header";
import { Event } from "../interface/Event";
import { useRouter } from "expo-router";

export interface EventProps {
  automaticEvent: boolean;
  setAutomaticEvent: React.Dispatch<React.SetStateAction<boolean>>;
  event: Event | undefined;
  selectedHarvester: string;
  handleEvent: (event: Event) => void;
  resetTimer: boolean;
  setResetTimer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const manualEvents: Event[] = [
  {
    id: 1,
    name: "Abastecimento",
  },
  {
    id: 2,
    name: "Aguard. Trans.",
  },
  {
    id: 3,
    name: "Troca de Turno",
  },
  {
    id: 4,
    name: "Manutenção",
  },
  {
    id: 5,
    name: "Clima",
  },
];

const Manual = ({
  event,
  automaticEvent,
  setAutomaticEvent,
  selectedHarvester,
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
        <Text style={styles.title}>Ordem de Serviço - {selectedHarvester}</Text>
      </View>
      <View style={styles.eventButtonContainer}>
        {manualEvents.map((event) => (
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
              id: 6,
              name: "Finalizar OS",
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
        <Text style={styles.eventDescription}>{event?.name || "Ocioso"}</Text>
        <Timer
          setShouldResetTimer={setResetTimer}
          shouldResetTimer={resetTimer}
        />
      </View>
    </View>
  );
};
export default Manual;
