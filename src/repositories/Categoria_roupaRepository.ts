import db from "../database/database";
import { Categoria_roupa } from "../models/Categoria_roupa";

export class Categoria_roupaRepository {
    salvar(c: Categoria_roupa): Categoria_roupa {
        const resultado = db
            .prepare('INSERT INTO categoria_roupa (nome, descricao) VALUES (?, ?)')
            .run(c.nome, c.descricao );

        return { id: Number(resultado.lastInsertRowid), nome: c.nome, descricao: c.descricao };
    }

    listar(): Categoria_roupa[] {
        return db.prepare('SELECT * FROM categoria_roupa').all() as Categoria_roupa[];
    }
    buscarPorId(id: number): Categoria_roupa | null {
        return db.prepare('SELECT * FROM categoria_roupa WHERE id = ?').get(id) as Categoria_roupa ?? null;
    }
    buscarPorNome(nome: string): Categoria_roupa | null {
        return (db.prepare("SELECT * FROM categoria_roupa WHERE nome LIKE ?").get(`%${nome}%`) as Categoria_roupa) ?? null;
    }
    atualizar(id: number, c: Categoria_roupa): boolean {
        const resultado = db
            .prepare('UPDATE categoria_roupa SET nome = ?, descricao = ? WHERE id = ?')
            .run(c.nome, c.descricao, id);
        return resultado.changes > 0;
    }
    excluir(id: number): boolean {
        const resultado = db
            .prepare('DELETE FROM categoria_roupa WHERE id = ?')
            .run(id);
        return resultado.changes > 0;
    }
}