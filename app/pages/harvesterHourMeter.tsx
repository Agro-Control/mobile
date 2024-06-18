import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import logo from "../../src/assets/logo-column.png";

import { handleHarvesterHourMeter } from "../../src/utils/handleHarvesterHourMeter";

import { styles } from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const harvesterHourMeter = () => {
  const [harvesterHourMeter, setHarvesterHourMeter] = useState("");
  const [selectedHarvester, setSelectedHarvester] = useState("");

  useEffect(() => {
    const getSelectedHarvester = async () => {
      try {
        const response = await AsyncStorage.getItem("selectedHarvester");
        setSelectedHarvester(response || "Colhedora não selecionada");
      } catch (e) {}
    };

    getSelectedHarvester();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={logo}style={{ height: 98, width: 270 }} />
        <Text style={styles.title}>Ordem de Serviço - {selectedHarvester}</Text>
      </View>
      <View style={styles.inputContainer}>
       
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={() => {
            handleHarvesterHourMeter(parseInt(harvesterHourMeter));
          }}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={() => {
            handleHarvesterHourMeter(parseInt(harvesterHourMeter));
          }}
        >
          <Text style={styles.buttonText}>Começar Turno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default harvesterHourMeter;
