const conexao = require("../conexao");
const segredo = require("../segredo");
const jwt = require("jsonwebtoken");

const listarProdutos = async (req, res) => {
  const { categoria } = req.params;
  const { usuario } = req;

  try {
    const listaProdutos = await conexao.query(
      "select * from produtos where usuario_id = $1",
      [usuario.id]
    );
    if (categoria) {
      listaProdutos = await conexao.query(
        "select * from produtos where usuario_id = $1 and categoria = $2",
        [usuario.id, categoria]
      );
    }
    return res.status(200).json(listaProdutos.rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const obterProduto = async (req, res) => {
  const { id } = req.params;
  const { usuario } = req;

  if (!id) {
    return res.status(400).json("O id deve ser passado.");
  }

  try {
    const listaProdutos = await conexao.query(
      "select * from produtos where usuario_id = $1 and id = $2",
      [usuario.id, id]
    );
    if (listaProdutos.rowCount != 1) {
      return res.status(404).json("O produto não foi encontrado.");
    }
    return res.status(200).json(listaProdutos.rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarProduto = async (req, res) => {
  const { nome, estoque, preco, categoria, descricao, imagem } = req.body;
  const { usuario } = req;

  if (!nome || !categoria) {
    return res.status(404).json("O campo nome e categoria são obrigatórios.");
  }
  if (!estoque || !preco) {
    return res.status(404).json("O campo estoque e preco são obrigatórios.");
  }
  try {
    const queryConsultarProduto =
      "select * from produtos where nome = $1 and usuario_id = $2";
    const produtoRepetido = await conexao.query(queryConsultarProduto, [
      nome,
      usuario.id,
    ]);

    if (produtoRepetido.rowCount != 0) {
      return res.status(404).json("Produto já existe.");
    }

    const queryCadastro =
      "insert into produtos(usuario_id, nome, estoque, preco, categoria, descricao, imagem) values($1, $2, $3, $4, $5, $6, $7)";
    const produto = await conexao.query(queryCadastro, [
      usuario.id,
      nome,
      estoque,
      preco,
      categoria,
      descricao,
      imagem,
    ]);
    if (produto.rowCount === 0) {
      return res.status(404).json("Não foi possivel cadastrar o produto.");
    }
    return res.status(200).json("Produto cadastrado com sucesso.");
  } catch (error) {
    return res.status(200).json(error.message);
  }
};

const atualizarProduto = async (req, res) => {
  const { nome, estoque, preco, categoria, descricao, imagem } = req.body;
  const { usuario } = req;
  const { id: idProduto } = req.params;

  if (
    !nome ||
    !categoria ||
    !estoque ||
    !preco ||
    !categoria ||
    !descricao ||
    !imagem
  ) {
    return res
      .status(404)
      .json(
        "Os campos 'nome, estoque, preco, categoria, descricao, imagem' são obrigatorios."
      );
  }

  try {
    const queryProdutoExistente =
      "select * from produtos where id = $1 and usuario_id = $2";
    const ProdutoExistente = await conexao.query(queryProdutoExistente, [
      idProduto,
      usuario.id,
    ]);

    if (ProdutoExistente.rowCount == 0) {
      return res.status(404).json("O produto não foi encontrado.");
    }

    const queryAtualizacao =
      "update produtos set nome = $1, estoque = $2, preco = $3, categoria = $4, descricao = $5, imagem = $6 where id = $7 and usuario_id = $8";
    const produto = await conexao.query(queryAtualizacao, [
      nome,
      estoque,
      preco,
      categoria,
      descricao,
      imagem,
      idProduto,
      usuario.id,
    ]);
    if (produto.rowCount === 0) {
      return res.status(404).json("Não foi possivel atualizar o produto.");
    }
    return res.status(200).json("Produto atualizado com sucesso.");
  } catch (error) {
    return res.status(200).json(error.message);
  }
};

const excluirProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const queryProdutoExistente =
      "select * from produtos where id = $1 and usuario_id = $2";
    const produtoExistente = await conexao.query(queryProdutoExistente, [
      id,
      usuario.id,
    ]);

    if (produtoExistente.rowCount === 0) {
      return res.status(404).json("O produto não foi encontrado.");
    }

    const { rowCount } = await conexao.query(
      "delete from produtos where id = $1",
      [id]
    );

    if (rowCount == 0) {
      return res.status(404).json("Não foi possivel excluir o prduto.");
    }

    return res.status(200).json("Produto excluido com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
};
