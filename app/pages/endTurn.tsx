import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import logo from "../../src/assets/logo-column.png";


import { styles } from "../styles";
import useOrder from "../../src/utils/hooks/useOrder";

const endTurn = () => {

  const { order } = useOrder();
  const orderId = order?.id;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={logo}style={{ height: 98, width: 270 }} />
        <Text style={styles.titleBig}>Finalizar Turno</Text>
        <Text style={styles.title}>Ordem de Serviço - {orderId || ""}</Text>
        <Text style={styles.title}>Operador - Maicon Lara</Text>
      </View>
      <View style={styles.inputContainer}>
       
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
         
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
         
        >
          <Text style={styles.buttonText}>Finalizar Turno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default endTurn;
