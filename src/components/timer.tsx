import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useStopwatch } from "react-timer-hook";
import { styles } from "./styles";

interface TimerProps {
  shouldResetTimer: boolean;
  setShouldResetTimer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer = ({ shouldResetTimer, setShouldResetTimer }: TimerProps) => {
  const { seconds, minutes, hours, reset } = useStopwatch({ autoStart: true });

  useEffect(() => {
    if (shouldResetTimer) {
      reset();
      setShouldResetTimer(false);
    }
  }, [shouldResetTimer]);
  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timer}>{String(hours).padStart(2, "0")}</Text>
      <Text style={styles.timer}>:</Text>
      <Text style={styles.timer}>{String(minutes).padStart(2, "0")}</Text>
      <Text style={styles.timer}>:</Text>
      <Text style={styles.timer}>{String(seconds).padStart(2, "0")}</Text>
    </View>
  );
};
export default Timer;
