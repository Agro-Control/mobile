interface Order {
    id: number;
    data_criacao: string;
    data_inicio: string;
    data_previsao_fim: string;
    data_fim: string | null;
    status: string;
    velocidade_minima: number;
    velocidade_maxima: number;
    rpm: number;
    gestor_id: number;
    talhao_id: number;
    unidade_id: number;
    empresa_id: number;
    maquina_id: number;
    nome_maquina: string | null;
}

export default Order;