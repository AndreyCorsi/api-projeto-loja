import db from "../database/database";
import { Funcionario } from "../models/Funcionario";

export class FuncionarioRepository {
    salvar(f: Funcionario): Funcionario {
        const resultado = db
            .prepare("INSERT INTO funcionario (nome, cargo, nivel_permissao, cpf, email, data_contratacao, telefone) VALUES (?, ?, ?, ?, ?, ?, ?)")
            .run(f.nome, f.cargo, f.nivel_permissao, f.cpf, f.email, f.data_contratacao, f.telefone);

        return { ...f, id: Number(resultado.lastInsertRowid) };
    }

    listar(): Funcionario[] {
        return db.prepare("SELECT * FROM funcionario ORDER BY nome").all() as Funcionario[];
    }

    buscarPorId(id: number): Funcionario | null {
        return (db.prepare("SELECT * FROM funcionario WHERE id = ?").get(id) as Funcionario) ?? null;
    }

    atualizar(id: number, f: Funcionario): boolean {
        const resultado = db
            .prepare("UPDATE funcionario SET nome = ?, cargo = ?, nivel_permissao = ?, cpf = ?, email = ?, data_contratacao = ?, telefone = ? WHERE id = ?")
            .run(f.nome, f.cargo, f.nivel_permissao, f.cpf, f.email, f.data_contratacao, f.telefone, id);

        return resultado.changes > 0;
    }

    excluir(id: number): boolean {
        const resultado = db.prepare("DELETE FROM funcionario WHERE id = ?").run(id);
        return resultado.changes > 0;
    }
}