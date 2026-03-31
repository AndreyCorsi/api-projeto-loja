import db from "../database/database";
import { Categoria_cliente } from "../models/Categoria_cliente";

export class Categoria_clienteRepository {
    salvar(c: Categoria_cliente): Categoria_cliente {
        const resultado = db
            .prepare("INSERT INTO categoria_cliente (nome, beneficios, preco) VALUES (?, ?, ?)")
            .run(c.nome, c.beneficios, c.preco);

        return {
            id: Number(resultado.lastInsertRowid), nome: c.nome, beneficios: c.beneficios, preco: c.preco
        };
    }

    listar(): Categoria_cliente[] {
        return db.prepare("SELECT * FROM categoria_cliente ORDER BY nome").all() as Categoria_cliente[];
    }

    buscarPorId(id: number): Categoria_cliente | null {
        return (db.prepare("SELECT * FROM categoria_cliente WHERE id = ?").get(id) as Categoria_cliente) ?? null;
    }

    buscarPorNome(nome: string): Categoria_cliente[] {
        return db
            .prepare("SELECT * FROM categoria_cliente WHERE nome LIKE ?")
            .all(`%${nome}%`) as Categoria_cliente[];
    }

    atualizar(id: number, c: Categoria_cliente): boolean {
        const resultado = db
            .prepare("UPDATE categoria_cliente SET nome = ?, beneficios = ?, preco = ? WHERE id = ?")
            .run(c.nome, c.beneficios, c.preco, id);

        return resultado.changes > 0;
    }

    excluir(id: number): boolean {
        const resultado = db
            .prepare("DELETE FROM categoria_cliente WHERE id = ?")
            .run(id);

        return resultado.changes > 0;
    }
}
