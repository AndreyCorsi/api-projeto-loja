import express from "express";
import { ClienteController } from "./controllers/ClienteController";
import { ProdutoController } from "./controllers/ProdutoController";
import { FornecedorController } from "./controllers/FornecedorController";
import { FaqController } from "./controllers/FaqController";
import { PedidoController } from "./controllers/PedidoController";
import { MovimentoestoqueController } from "./controllers/MovimentoestoqueController";
import { FuncionarioController } from "./controllers/FuncionarioController";




export const app = express();

app.use(express.json());

ClienteController();
ProdutoController();
FornecedorController();
FaqController();
PedidoController();
MovimentoestoqueController();
FuncionarioController();

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
