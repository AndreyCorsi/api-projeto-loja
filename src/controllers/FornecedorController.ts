import { app } from "../server";
import { FornecedorRepository } from "../repositories/FornecedorRepository";

export function FornecedorController(): void {
    const repository = new FornecedorRepository();

    app.get("/fornecedores", (_req, res) => {
        res.json(repository.listar());
    });

    app.get("/fornecedores/:id", (req, res) => {
        const fornecedor = repository.buscarPorId(Number(req.params.id));
        if (!fornecedor) {
            return res.status(404).json({ erro: "Fornecedor não encontrado." });
        }
        return res.json(fornecedor);
    });

    app.post("/fornecedores", (req, res) => {
        try {
            const fornecedor = repository.salvar(req.body);
            return res.status(201).json(fornecedor);
        } catch {
            return res.status(400).json({ erro: "Erro ao cadastrar fornecedor." });
        }
    });

    app.put("/fornecedores/:id", (req, res) => {
        const atualizado = repository.atualizar(Number(req.params.id), req.body);
        if (!atualizado) {
            return res.status(404).json({ erro: "Fornecedor não encontrado." });
        }
        return res.json({ mensagem: "Fornecedor atualizado com sucesso." });
    });

    app.delete("/fornecedores/:id", (req, res) => {
        const excluido = repository.excluir(Number(req.params.id));
        if (!excluido) {
            return res.status(404).json({ erro: "Fornecedor não encontrado." });
        }
        return res.json({ mensagem: "Fornecedor removido com sucesso." });
    });
}
