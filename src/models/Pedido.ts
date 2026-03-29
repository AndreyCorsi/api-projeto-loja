export interface Pedido {
    id?: number;
    data_hora: Date;
    subtotal: number;
    valor_total: number;
    forma_pagto: string;
    status: string;
    id_cliente: number;
}
