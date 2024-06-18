export interface ApiEvents {
  id?: number;
  name: string;
  order_service: number;
  id_operador?: number;
  id_maquina?: number;
  data_inicio: string;
  data_fim: string;
  duration: number;
}
