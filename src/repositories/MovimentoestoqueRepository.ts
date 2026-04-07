import db from "../database/database";
import { Movimentoestoque } from "../models/Movimentoestoque";
import { ProdutoRepository } from "./ProdutoRepository";

export class MovimentoestoqueRepository {
    salvar(m: Movimentoestoque): Movimentoestoque {
        const resultado = db
            .prepare("INSERT INTO movimento_estoque (tipo_movimentacao, qtd, data_hora, id_produto, id_funcionario, id_pedido) VALUES (?, ?, ?, ?, ?, ?)")
            .run(
                m.tipo_movimentacao,
                m.qtd,
                m.data_hora,
                m.id_produto,
                m.id_funcionario ?? null,
                m.id_pedido ?? null
            );

        return { ...m, id: Number(resultado.lastInsertRowid) };
    }

    listar(): Movimentoestoque[] {
        return db.prepare("SELECT * FROM movimento_estoque ORDER BY data_hora DESC").all() as Movimentoestoque[];
    }

    buscarPorId(id: number): Movimentoestoque | null {
        return (db.prepare("SELECT * FROM movimento_estoque WHERE id = ?").get(id) as Movimentoestoque) ?? null;
    }

    buscarPorProduto(id_produto: number): Movimentoestoque[] {
        return db.prepare("SELECT * FROM movimento_estoque WHERE id_produto = ? ORDER BY data_hora DESC").all(id_produto) as Movimentoestoque[];
    }

    entradaEstoque(movimento: Movimentoestoque): Movimentoestoque {
        if (movimento.qtd <= 0) {
            throw new Error("Quantidade deve ser maior que zero.");
        }

        const produtoRepository = new ProdutoRepository();
        const produto = produtoRepository.buscarPorId(movimento.id_produto);

        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        produtoRepository.atualizarEstoque(movimento.id_produto, movimento.qtd);

        return this.salvar({
            ...movimento,
            tipo_movimentacao: "ENTRADA",
            data_hora: new Date()
        });
    }

    saidaEstoque(movimento: Movimentoestoque): Movimentoestoque {
        if (movimento.qtd <= 0) {
            throw new Error("Quantidade deve ser maior que zero.");
        }

        const produtoRepository = new ProdutoRepository();
        const produto = produtoRepository.buscarPorId(movimento.id_produto);

        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        if (produto.qtd < movimento.qtd) {
            throw new Error("Estoque insuficiente.");
        }

        produtoRepository.atualizarEstoque(movimento.id_produto, -movimento.qtd);

        return this.salvar({
            ...movimento,
            tipo_movimentacao: "SAIDA",
            data_hora: new Date()
        });
    }
}
