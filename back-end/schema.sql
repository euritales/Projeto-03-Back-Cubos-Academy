CREATE TABLE IF NOT EXISTS usuarios(
    id serial PRIMARY KEY,
    nome text NOT NULL,
    nome_loja text,
    email text NOT NULL,
    senha text NOT NULL
);
CREATE TABLE IF NOT EXISTS produtos(
    id serial PRIMARY KEY,
    usuario_id int NOT NULL,
    nome text NOT NULL,
    estoque NOT NULL,
    categoria varchar(18) NOT NULL,
    preco int,
    descricao text,
    imagem text,
    foreign key (usuario_id) references usuarios(id)

);
