import db from "../database/database";
import { Pedido } from "../models/Pedido";
import { itens_pedido } from "../models/Itens_pedido";

type PedidoRow = {
  id: number;
  data_hora: string;
  subtotal: number;
  valor_total: number;
  forma_pagto: string;
  status: string;
  id_cliente: number;
};

type ItemPedidoRow = {
  id: number;
  id_pedido: number;
  id_produto: number;
  qtd: number;
};

export class PedidoRepository {
  salvar(pedido: Pedido, itens: itens_pedido[]): { pedido: Pedido; itens: itens_pedido[] } {
    const insertPedido = db.prepare(
      "INSERT INTO pedido (data_hora, subtotal, valor_total, forma_pagto, status, id_cliente) VALUES (?, ?, ?, ?, ?, ?)"
    );

    const insertItem = db.prepare(
      "INSERT INTO itens_pedido (id_pedido, id_produto, qtd) VALUES (?, ?, ?)"
    );

    const executar = db.transaction(() => {
      const resultado = insertPedido.run(
        pedido.data_hora,
        pedido.subtotal,
        pedido.valor_total,
        pedido.forma_pagto,
        pedido.status,
        pedido.id_cliente
      );

      const pedidoId = Number(resultado.lastInsertRowid);

      const itensSalvos: itens_pedido[] = itens.map((item) => {
        const res = insertItem.run(pedidoId, item.id_produto, item.qtd);

        return {
          id: Number(res.lastInsertRowid),
          id_pedido: pedidoId,
          id_produto: item.id_produto,
          qtd: item.qtd,
        };
      });

      const pedidoSalvo: Pedido = {
        id: pedidoId,
        data_hora: pedido.data_hora,
        subtotal: pedido.subtotal,
        valor_total: pedido.valor_total,
        forma_pagto: pedido.forma_pagto,
        status: pedido.status,
        id_cliente: pedido.id_cliente,
      };

      return { pedido: pedidoSalvo, itens: itensSalvos };
    });

    return executar();
  }

  listar(): { pedido: Pedido; itens: itens_pedido[] }[] {
    const pedidos = db.prepare("SELECT * FROM pedido").all() as PedidoRow[];
    const buscarItens = db.prepare("SELECT * FROM itens_pedido WHERE id_pedido = ?");

    return pedidos.map((p) => {
      const itensRows = buscarItens.all(p.id) as ItemPedidoRow[];

      const itens: itens_pedido[] = itensRows.map((i) => ({
        id: i.id,
        id_pedido: i.id_pedido,
        id_produto: i.id_produto,
        qtd: i.qtd,
      }));

      const pedido: Pedido = {
        id: p.id,
        data_hora: new Date(p.data_hora),
        subtotal: p.subtotal,
        valor_total: p.valor_total,
        forma_pagto: p.forma_pagto,
        status: p.status,
        id_cliente: p.id_cliente,
      };

      return { pedido, itens };
    });
  }
}
