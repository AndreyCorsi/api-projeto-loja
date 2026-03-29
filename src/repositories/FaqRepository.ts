import db from "../database/database";
import { Faq } from "../models/Faq";

export class FaqRepository {
    salvar(faq: Faq): Faq {
        const resultado = db
            .prepare("INSERT INTO faq (pergunta, ordem, resposta) VALUES (?, ?, ?)")
            .run(faq.pergunta, faq.ordem, faq.resposta);

        return { ...faq, id: Number(resultado.lastInsertRowid) };
    }

    listar(): Faq[] {
        return db.prepare("SELECT * FROM faq ORDER BY ordem ASC").all() as Faq[];
    }

    buscarPorId(id: number): Faq | null {
        return (db.prepare("SELECT * FROM faq WHERE id = ?").get(id) as Faq) ?? null;
    }

    atualizar(id: number, faq: Faq): boolean {
        const resultado = db
            .prepare("UPDATE faq SET pergunta = ?, ordem = ?, resposta = ? WHERE id = ?")
            .run(faq.pergunta, faq.ordem, faq.resposta, id);

        return resultado.changes > 0;
    }

    excluir(id: number): boolean {
        const resultado = db.prepare("DELETE FROM faq WHERE id = ?").run(id);
        return resultado.changes > 0;
    }
}
