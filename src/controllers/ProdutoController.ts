import { app } from "../server";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export function ProdutoController(): void {
    const repository = new ProdutoRepository();

    app.get("/produtos", (_req, res) => {
        res.json(repository.listar());
    });

    app.get("/produtos/:id", (req, res) => {
        const produto = repository.buscarPorId(Number(req.params.id));
        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }
        return res.json(produto);
    });

    app.post("/produtos", (req, res) => {
        try {
            const produto = repository.salvar(req.body);
            return res.status(201).json(produto);
        } catch {
            return res.status(400).json({ erro: "Erro ao cadastrar produto." });
        }
    });

    app.put("/produtos/:id", (req, res) => {
        const atualizado = repository.atualizar(Number(req.params.id), req.body);
        if (!atualizado) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }
        return res.json({ mensagem: "Produto atualizado com sucesso." });
    });

    app.delete("/produtos/:id", (req, res) => {
        const excluido = repository.excluir(Number(req.params.id));
        if (!excluido) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }
        return res.json({ mensagem: "Produto removido com sucesso." });
    });
}
