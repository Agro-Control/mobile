import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiURL = "http://192.168.100.2:5000"; //COLOCAR IP DA SUA MAQUINA AQUI

export const api = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});


api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("user_session");
  if(token) {
    config.headers.Authorization= `Bearer ${token}`;
  }

  return config;
} )

export default api