import express from "express";
import { ClienteController } from "./controllers/ClienteController";
import { ProdutoController } from "./controllers/ProdutoController";
import { PedidoController } from "./controllers/PedidoController";


export const app = express();

app.use(express.json());

ClienteController();
ProdutoController();
PedidoController();

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
