import db from "../database/database";
import { Cliente } from "../models/Cliente";

export class ClienteRepository {
    salvar(c: Cliente): Cliente {
        const resultado = db
            .prepare('INSERT INTO cliente (nome, cpf, email, senha, telefone, rua, num, cidade, data_nasc, id_categoria_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            .run(c.nome, c.cpf, c.email, c.senha, c.telefone, c.rua, c.num, c.cidade, c.data_nasc, c.id_categoria_cliente);

        return { id: Number(resultado.lastInsertRowid), nome: c.nome, cpf: c.cpf, email: c.email, senha: c.senha, telefone: c.telefone, rua: c.rua, num: c.num, cidade: c.cidade, data_nasc: c.data_nasc, id_categoria_cliente: c.id_categoria_cliente };
    }

    listar(): Cliente[] {
        return db.prepare('SELECT * FROM cliente').all() as Cliente[];
    }

    buscarPorId(id: number): Cliente | null { 
        return db.prepare('SELECT * FROM cliente WHERE id = ?').get(id) as Cliente ?? null;
    }

    buscarPorNome(nome: string): Cliente | null {
        return (db.prepare("SELECT * FROM cliente WHERE nome LIKE ?").get(`%${nome}%`) as Cliente) ?? null;
    }

     atualizar(id: number, c: Cliente): boolean {
        const resultado = db
            .prepare("UPDATE cliente SET nome = ?, cpf = ?, email = ?, senha = ?, telefone = ?, rua = ?, num = ?, cidade = ?, data_nasc = ?, id_categoria_cliente = ? WHERE id = ?")
            .run(c.nome, c.cpf, c.email, c.senha, c.telefone, c.rua, c.num, c.cidade, c.data_nasc, c.id_categoria_cliente, id);

        return resultado.changes > 0;
    }  
     
      excluir(id: number): boolean {
        const resultado = db.prepare("DELETE FROM cliente WHERE id = ?").run(id);
        return resultado.changes > 0;
    }
}
