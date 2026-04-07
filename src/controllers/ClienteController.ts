import { app } from "../server";
import { ClienteRepository } from "../repositories/ClienteRepository";

export function ClienteController(): void {
    const repository = new ClienteRepository();

    app.get("/clientes", (_req, res) => {
        res.json(repository.listar());
    });

    app.get("/clientes/:id", (req, res) => {
        const cliente = repository.buscarPorId(Number(req.params.id));
        if (!cliente) {
            return res.status(404).json({ erro: "Cliente não encontrado." });
        }
        return res.json(cliente);
    });

    app.post("/clientes", (req, res) => {
        try {
            const cliente = repository.salvar(req.body);
            return res.status(201).json(cliente);
        } catch (error) {
            return res.status(400).json({
                erro: error instanceof Error ? error.message : "Erro ao cadastrar cliente."
            });
        }
    });

    app.put("/clientes/:id", (req, res) => {
        const atualizado = repository.atualizar(Number(req.params.id), req.body);
        if (!atualizado) {
            return res.status(404).json({ erro: "Cliente não encontrado." });
        }
        return res.json({ mensagem: "Cliente atualizado com sucesso." });
    });

    app.delete("/clientes/:id", (req, res) => {
        const excluido = repository.excluir(Number(req.params.id));
        if (!excluido) {
            return res.status(404).json({ erro: "Cliente não encontrado." });
        }
        return res.json({ mensagem: "Cliente removido com sucesso." });
    });
}
