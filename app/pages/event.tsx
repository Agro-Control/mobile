import AsyncStorage from "@react-native-async-storage/async-storage";
import Manual, { eventsArray } from "../../src/components/manual";
import { useBackHandler } from "@react-native-community/hooks";
import React, { useEffect, useState, useRef } from "react";
import useOrder from "../../src/utils/hooks/useOrder";
import Event from "../../src/interface/evento";
import Toast from "react-native-root-toast";
import { colors } from "../../src/colors";
import { SimulatorEvent } from "../../src/interface/Event";
import api from "../../src/api/api";

interface PostEvent {
  id: string;
}

const event = () => {
  const { order } = useOrder();
  const orderId = order?.id;
  const eventWeights = [5, 5, 5, 5, 5, 6, 6, 7, 7, 7, 8, 8, 9, 9, 9];

  const [resetTimer, setResetTimer] = useState(false);
  const [event, setEvent] = useState<string>("Ocioso");
  const [automaticEvent, setAutomaticEvent] = useState(false);
  const manualEventId = useRef<Event>();
  const stopSimulateRef = useRef(true);


  useBackHandler(() => {
    return true;
  });

  const manualHandleEvent = async (newManualEvent: SimulatorEvent) => {
    if (manualEventId.current) {
      const dataInicio = new Date(manualEventId.current.data_inicio);
      const dataFim = new Date(new Date().getTime() - (3 * 60 * 60 * 1000));

      const putEvent = {
        id: manualEventId.current.id,
        nome: manualEventId.current.nome,
        data_inicio: manualEventId.current.data_inicio,
        data_fim: new Date(new Date().getTime() - (3 * 60 * 60 * 1000)).toISOString(),
        duracao: Math.floor((dataFim.getTime() - dataInicio.getTime()) / 1000),
        ordem_servico_id: manualEventId.current.ordem_servico_id,
        maquina_id: manualEventId.current.maquina_id,
        operador_id: manualEventId.current.operador_id,
        empresa_id: manualEventId.current.empresa_id,
        grupo_id: manualEventId.current.grupo_id,
      };

      await api.put(`/eventos`, putEvent);
    }

    stopSimulateRef.current = true;
    setEvent(newManualEvent.name);
    setResetTimer(true);
    setAutomaticEvent(false);
    const jsonOrder = await AsyncStorage.getItem("order");

    const jsonUser = await AsyncStorage.getItem("user");

    const orderData = jsonOrder != null && JSON.parse(jsonOrder);

    const userData = jsonUser != null && JSON.parse(jsonUser);

    const operador_id = userData.usuario.id;
    const empresa_id = userData.usuario.empresa_id;
    const grupo_id = userData.usuario.grupo_id;
    const operador_nome = userData.usuario.nome;

    const maquina_id = orderData.maquina_id;
    const order_id = orderData.id;

    const formattedEvent: Event = {
      nome: newManualEvent.value,
      data_inicio: new Date(new Date().getTime() - (3 * 60 * 60 * 1000)).toISOString(),
      data_fim:
        newManualEvent.value === "fim_ordem" ||
        newManualEvent.value === "troca_turno"
          ? new Date(new Date().getTime() - (3 * 60 * 60 * 1000)).toISOString()
          : null,
      ordem_servico_id: order_id,
      operador_nome: operador_nome,
      maquina_id: maquina_id,
      operador_id: operador_id,
      empresa_id: empresa_id,
      grupo_id: grupo_id,
    };

    const { data } = await api.post<PostEvent>("/eventos", formattedEvent);

    manualEventId.current = {
      ...formattedEvent,
      id: data.id,
    };

    if(newManualEvent.value === "fim_ordem" || newManualEvent.value === "troca_turno") {
      const jsonTrack = await AsyncStorage.getItem("track");
      const trackId = jsonTrack != null && JSON.parse(jsonTrack);
      await api.delete(`/ordem/alocar_operador_maquina?id=${trackId}`)
    }

  };

  const handleStartSimulator = () => {
    stopSimulateRef.current = false;
    simulateEvent();
  }


  const simulateEvent = async () => {
    if (stopSimulateRef.current) return;

    if (manualEventId.current) {
      const dataInicio = new Date(manualEventId.current.data_inicio);
      const dataFim = new Date(new Date().getTime() - (3 * 60 * 60 * 1000));

      const putEvent = {
        id: manualEventId.current.id,
        nome: manualEventId.current.nome,
        data_inicio: manualEventId.current.data_inicio,
        data_fim:  new Date(new Date().getTime() - (3 * 60 * 60 * 1000)).toISOString(),
        duracao: Math.floor((dataFim.getTime() - dataInicio.getTime()) / 1000),
        ordem_servico_id: manualEventId.current.ordem_servico_id,
        maquina_id: manualEventId.current.maquina_id,
        operador_id: manualEventId.current.operador_id,
        empresa_id: manualEventId.current.empresa_id,
        grupo_id: manualEventId.current.grupo_id,
      };

      await api.put(`/eventos`, putEvent);
    }

    const jsonOrder = await AsyncStorage.getItem("order");

    const jsonUser = await AsyncStorage.getItem("user");

    const orderData = jsonOrder != null && JSON.parse(jsonOrder);

    const userData = jsonUser != null && JSON.parse(jsonUser);

    const maximum = orderData.velocidade_maxima;
    const rpm = orderData.rpm;
    const operador_id = userData.usuario.id;
    const empresa_id = userData.usuario.empresa_id;
    const grupo_id = userData.usuario.grupo_id;
    const operador_nome = userData.usuario.nome;

    const maquina_id = orderData.maquina_id;
    const order_id = orderData.id;

    const randomIndex =
      eventWeights[Math.floor(Math.random() * eventWeights.length)];

    const event = eventsArray[randomIndex];

    setEvent(event.name);
    const randomSpeed = Math.floor(
      Math.random() * (event.maxSpeed - event.minSpeed + 1) + event.minSpeed
    );

    if (randomSpeed > maximum) {
      const errorMessage = `Você está acima da velocidade descrita na ordem de serviço Velocidades: Atual: ${randomSpeed}km/h - Permitida: ${maximum}km/h `;
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
      }, 12000);
    }
    if (event.rpm > rpm) {
      const errorMessage = `O RPM está acima do descrito na ordem de serviço Motor: Atual: ${event.rpm}rpm - Permitida: ${rpm}rpm `;
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
      }, 12000);
    }

    const isAutomatic = event.isAutomatic;
    const timeout =
      event.minDuration +
      Math.floor(Math.random() * (event.maxDuration - event.minDuration + 1));

    const formattedEvent: Event = {
      nome: event.value,
      data_inicio: new Date(new Date().getTime() - (3 * 60 * 60 * 1000)).toISOString(),
      ordem_servico_id: order_id,
      maquina_id: maquina_id,
      operador_id: operador_id,
      operador_nome: operador_nome,
      empresa_id: empresa_id,
      grupo_id: grupo_id,
    };

    const { data } = await api.post<PostEvent>("/eventos", formattedEvent);

    manualEventId.current = {
      ...formattedEvent,
      id: data.id,
    };

    setResetTimer(true);

    setAutomaticEvent(isAutomatic);

    setTimeout(() => {
      if (stopSimulateRef.current) return;
      simulateEvent();
    }, timeout);
  };

  // useEffect(() => {
  //   if (stopSimulateRef.current === false) return;
  //   simulateEvent();
  // }, []);

  return (
    <Manual
      isAutomaticEvent={automaticEvent}
      orderId={orderId!}
      event={event}
      handleEvent={manualHandleEvent}
      resetTimer={resetTimer}
      setResetTimer={setResetTimer}
      handleStartSimulator={handleStartSimulator}
    />
  );
};
export default event;
