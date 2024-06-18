import React, { useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import logo from "../src/assets/logo-column.png";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { styles } from "./styles";
import { useBackHandler } from "@react-native-community/hooks";
import api from "../src/api/api";
import Token from "../src/interface/token";
import User from "../src/interface/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { colors } from "../src/colors";
import "core-js/stable/atob";

interface Form {
  login: string;
  senha: string;
}

export interface UserSessionJwt extends JwtPayload {
  tipo: string;
  id: number;
}

useBackHandler(() => {
  Alert.alert("Atenção!", "Tem certeza que deseja sair?", [
    {
      text: "Cancelar",
      onPress: () => null,
      style: "cancel",
    },
    {
      text: "NÃO",
      // onPress: () => BackHandler.exitApp(),
      onPress: () => null,
    },
  ]);

  return true;
});

export default function App() {
  const [loginInfo, setLoginInfo] = useState<Form>({ login: "", senha: "" });

  const router = useRouter();

  const getUserRequest = async (postData: Form) => {
    try {
      const { data: tokenResponse } = await api.post<Token>("/login", postData);
      const userId = jwtDecode<UserSessionJwt>(tokenResponse.token).id;

      console.log("antes get")
      const { data: userData } = await api.get(`/usersession/${userId}`, {
        headers: {
          Authorization: `Bearer ${tokenResponse.token}`,
        },
      });
      const data: User = {
        token: tokenResponse.token,
        usuario: userData,
      };

      console.log("antes async")
      const jsonUser = JSON.stringify(data);
      await AsyncStorage.setItem("user", jsonUser);

      router.push("pages/harvesterSelect");
    } catch (error) {
      const toast = Toast.show("Usuario não encontrado", {
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
          placeholder="Matrícula"
          keyboardType="number-pad"
          style={styles.input}
          onChangeText={(text) =>
            setLoginInfo((prevState) => ({ ...prevState, login: text }))
          }
        ></TextInput>
        <TextInput
          placeholder="Senha"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) =>
            setLoginInfo((prevState) => ({ ...prevState, senha: text }))
          }
        ></TextInput>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={() => {
            getUserRequest(loginInfo);
          }}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
