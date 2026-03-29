import db from "../database/database";
import { Produto } from "../models/Produto";

export class ProdutoRepository {
    salvar(p: Produto): Produto {
        const resultado = db
            .prepare('INSERT INTO produto (nome, preco, descricao, categoria, tamanho, cor, marca, codigo_barras, estoque, estoque, custo, venda, margem, id_fornecedor, id_categoria_roupa, promocional) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            .run(p.nome, p.preco, p.descricao, p.tamanho, p.cor, p.marca, p.codigo_barras, p.estoque, p.estoque, p.custo, p.venda, p.margem, p.id_fornecedor, p.id_categoria_roupa, p.promocional);

        return { id: Number(resultado.lastInsertRowid), nome: p.nome, preco: p.preco, descricao: p.descricao, tamanho: p.tamanho, cor: p.cor, marca: p.marca, codigo_barras: p.codigo_barras, estoque: p.estoque, custo: p.custo, venda: p.venda, margem: p.margem, id_fornecedor: p.id_fornecedor, id_categoria_roupa: p.id_categoria_roupa, promocional: p.promocional };
    }

    listar(): Produto[] {
        return db.prepare('SELECT * FROM produto').all() as Produto[];
    }

    buscarPorId(id: number): Produto | null {
        return db.prepare('SELECT * FROM produto WHERE id = ?').get(id) as Produto ?? null;
    }

    buscarPorNome(nome: string): Produto | null {
        return (db.prepare("SELECT * FROM produtos WHERE nome LIKE ?").get(`%${nome}%`) as Produto) ?? null;
    }
    buscarPorCategoria(id_categoria_roupa: number): Produto {
        return (db.prepare('SELECT * FROM produto WHERE id_categoriaR = ?').get(id_categoria_roupa) as Produto) ?? null;
    }
    buscarPorCor(cor: string): Produto {
        return (db.prepare('SELECT * FROM produto WHERE cor = ?').get(cor) as Produto) ?? null;
    }
    atualizarEstoque(id: number, quantidade: number): void {
        db.prepare('UPDATE produto SET estoque = estoque + ? WHERE id = ?').run(quantidade, id);
    }
    excluir(id: number): boolean {
        const resultado = db.prepare('DELETE FROM produto WHERE id = ?').run(id);
        return resultado.changes > 0;
    }

    atualizar(id: number, p: Produto): boolean {
        const resultado = db
        .prepare(`
            UPDATE produto 
            SET nome = ?, descricao = ?, tamanho = ?, cor = ?, marca = ?, codigo_barras = ?, estoque = ?, estoque_min = ?, custo = ?, venda = ?, promocional = ?, margem = ?, id_fornecedor = ?, id_categoria_roupa = ?, status = ? 
            WHERE id = ?
            `)
        .run( p.nome, p.descricao, p.tamanho, p.cor, p.marca, p.codigo_barras, p.estoque, p.custo, p.venda, p.promocional ?? null, p.margem, p.id_fornecedor, p.id_categoria_roupa ?? null, p.status ?? "ATIVO",
        );
        return resultado.changes > 0;
    }
}
