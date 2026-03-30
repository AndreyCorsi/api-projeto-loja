import { app } from "../server";
import { PedidoRepository } from "../repositories/PedidoRepository";
import { Pedido } from "../models/Pedido";
import { itens_pedido } from "../models/Itens_pedido";

export function PedidoController(): void {
  const repository = new PedidoRepository();

  app.post("/pedidos", (req, res) => {
    try {
      const { pedido, itens } = req.body as {
        pedido: Pedido;
        itens: itens_pedido[];
      };

      if (!pedido) {
        return res.status(400).json({ erro: "Pedido é obrigatório." });
      }

      if (!itens || !Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ erro: "Itens do pedido são obrigatórios." });
      }

      const resultado = repository.salvar(pedido, itens);
      return res.status(201).json(resultado);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao salvar pedido." });
    }
  });

  app.get("/pedidos", (_req, res) => {
    try {
      const pedidos = repository.listar();
      return res.json(pedidos);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao listar pedidos." });
    }
  });
}
