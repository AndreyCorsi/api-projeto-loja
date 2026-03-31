import db from "../database/database";
import { Avaliacoes } from "../models/Avaliacoes";

export class AvaliacoesRepository {
    salvar(a: Avaliacoes): Avaliacoes {
        const resultado = db
            .prepare("INSERT INTO avaliacoes (comentario, nota, id_cliente, id_produto) VALUES (?, ?, ?, ?)")
            .run(a.comentario, a.nota, a.id_cliente, a.id_produto);

        return {
            id: Number(resultado.lastInsertRowid), comentario: a.comentario, nota: a.nota, id_cliente: a.id_cliente, id_produto: a.id_produto
        };
    }

    listar(): Avaliacoes[] {
        return db.prepare("SELECT * FROM avaliacoes").all() as Avaliacoes[];
    }

    buscarPorId(id: number): Avaliacoes | null {
        return (db.prepare("SELECT * FROM avaliacoes WHERE id = ?").get(id) as Avaliacoes) ?? null;
    }

    buscarPorCliente(id_cliente: number): Avaliacoes[] {
        return db
            .prepare("SELECT * FROM avaliacoes WHERE id_cliente = ?")
            .all(id_cliente) as Avaliacoes[];
    }

    buscarPorProduto(id_produto: number): Avaliacoes[] {
        return db
            .prepare("SELECT * FROM avaliacoes WHERE id_produto = ?")
            .all(id_produto) as Avaliacoes[];
    }

    atualizar(id: number, a: Avaliacoes): boolean {
        const resultado = db
            .prepare("UPDATE avaliacoes SET comentario = ?, nota = ?, id_cliente = ?, id_produto = ? WHERE id = ?")
            .run(a.comentario, a.nota, a.id_cliente, a.id_produto, id);

        return resultado.changes > 0;
    }

    excluir(id: number): boolean {
        const resultado = db
            .prepare("DELETE FROM avaliacoes WHERE id = ?")
            .run(id);

        return resultado.changes > 0;
    }
}
