import { app } from "../server";
import { Categoria_clienteRepository } from "../repositories/Categoria_clienteRepository";

export function Categoria_clienteController(): void {
    const repository = new Categoria_clienteRepository();

    app.get("/categorias-cliente", (_req, res) => {
        try {
            const categorias = repository.listar();
            return res.json(categorias);
        } catch {
            return res.status(500).json({ erro: "Erro ao listar categorias de cliente." });
        }
    });

    app.get("/categorias-cliente/:id", (req, res) => {
        try {
            const categoria = repository.buscarPorId(Number(req.params.id));

            if (!categoria) {
                return res.status(404).json({ erro: "Categoria de cliente não encontrada." });
            }

            return res.json(categoria);
        } catch {
            return res.status(500).json({ erro: "Erro ao buscar categoria de cliente." });
        }
    });

    app.post("/categorias-cliente", (req, res) => {
        try {
            const categoria = repository.salvar(req.body);
            return res.status(201).json(categoria);
        } catch {
            return res.status(400).json({ erro: "Erro ao cadastrar categoria de cliente." });
        }
    });

    app.put("/categorias-cliente/:id", (req, res) => {
        try {
            const atualizado = repository.atualizar(Number(req.params.id), req.body);

            if (!atualizado) {
                return res.status(404).json({ erro: "Categoria de cliente não encontrada." });
            }

            return res.json({ mensagem: "Categoria de cliente atualizada com sucesso." });
        } catch {
            return res.status(400).json({ erro: "Erro ao atualizar categoria de cliente." });
        }
    });

    app.delete("/categorias-cliente/:id", (req, res) => {
        try {
            const excluido = repository.excluir(Number(req.params.id));

            if (!excluido) {
                return res.status(404).json({ erro: "Categoria de cliente não encontrada." });
            }

            return res.json({ mensagem: "Categoria de cliente removida com sucesso." });
        } catch {
            return res.status(400).json({ erro: "Erro ao excluir categoria de cliente." });
        }
    });
}
