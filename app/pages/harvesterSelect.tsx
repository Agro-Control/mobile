import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../../src/assets/logo-column.png";
import useUser from "../../src/utils/hooks/useUser";
import Toast from "react-native-root-toast";
import { colors } from "../../src/colors";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import api from "../../src/api/api";
import { AxiosError } from "axios";
import { styles } from "../styles";

const harvesterSelect = () => {
  const [harvesterId, setHarvesterId] = useState("");
  const { user } = useUser();
  const userId = user?.usuario.id;
  const router = useRouter();

  const getOrderRequest = async (harvesterName: string) => {
    try {
      const { data } = await api.get(`/ordem/maquina/ativa?maquina=${harvesterName}&usuario=${userId}`);

      const jsonOrder = JSON.stringify(data);
      await AsyncStorage.setItem("order", jsonOrder);

      router.push("pages/startTurn");
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      const errorMessage = status === 404 ? "Ordem de serviço não encontrada" : "Erro ao buscar a ordem de serviço";

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
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nome da colhedora"
          style={styles.input}
          onChangeText={(text) => {
            setHarvesterId(text);
          }}
        ></TextInput>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={() => {
            getOrderRequest(harvesterId);
          }}
        >
          <Text style={styles.buttonText}>Selecionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default harvesterSelect;
