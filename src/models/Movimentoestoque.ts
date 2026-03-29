export interface Movimentoestoque {
    id?: number;
    tipo_movimentacao: string;
    qtd: number;
    data_hora: Date;
    id_produto: number;
    id_funcionario: number;
    id_pedido: number;
    id_estoque: number;
}