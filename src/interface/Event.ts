import { colors } from "../../src/colors";
import { events } from "./events";


export interface SimulatorEvent {
  id: number;
  name: string;
  value: events;
  isAutomatic: boolean;
  maxDuration: number;
  minDuration: number;
  rpm: number;
  maxSpeed: number;
  minSpeed: number;
}
