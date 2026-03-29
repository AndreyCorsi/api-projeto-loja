import db from "../database/database";
import { Fornecedor } from "../models/Fornecedor";

export class FornecedorRepository {
    salvar(f: Fornecedor): Fornecedor {
        const resultado = db
            .prepare("INSERT INTO fornecedor (nome, cnpj, endereco, telefone, email, cep, categoria, nomefantasia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
            .run(f.nome, f.cnpj, f.endereco, f.telefone, f.email, f.cep, f.categoria, f.nomefantasia);

        return { ...f, id: Number(resultado.lastInsertRowid) };
    }

    listar(): Fornecedor[] {
        return db.prepare("SELECT * FROM fornecedor ORDER BY nome").all() as Fornecedor[];
    }

    buscarPorId(id: number): Fornecedor | null {
        return (db.prepare("SELECT * FROM fornecedor WHERE id = ?").get(id) as Fornecedor) ?? null;
    }

    atualizar(id: number, f: Fornecedor): boolean {
        const resultado = db
            .prepare("UPDATE fornecedor SET nome = ?, cnpj = ?, endereco = ?, telefone = ?, email = ?, cep = ?, categoria = ?, nomefantasia = ? WHERE id = ?")
            .run(f.nome, f.cnpj, f.endereco, f.telefone, f.email, f.cep, f.categoria, f.nomefantasia, id);

        return resultado.changes > 0;
    }

    excluir(id: number): boolean {
        const resultado = db.prepare("DELETE FROM fornecedor WHERE id = ?").run(id);
        return resultado.changes > 0;
    }
}