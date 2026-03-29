import db from "../database/database";
import { Categoria_roupa } from "../models/Categoria_roupa";

export class Categoria_roupaRepository {
    salvar(c: Categoria_roupa): Categoria_roupa {
        const resultado = db
            .prepare('INSERT INTO categoria_roupa (nome) VALUES (?, ?)')
            .run(c.nome );

        return { id: Number(resultado.lastInsertRowid), nome: c.nome };
    }

    listar(): Categoria_roupa[] {
        return db.prepare('SELECT * FROM categoria_roupa').all() as Categoria_roupa[];
    }
}