import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import logo from "../../src/assets/logo-column.png";

import { styles } from "../styles";
import useOrder from "../../src/utils/hooks/useOrder";
import { useRouter } from "expo-router";
import { AxiosError } from "axios";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../src/api/api";
import useUser from "../../src/utils/hooks/useUser";
import { colors } from "../../src/colors";
import Event from "../../src/interface/evento";

const startTurn = () => {
  const router = useRouter();
  const { user } = useUser();
  const { order } = useOrder();

  const operador_id = user?.usuario.id;
  const empresa_id = user?.usuario.empresa_id;
  const grupo_id = user?.usuario.grupo_id;
  const maquina_id = order?.maquina_id;

  const orderId = order?.id;
  const minimum = order?.velocidade_minima;
  const maximum = order?.velocidade_maxima;
  const rpm = order?.rpm;

  const handleBack = () => {
    router.push("pages/harvesterSelect");
  };

  const handleStartTurn = async () => {
    try {
      const formattedEventData: Event = {
        nome: "inicio_ordem_servico",
        data_inicio: new Date().toISOString(),
        data_fim: new Date().toISOString(),
        duracao: 0,
        ocioso: 0,
        ordem_servico_id: orderId!,
        maquina_id: maquina_id!,
        operador_id: operador_id!,
        empresa_id: empresa_id!,
        grupo_id: grupo_id!,
      };

      await api.post("eventos", formattedEventData);
      router.push("pages/event");
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      const errorMessage =
        status === 404
          ? "Não foi possível iniciar o turno"
          : "Erro ao iniciar seu turno";

      const toast = Toast.show(`${errorMessage}`, {
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
      });

      setTimeout(function () {
        Toast.hide(toast);
      }, 2500);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={logo} style={{ height: 98, width: 270 }} />
        <Text style={styles.title}>Ordem de Serviço - {orderId || ""}</Text>
        <Text style={styles.subTitle}>
          Velocidade Mínima: {minimum || ""}km/h
        </Text>
        <Text style={styles.subTitle}>
          Velocidade Máxima: {maximum || ""}km/h
        </Text>
        <Text style={styles.subTitle}>Motor: {rpm || ""}rpm</Text>
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => {
            handleBack();
          }}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleStartTurn();
          }}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Começar Turno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default startTurn;
