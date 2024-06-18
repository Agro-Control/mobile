import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import logo from "../../src/assets/logo-column.png";

import { handleHarvesterHourMeter } from "../../src/utils/handleHarvesterHourMeter";

import { styles } from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const endTurn = () => {
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
        <Text style={styles.titleBig}>Finalizar Turno</Text>
        <Text style={styles.title}>Ordem de Serviço - {selectedHarvester}</Text>
        <Text style={styles.title}>Operador - Maicon Lara</Text>
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
          <Text style={styles.buttonText}>Finalizar Turno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default endTurn;
