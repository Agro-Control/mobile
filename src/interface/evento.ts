import { events } from "./events";

interface Event {
  nome: events;
  data_inicio: string;
  data_fim?: string;
  duracao?: number;
  ocioso?: number;
  ordem_servico_id: number;
  maquina_id: number;
  operador_id: number;
  empresa_id: number;
  grupo_id: number;
}

export default Event;
