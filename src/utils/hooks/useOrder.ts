import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Order from "../../interface/order";
import "core-js/stable/atob";

export default function useOrder() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      const jsonOrder = await AsyncStorage.getItem("order");
      setOrder(jsonOrder != null ? JSON.parse(jsonOrder) : null);
    };

    fetchOrderData();
  }, []);

  return { order };
}
