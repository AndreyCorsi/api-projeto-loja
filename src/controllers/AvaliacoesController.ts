import { app } from "../server";
import { AvaliacoesRepository } from "../repositories/AvaliacoesRepository";

export function AvaliacoesController(): void {
    const repository = new AvaliacoesRepository();

    app.get("/avaliacoes", (_req, res) => {
        try {
            const avaliacoes = repository.listar();
            return res.json(avaliacoes);
        } catch {
            return res.status(500).json({ erro: "Erro ao listar avaliações." });
        }
    });

    app.get("/avaliacoes/:id", (req, res) => {
        try {
            const avaliacao = repository.buscarPorId(Number(req.params.id));

            if (!avaliacao) {
                return res.status(404).json({ erro: "Avaliação não encontrada." });
            }

            return res.json(avaliacao);
        } catch {
            return res.status(500).json({ erro: "Erro ao buscar avaliação." });
        }
    });

    app.get("/avaliacoes/cliente/:id_cliente", (req, res) => {
        try {
            const avaliacoes = repository.buscarPorCliente(Number(req.params.id_cliente));
            return res.json(avaliacoes);
        } catch {
            return res.status(500).json({ erro: "Erro ao buscar avaliações do cliente." });
        }
    });

    app.get("/avaliacoes/produto/:id_produto", (req, res) => {
        try {
            const avaliacoes = repository.buscarPorProduto(Number(req.params.id_produto));
            return res.json(avaliacoes);
        } catch {
            return res.status(500).json({ erro: "Erro ao buscar avaliações do produto." });
        }
    });

    app.post("/avaliacoes", (req, res) => {
        try {
            const avaliacao = repository.salvar(req.body);
            return res.status(201).json(avaliacao);
        } catch {
            return res.status(400).json({ erro: "Erro ao cadastrar avaliação." });
        }
    });

    app.put("/avaliacoes/:id", (req, res) => {
        try {
            const atualizado = repository.atualizar(Number(req.params.id), req.body);

            if (!atualizado) {
                return res.status(404).json({ erro: "Avaliação não encontrada." });
            }

            return res.json({ mensagem: "Avaliação atualizada com sucesso." });
        } catch {
            return res.status(400).json({ erro: "Erro ao atualizar avaliação." });
        }
    });

    app.delete("/avaliacoes/:id", (req, res) => {
        try {
            const excluido = repository.excluir(Number(req.params.id));

            if (!excluido) {
                return res.status(404).json({ erro: "Avaliação não encontrada." });
            }

            return res.json({ mensagem: "Avaliação removida com sucesso." });
        } catch {
            return res.status(400).json({ erro: "Erro ao excluir avaliação." });
        }
    });
}
