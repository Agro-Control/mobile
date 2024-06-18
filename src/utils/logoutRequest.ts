import AsyncStorage from "@react-native-async-storage/async-storage";

import { useRouter } from "expo-router";

const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};

export const logoutRequest = () => {
  const router = useRouter();
  clearAsyncStorage();
  router.push("/");
};
