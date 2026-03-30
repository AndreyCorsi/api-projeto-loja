import { app } from "../server";
import { FaqRepository } from "../repositories/FaqRepository";

export function FaqController(): void {
    const repository = new FaqRepository();

    app.get("/faq", (_req, res) => {
        res.json(repository.listar());
    });

    app.post("/faq", (req, res) => {
        try {
            const faq = repository.salvar(req.body);
            return res.status(201).json(faq);
        } catch {
            return res.status(400).json({ erro: "Erro ao cadastrar FAQ." });
        }
    });

    app.put("/faq/:id", (req, res) => {
        const atualizado = repository.atualizar(Number(req.params.id), req.body);
        if (!atualizado) {
            return res.status(404).json({ erro: "FAQ não encontrado." });
        }
        return res.json({ mensagem: "FAQ atualizado com sucesso." });
    });

    app.delete("/faq/:id", (req, res) => {
        const excluido = repository.excluir(Number(req.params.id));
        if (!excluido) {
            return res.status(404).json({ erro: "FAQ não encontrado." });
        }
        return res.json({ mensagem: "FAQ removido com sucesso." });
    });
}
