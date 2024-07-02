import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import logo from "../../src/assets/logo-column.png";


import { styles } from "../styles";
import useOrder from "../../src/utils/hooks/useOrder";
import { useRouter } from "expo-router";

const endTurn = () => {
  const router = useRouter();
  const { order } = useOrder();
  const orderId = order?.id;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={logo}style={{ height: 98, width: 270 }} />
        <Text style={styles.titleBig}>Turno/Ordem Finalizada</Text>
        <Text style={styles.title}>Ordem de Serviço - {orderId || ""}</Text>
        <Text style={styles.title}>Operador - Maicon Lara</Text>
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
         onPress={() => {
          router.push("/");
         }}
        >
          <Text style={styles.buttonText}>Voltar ao login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default endTurn;
