import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBackHandler } from "@react-native-community/hooks";
import { ApiEvents } from "../../src/interface/ApiEvents";
import { handleApiEvent } from "../../src/utils/handleApiEvent";
import Manual from "../../src/components/manual";
import Automatic from "../../src/components/automatic";
import { Event } from "../../src/interface/Event";
import { manualEvents } from "../../src/components/manual";
import { automaticEvents } from "../../src/components/automatic";
const event = () => {
  const [selectedHarvester, setSelectedHarvester] = useState("");
  const [resetTimer, setResetTimer] = useState(false);
  const [start_time, setStart_time] = useState(new Date());
  const [event, setEvent] = useState<Event>();
  const [automaticEvent, setAutomaticEvent] = useState(true);
  const eventRef = useRef<Event>();
  const startedRef = useRef<Date>();

  const handleEvent = (eventName: Event) => {
    if (eventRef.current) {
      const finished_at = new Date();
      const duration =
        startedRef.current &&
        finished_at.getTime() - startedRef.current.getTime();
      const startedTime =
        startedRef.current && startedRef.current.toISOString();
      const oldEvent: ApiEvents = {
        name: eventRef.current.name,
        order_service: 1,
        id_operador: 1,
        id_maquina: 1,
        data_inicio: startedTime ?? start_time.toISOString(),
        data_fim: finished_at.toISOString(),
        duration: duration ? duration : 0,
      };
      console.log(oldEvent);
      // handleApiEvent(oldEvent);
    }
    setStart_time(new Date());
    startedRef.current = new Date();
    setResetTimer(true);
    eventRef.current = eventName;
    setEvent(eventName);
  };

  useBackHandler(() => {
    return true;
  });

  useEffect(() => {
    const getSelectedHarvester = async () => {
      try {
        const response = await AsyncStorage.getItem("selectedHarvester");
        setSelectedHarvester(response || "não selecionada");
      } catch (e) {}
    };

    getSelectedHarvester();
  }, []);

  useEffect(() => {
    const events = [
      { event: automaticEvents[0], isAutomatic: true, timeout: 0 },
      { event: manualEvents[1], isAutomatic: false, timeout: 30000 },
      { event: automaticEvents[1], isAutomatic: true, timeout: 34000 },
      { event: automaticEvents[2], isAutomatic: true, timeout: 38000 },
      { event: manualEvents[4], isAutomatic: false, timeout: 46000 },
      { event: manualEvents[3], isAutomatic: false, timeout: 49000 },
      { event: manualEvents[0], isAutomatic: false, timeout: 54000 },
    ];

    events.forEach(({ event, isAutomatic, timeout }) => {
      setTimeout(() => {
        setAutomaticEvent(isAutomatic);
        handleEvent(event);
      }, timeout);
    });
  }, []);

  return (
    <>
      {automaticEvent ? (
        <Automatic
          automaticEvent={automaticEvent}
          setAutomaticEvent={setAutomaticEvent}
          event={event}
          selectedHarvester={selectedHarvester}
          handleEvent={handleEvent}
          resetTimer={resetTimer}
          setResetTimer={setResetTimer}
        />
      ) : (
        <Manual
          automaticEvent={automaticEvent}
          setAutomaticEvent={setAutomaticEvent}
          event={event}
          selectedHarvester={selectedHarvester}
          handleEvent={handleEvent}
          resetTimer={resetTimer}
          setResetTimer={setResetTimer}
        />
      )}
    </>
  );
};
export default event;
