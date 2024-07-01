import AsyncStorage from "@react-native-async-storage/async-storage";
import Manual, { eventsArray } from "../../src/components/manual";
import { handleApiEvent } from "../../src/utils/handleApiEvent";
import { useBackHandler } from "@react-native-community/hooks";
import { SimulatorEvent } from "../../src/interface/Event";
import React, { useEffect, useState, useRef } from "react";
import Automatic from "../../src/components/automatic";
import useOrder from "../../src/utils/hooks/useOrder";
import { events } from "../../src/interface/events";
import useUser from "../../src/utils/hooks/useUser";
import Event from "../../src/interface/evento";

const event = () => {
  const { user } = useUser();
  const { order } = useOrder();
  const orderId = order?.id;
  const minimum = order?.velocidade_minima;
  const maximum = order?.velocidade_maxima;
  const rpm = order?.rpm;

  const [selectedHarvester, setSelectedHarvester] = useState("");
  const [resetTimer, setResetTimer] = useState(false);
  const [start_time, setStart_time] = useState(new Date());
  const [event, setEvent] = useState<string>("Ocioso");
  const [automaticEvent, setAutomaticEvent] = useState(false);

  useBackHandler(() => {
    return true;
  });


  useEffect(() => {
    const simulateEvent = async () => {
      const operador_id = user?.usuario.id;
      const empresa_id = user?.usuario.empresa_id;
      const grupo_id = user?.usuario.grupo_id;
      const maquina_id = order?.maquina_id;
      const order_id = order?.id;

      const randomIndex = Math.floor(Math.random() * eventsArray.length);
      const event = eventsArray[randomIndex];
      setEvent(event.name);
      const isAutomatic = event.isAutomatic;
      const timeout =
        event.minDuration +
        Math.floor(Math.random() * (event.maxDuration - event.minDuration + 1));
      const formattedEvent: Event = {
        nome: event.value,
        data_inicio: new Date().toISOString(),
        ordem_servico_id: order_id!,
        maquina_id: maquina_id!,
        operador_id: operador_id!,
        empresa_id: empresa_id!,
        grupo_id: grupo_id!,
      };
      console.log(formattedEvent);
      setAutomaticEvent(isAutomatic);

      setTimeout(() => {
        // handleEvent(event);
        simulateEvent(); // Call simulateEvent again to continue the simulation
      }, timeout);
    };

    setTimeout(() => {
      simulateEvent();
    }, 2000);
  }, []);

  return (
    <>
      {automaticEvent ? (
        <Automatic
          orderId={orderId!}
          event={event}
          resetTimer={resetTimer}
          setResetTimer={setResetTimer}
        />
      ) : (
        <Manual
          orderId={orderId!}
          event={event}
          handleEvent={() => {}}
          resetTimer={resetTimer}
          setResetTimer={setResetTimer}
        />
      )}
    </>
  );
};
export default event;
