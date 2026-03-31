import { app } from "../server";
import { Categoria_roupaRepository } from "../repositories/Categoria_roupaRepository";

export function Categoria_roupaController(): void {
    const repository = new Categoria_roupaRepository();

    app.get("/categorias-roupa", (_req, res) => {
        try {
            const categorias = repository.listar();
            return res.json(categorias);
        } catch {
            return res.status(500).json({ erro: "Erro ao listar categorias de roupa." });
        }
    });

    app.get("/categorias-roupa/:id", (req, res) => {
        try {
            const categoria = repository.buscarPorId(Number(req.params.id));

            if (!categoria) {
                return res.status(404).json({ erro: "Categoria de roupa não encontrada." });
            }

            return res.json(categoria);
        } catch {
            return res.status(500).json({ erro: "Erro ao buscar categoria de roupa." });
        }
    });

    app.get("/categorias-roupa/nome/:nome", (req, res) => {
        try {
            const categoria = repository.buscarPorNome(req.params.nome);

            if (!categoria) {
                return res.status(404).json({ erro: "Categoria de roupa não encontrada." });
            }

            return res.json(categoria);
        } catch {
            return res.status(500).json({ erro: "Erro ao buscar categoria de roupa por nome." });
        }
    });

    app.post("/categorias-roupa", (req, res) => {
        try {
            const categoria = repository.salvar(req.body);
            return res.status(201).json(categoria);
        } catch {
            return res.status(400).json({ erro: "Erro ao cadastrar categoria de roupa." });
        }
    });

    app.put("/categorias-roupa/:id", (req, res) => {
        try {
            const atualizado = repository.atualizar(Number(req.params.id), req.body);

            if (!atualizado) {
                return res.status(404).json({ erro: "Categoria de roupa não encontrada." });
            }

            return res.json({ mensagem: "Categoria de roupa atualizada com sucesso." });
        } catch {
            return res.status(400).json({ erro: "Erro ao atualizar categoria de roupa." });
        }
    });

    app.delete("/categorias-roupa/:id", (req, res) => {
        try {
            const excluido = repository.excluir(Number(req.params.id));

            if (!excluido) {
                return res.status(404).json({ erro: "Categoria de roupa não encontrada." });
            }

            return res.json({ mensagem: "Categoria de roupa removida com sucesso." });
        } catch {
            return res.status(400).json({ erro: "Erro ao excluir categoria de roupa." });
        }
    });
}
