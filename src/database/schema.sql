CREATE TABLE IF NOT EXISTS produto (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR (100) NOT NULL,
  tamanho VARCHAR (50) NOT NULL,
  cor VARCHAR (50) NOT NULL,
  marca VARCHAR (50) NOT NULL,
  codigo_barras VARCHAR (50) NOT NULL,
  qtd INT NOT NULL,
  estoque_min INT NOT NULL,
  custo DECIMAL(10, 2) NOT NULL,
  venda DECIMAL (10, 2) NOT NULL,
  promocional DECIMAL (10, 2) NOT NULL,
  margem DECIMAL (10, 2) NOT NULL,
  id_fornecedor INT,
  id_categoria_roupa INT,
  status VARCHAR (50) NOT NULL,
  FOREIGN KEY (id_categoria_roupa) REFERENCES categoria_roupa(id),
  FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id)

 );
 
 CREATE TABLE IF NOT EXISTS cliente (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   nome VARCHAR (50) NOT NULL check(length(nome)>3),
   cpf VARCHAR (11)  UNIQUE NOT NULL,
   email VARCHAR (50) UNIQUE NOT NULL,
   senha VARCHAR (25) NOT NULL,
   telefone VARCHAR (11) NOT NULL check(length(nome)>=10),
   rua VARCHAR (100) NOT NULL,
   num INT NOT NULL,
   cidade VARCHAR (20) NOT NULL,
   data_nasc VARCHAR (50) NOT NULL,
   id_categoria_cliente INT NOT NULL,
   FOREIGN KEY (id_categoria_cliente) REFERENCES categoria_cliente(id)
 );
 
 Create table IF NOT EXISTS categoria_roupa(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   nome VARCHAR(100) NOT NULL check(length(nome)>3),
   );
 
 CREATE TABLE IF NOT EXISTS categoria_cliente (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   nome VARCHAR (50) NOT NULL,
   beneficios VARCHAR (100) NOT NULL,
   preco DECIMAL (10, 2) NOT NULL,
   id_cliente INT,
   
   FOREIGN KEY (id_cliente) REFERENCES cliente(id)
 );
  
 CREATE TABLE IF NOT EXISTS fornecedor (
   id INTEGER PRIMARY key AUTOINCREMENT,
   nome VARCHAR (50) NOT NULL check(length(nome)>3),
   cnpj VARCHAR (50) NOT NULL,
   endereco VARCHAR (100) NOT NULL,
   telefone VARCHAR () NOT NULL,
   email VARCHAR (50) NOT NULL,
   cep VARCHAR (8) NOT NULL 
   categoria VARCHAR (20) NOT NULL,
   nomefantasia VARCHAR (50) NOT NULL
 );
 
 CREATE TABLE IF NOT EXISTS pedido (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   data_hora DATETIME NOT NULL,
   subtotal DECIMAL (10, 2) NOT NULL,
   valor_total DECIMAL (10, 2) NOT NULL,
   forma_pagto VARCHAR (50) NOT NULL,
   status VARCHAR (50) NOT NULL,
   id_cliente INT,
   FOREIGN KEY (id_cliente) REFERENCES cliente(id)
 );
 
 CREATE TABLE itens_pedido (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   id_pedido INT,
   id_produto INT,
   qtd INT NoT NULL,
   
   FOREIGN KEY (id_produto) REFERENCES produto(id),
   FOREIGN KEY (id_pedido) REFERENCES pedido(id)
  );

 CREATE TABLE IF NOT EXISTS funcionario (
    id INTEGER PRIMARY key AUTOINCREMENT,
    nome VARCHAR (50) NOT NULL check(length(nome)>3),
    cargo VARCHAR (50)NOT NULL,
    nivel_permissao VARCHAR (50) NOT NULL,
   	cpf VARCHAR (11) UNIQUE NOT NULL,
   	email VARCHAR (30) UNIQUE Not NULL,
    data_contratacao DATETIME NOT NULL,
    telefone VARCHAR (11) NOT NULL check(length(telefone)>=10)
  );
  
  CREATE TABLE IF NOT EXISTS movimento_estoque (
    id INTEGER PRIMARY key AUTOINCREMENT,
    tipo_movimentacao VARCHAR (50) NOT NULL,
    qtd INT NOT NULL,
    data_hora DATETIME NOT NULL,
    id_produto INT,
    id_funcionario INT,
    id_pedido INT,
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id),
    FOREIGN KEY (id_produto) REFERENCES produto(id),
    FOREIGN KEY (id_pedido) REFERENCES pedido(id)
  );
  
  create Table IF NOT EXISTS avaliacoes(
    id INTEGER PRIMARY KEy AUTOINCREMENT,
    comentario VARCHAR (250) NOT NULL,
    nota DECIMAL(2,1) NOT NULL CHECK, 
    id_cliente INT,
	id_produto INT,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_produto) REFERENCES produto(id)
    );

  create Table IF NOT EXISTS estoque(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_entrada DATETIME NOT NULL,
    status_produto VARCHAR (50) NOT NULL,
    qtd_produto INT NOT NULL,
    id_produto INT,
    FOREIGN KEY (id_produto) REFERENCES produto(id)
  );

  create Table IF NOT EXISTS faq(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pergunta VARCHAR (250) NOT NULL,
    ordem INT NOT NULL,
    resposta VARCHAR (250) NOT NULL
  );
    -- Cliente --
    Create INDEX idx_cliente_email On cliente(email)
    Create INDEX idx_cliente_nome On cliente(nome)
    Create INDEX idx_cliente_cpf On cliente(cpf)
    -- Funcionario --
    CREATE INDEX idx_funcionario_email on funcionario(email)
    Create INDEX idx_funcionario_nome On funcionario(nome)
    Create INDEX idx_funcionario_cpf On cliente(nome)
    -- Produto --
    CREATE INDEX idx_produto_nome On produto(nome)
    CREATE INDEX idx_produto_categoria_roupa On produto(id_categoria_roupa)
    CREATE INDEX idx_produto_fornecedor On produto(id_fornecedor)
    -- Fornecedor --
    CREATE INDEX idx_fornecedor_cnpj On fornecedor(cnpj)
    CREATE INDEX idx_fornecedor_nome On fornecedor(nome)
    -- Pedido --
    CREATE INDEX idx_pedido_cliente ON pedido(id_cliente)
    CREATE INDEX idx_pedido_funcionario ON pedido(id_funcionario)
    CREATE Index idx_pedido_data ON pedido(data_hora)
    -- Item Pedido --
    CREATE Index idx_item_pedido On item_pedido(id_pedido)
    CREATE INDEX idx_item_pedido_produto ON item_pedido(id_produto)