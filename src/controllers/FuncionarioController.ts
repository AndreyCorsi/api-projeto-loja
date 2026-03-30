import { app } from "../server";
import { FuncionarioRepository } from "../repositories/FuncionarioReposity";

export function FuncionarioController(): void {
    const repository = new FuncionarioRepository();

    app.get("/funcionarios", (_req, res) => {
        res.json(repository.listar());
    });

    app.get("/funcionarios/:id", (req, res) => {
        const funcionario = repository.buscarPorId(Number(req.params.id));
        if (!funcionario) {
            return res.status(404).json({ erro: "Funcionário não encontrado." });
        }
        return res.json(funcionario);
    });

    app.post("/funcionarios", (req, res) => {
        try {
            const funcionario = repository.salvar(req.body);
            return res.status(201).json(funcionario);
        } catch {
            return res.status(400).json({ erro: "Erro ao cadastrar funcionário." });
        }
    });

    app.put("/funcionarios/:id", (req, res) => {
        const atualizado = repository.atualizar(Number(req.params.id), req.body);
        if (!atualizado) {
            return res.status(404).json({ erro: "Funcionário não encontrado." });
        }
        return res.json({ mensagem: "Funcionário atualizado com sucesso." });
    });

    app.delete("/funcionarios/:id", (req, res) => {
        const excluido = repository.excluir(Number(req.params.id));
        if (!excluido) {
            return res.status(404).json({ erro: "Funcionário não encontrado." });
        }
        return res.json({ mensagem: "Funcionário removido com sucesso." });
    });
}
