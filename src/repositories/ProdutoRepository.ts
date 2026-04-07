import db from "../database/database";
import { Produto } from "../models/Produto";

export class ProdutoRepository {
    salvar(p: Produto): Produto {
        const produtoInput = p as Produto & { estoque?: number };
        const qtd = produtoInput.qtd ?? produtoInput.estoque ?? 0;
        const estoqueMin = produtoInput.estoque_min ?? 0;

        const resultado = db
            .prepare('INSERT INTO produto (nome, descricao, tamanho, cor, marca, codigo_barras, qtd, estoque_min, custo, venda, promocional, margem, id_fornecedor, id_categoria_roupa, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            .run(
                produtoInput.nome,
                produtoInput.descricao,
                produtoInput.tamanho,
                produtoInput.cor,
                produtoInput.marca,
                produtoInput.codigo_barras,
                qtd,
                estoqueMin,
                produtoInput.custo,
                produtoInput.venda,
                produtoInput.promocional,
                produtoInput.margem,
                produtoInput.id_fornecedor,
                produtoInput.id_categoria_roupa,
                produtoInput.status ?? "ativo"
            );

        return {
            id: Number(resultado.lastInsertRowid),
            nome: produtoInput.nome,
            descricao: produtoInput.descricao,
            tamanho: produtoInput.tamanho,
            cor: produtoInput.cor,
            marca: produtoInput.marca,
            codigo_barras: produtoInput.codigo_barras,
            qtd,
            estoque_min: estoqueMin,
            custo: produtoInput.custo,
            venda: produtoInput.venda,
            margem: produtoInput.margem,
            promocional: produtoInput.promocional,
            id_fornecedor: produtoInput.id_fornecedor,
            id_categoria_roupa: produtoInput.id_categoria_roupa,
            status: produtoInput.status ?? "ativo"
        };
    }

    listar(): Produto[] {
        return db.prepare('SELECT * FROM produto').all() as Produto[];
    }

    buscarPorId(id: number): Produto | null {
        return db.prepare('SELECT * FROM produto WHERE id = ?').get(id) as Produto ?? null;
    }

    buscarPorNome(nome: string): Produto | null {
        return (db.prepare("SELECT * FROM produto WHERE nome LIKE ?").get(`%${nome}%`) as Produto) ?? null;
    }
    buscarPorCategoria(id_categoria_roupa: number): Produto {
        return (db.prepare('SELECT * FROM produto WHERE id_categoria_roupa = ?').get(id_categoria_roupa) as Produto) ?? null;
    }
    buscarPorCor(cor: string): Produto {
        return (db.prepare('SELECT * FROM produto WHERE cor = ?').get(cor) as Produto) ?? null;
    }
    atualizarEstoque(id: number, quantidade: number): void {
        db.prepare('UPDATE produto SET qtd = qtd + ? WHERE id = ?').run(quantidade, id);
    }
    excluir(id: number): boolean {
        const resultado = db.prepare('DELETE FROM produto WHERE id = ?').run(id);
        return resultado.changes > 0;
    }

    atualizar(id: number, p: Produto): boolean {
        const produtoInput = p as Produto & { estoque?: number };
        const qtd = produtoInput.qtd ?? produtoInput.estoque ?? 0;
        const estoqueMin = produtoInput.estoque_min ?? 0;

        const resultado = db
        .prepare(`
            UPDATE produto 
            SET nome = ?, descricao = ?, tamanho = ?, cor = ?, marca = ?, codigo_barras = ?, qtd = ?, estoque_min = ?, custo = ?, venda = ?, promocional = ?, margem = ?, id_fornecedor = ?, id_categoria_roupa = ?, status = ? 
            WHERE id = ?
            `)
        .run(
            produtoInput.nome,
            produtoInput.descricao,
            produtoInput.tamanho,
            produtoInput.cor,
            produtoInput.marca,
            produtoInput.codigo_barras,
            qtd,
            estoqueMin,
            produtoInput.custo,
            produtoInput.venda,
            produtoInput.promocional ?? null,
            produtoInput.margem,
            produtoInput.id_fornecedor,
            produtoInput.id_categoria_roupa ?? null,
            produtoInput.status ?? "ativo",
            id
        );
        return resultado.changes > 0;
    }
}
