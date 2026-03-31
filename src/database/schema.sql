CREATE TABLE IF NOT EXISTS produto (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(100) NOT NULL CHECK(length(nome) >= 3),
  descricao VARCHAR(100) NOT NULL CHECK(length(descricao) >= 5),
  tamanho VARCHAR(50) NOT NULL,
  cor VARCHAR(50) NOT NULL,
  marca VARCHAR(50) NOT NULL CHECK(length(marca) >= 2),
  codigo_barras VARCHAR(50) NOT NULL CHECK(length(codigo_barras) >= 8),
  qtd INT NOT NULL CHECK(qtd >= 0),
  estoque_min INT NOT NULL CHECK(estoque_min >= 0),
  custo DECIMAL(10,2) NOT NULL CHECK(custo >= 0),
  venda DECIMAL(10,2) NOT NULL CHECK(venda >= custo),
  promocional DECIMAL(10,2) NOT NULL CHECK(promocional >= 0),
  margem DECIMAL(10,2) NOT NULL CHECK(margem >= 0),
  id_fornecedor INT,
  id_categoria_roupa INT,
  status VARCHAR(50) NOT NULL CHECK(status IN ('ativo','inativo')),
  FOREIGN KEY (id_categoria_roupa) REFERENCES categoria_roupa(id),
  FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id)
);

CREATE TABLE IF NOT EXISTS cliente (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(50) NOT NULL CHECK(length(nome) > 3),
  cpf VARCHAR(11) UNIQUE NOT NULL CHECK(length(cpf) = 11),
  email VARCHAR(50) UNIQUE NOT NULL CHECK(instr(email, '@') > 1),
  senha VARCHAR(25) NOT NULL CHECK(length(senha) >= 4),
  telefone VARCHAR(11) NOT NULL CHECK(length(telefone) >= 10),
  rua VARCHAR(100) NOT NULL,
  num INT NOT NULL CHECK(num > 0),
  cidade VARCHAR(20) NOT NULL,
  data_nasc VARCHAR(50) NOT NULL,
  id_categoria_cliente INT NOT NULL,
  FOREIGN KEY (id_categoria_cliente) REFERENCES categoria_cliente(id)
);

CREATE TABLE IF NOT EXISTS categoria_roupa(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(100) NOT NULL CHECK(length(nome) > 3),
  descricao VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS categoria_cliente (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(50) NOT NULL CHECK(length(nome) >= 3),
  beneficios VARCHAR(100) NOT NULL,
  preco DECIMAL(10,2) NOT NULL CHECK(preco >= 0),
  id_cliente INT,
  FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE IF NOT EXISTS fornecedor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(50) NOT NULL CHECK(length(nome) > 3),
  cnpj VARCHAR(50) NOT NULL CHECK(length(cnpj) >= 14),
  endereco VARCHAR(100) NOT NULL,
  telefone VARCHAR(11) NOT NULL CHECK(length(telefone) >= 10),
  email VARCHAR(50) NOT NULL CHECK(instr(email, '@') > 1),
  cep VARCHAR(8) NOT NULL CHECK(length(cep) = 8),
  categoria VARCHAR(20) NOT NULL,
  nomefantasia VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS pedido (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  data_hora DATETIME NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL CHECK(subtotal >= 0),
  valor_total DECIMAL(10,2) NOT NULL CHECK(valor_total >= subtotal),
  forma_pagto VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK(status IN ('pendente','pago','cancelado')),
  id_cliente INT,
  FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE IF NOT EXISTS itens_pedido (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_pedido INT,
  id_produto INT,
  qtd INT NOT NULL CHECK(qtd > 0),
  FOREIGN KEY (id_produto) REFERENCES produto(id),
  FOREIGN KEY (id_pedido) REFERENCES pedido(id)
);

CREATE TABLE IF NOT EXISTS funcionario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(50) NOT NULL CHECK(length(nome) > 3),
  cargo VARCHAR(50) NOT NULL,
  nivel_permissao VARCHAR(50) NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL CHECK(length(cpf) = 11),
  email VARCHAR(30) UNIQUE NOT NULL CHECK(instr(email, '@') > 1),
  data_contratacao DATETIME NOT NULL,
  telefone VARCHAR(11) NOT NULL CHECK(length(telefone) >= 10)
);

CREATE TABLE IF NOT EXISTS movimento_estoque (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo_movimentacao VARCHAR(50) NOT NULL CHECK(tipo_movimentacao IN ('entrada','saida')),
  qtd INT NOT NULL CHECK(qtd > 0),
  data_hora DATETIME NOT NULL,
  id_produto INT,
  id_funcionario INT,
  id_pedido INT,
  FOREIGN KEY (id_funcionario) REFERENCES funcionario(id),
  FOREIGN KEY (id_produto) REFERENCES produto(id),
  FOREIGN KEY (id_pedido) REFERENCES pedido(id)
);

CREATE TABLE IF NOT EXISTS avaliacoes(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comentario VARCHAR(250) NOT NULL CHECK(length(comentario) >= 3),
  nota DECIMAL(2,1) NOT NULL CHECK(nota >= 0 AND nota <= 5),
  id_cliente INT,
  id_produto INT,
  FOREIGN KEY (id_cliente) REFERENCES cliente(id),
  FOREIGN KEY (id_produto) REFERENCES produto(id)
);

CREATE TABLE IF NOT EXISTS estoque(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  data_entrada DATETIME NOT NULL,
  status_produto VARCHAR(50) NOT NULL CHECK(status_produto IN ('novo','usado','defeito')),
  qtd_produto INT NOT NULL CHECK(qtd_produto >= 0),
  id_produto INT,
  FOREIGN KEY (id_produto) REFERENCES produto(id)
);

CREATE TABLE IF NOT EXISTS faq(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pergunta VARCHAR(250) NOT NULL CHECK(length(pergunta) >= 5),
  ordem INT NOT NULL CHECK(ordem >= 0),
  resposta VARCHAR(250) NOT NULL CHECK(length(resposta) >= 5)
);