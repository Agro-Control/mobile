import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import logo from "../../src/assets/logo-column.png";

import { styles } from "../styles";
import useOrder from "../../src/utils/hooks/useOrder";

const startTurn = () => {
  const { order } = useOrder();
  const orderId = order?.id;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={logo} style={{ height: 98, width: 270 }} />
        <Text style={styles.title}>Ordem de Serviço - {orderId || ""}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity activeOpacity={0.6} style={styles.button}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.button}>
          <Text style={styles.buttonText}>Começar Turno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default startTurn;
