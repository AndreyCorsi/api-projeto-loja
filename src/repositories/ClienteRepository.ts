import db from "../database/database";
import { Cliente } from "../models/Cliente";

export class ClienteRepository {
    salvar(c: Cliente): Cliente {
        const resultado = db
            .prepare('INSERT INTO cliente (nome, id_categoria, cpf, email, senha, telefone, endereco, data_nasc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
            .run(c.nome, c.id_categoria, c.cpf, c.email, c.senha, c.telefone, c.endereco, c.data_nasc);

        return { id: Number(resultado.lastInsertRowid), nome: c.nome, id_categoria: c.id_categoria, cpf: c.cpf, email: c.email, senha: c.senha, telefone: c.telefone, endereco: c.endereco, data_nasc: c.data_nasc };
    }

    listar(): Cliente[] {
        return db.prepare('SELECT * FROM cliente').all() as Cliente[];
    }

    buscarPorId(id: number): Cliente | null { 
        return db.prepare('SELECT * FROM cliente WHERE id = ?').get(id) as Cliente ?? null;
    }

    buscarPorNome(nome: string): Cliente | null {
        return (db.prepare("SELECT * FROM clientes WHERE nome LIKE ?").get(`%${nome}%`) as Cliente) ?? null;
    }

     atualizar(id: number, c: Cliente): boolean {
        const resultado = db
            .prepare("UPDATE cliente SET nome = ?, cpf = ?, email = ?, senha = ?, telefone = ?, endereco = ?, data_nasc = ?, id_categoria = ? WHERE id = ?")
            .run(c.nome, c.cpf, c.email, c.senha, c.telefone, c.endereco, c.data_nasc, c.id_categoria ?? null, id);

        return resultado.changes > 0;
    }  
     
      excluir(id: number): boolean {
        const resultado = db.prepare("DELETE FROM cliente WHERE id = ?").run(id);
        return resultado.changes > 0;
    }
}
