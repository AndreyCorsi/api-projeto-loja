import { app } from "../server";
import { MovimentoestoqueRepository } from "../repositories/MovimentoestoqueRepository";

export function MovimentoestoqueController(): void {
    const repository = new MovimentoestoqueRepository();

    app.get("/movimentacoes", (_req, res) => {
        res.json(repository.listar());
    });

    app.get("/movimentacoes/produto/:id_produto", (req, res) => {
        res.json(repository.buscarPorProduto(Number(req.params.id_produto)));
    });

    app.post("/estoque/entrada", (req, res) => {
        try {
            const movimento = repository.entradaEstoque(req.body);
            return res.status(201).json(movimento);
        } catch (error) {
            return res.status(400).json({
                erro: error instanceof Error ? error.message : "Erro ao registrar entrada."
            });
        }
    });

    app.post("/estoque/saida", (req, res) => {
        try {
            const movimento = repository.saidaEstoque(req.body);
            return res.status(201).json(movimento);
        } catch (error) {
            return res.status(400).json({
                erro: error instanceof Error ? error.message : "Erro ao registrar saída."
            });
        }
    });
}
