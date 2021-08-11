const conexao = require("../conexao");
const segredo = require("../segredo");
const jwt = require("jsonwebtoken");

const listarProdutos = async (req, res) => {};
const obterProduto = async (req, res) => {};

const cadastrarProduto = async (req, res) => {
  const { nome, token, estoque, preco, categoria, descricao, imagem } =
    req.body;

  if (!token) {
    return res.status(404).json("O campo token é obrigatórios.");
  }
  if (!nome || !categoria) {
    return res.status(404).json("O campo nome e categoria são obrigatórios.");
  }
  if (!estoque || !preco) {
    return res.status(404).json("O campo estoque e preco são obrigatórios.");
  }
  try {
    const { id } = jwt.verify(token, segredo);

    const queryVerificar = "select * from usuarios where id = $1";
    const { rows, rowCount } = await conexao.query(queryVerificar, [id]);

    if (rowCount == 0) {
      return res.status(404).json("O usuario não foi encontrado.");
    }
    const usuario = rows[0];
    const queryCadastro =
      "insert into produtos(usuario_id, nome, token, estoque, preco, categoria, descricao, imagem) values($1, $2, $3, $4, $5, $6, $7, $8)";
    const produto = await conexao.query(queryCadastro, [
      usuario.id,
      nome,
      token,
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
  const { nome, token, estoque, preco, categoria, descricao, imagem } =
    req.body;
  const { id: idProduto } = req.params;

  if (!token) {
    return res.status(404).json("O campo token é obrigatórios.");
  }

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
    const { id } = jwt.verify(token, segredo);
    const queryProdutoExistente =
      "select * from usuarios where id = $1 and usuario_id = $2";
    const ProdutoExistente = await conexao.query(queryProdutoExistente, [
      idProduto,
      queryProdutoExistente,
    ]);

    if (ProdutoExistente.rowCount == 0) {
      return res.status(404).json("O produto não foi encontrado.");
    }

    const queryVerificar = "select * from usuarios where id = $1";
    const { rows, rowCount } = await conexao.query(queryVerificar, [id]);

    if (rowCount == 0) {
      return res.status(404).json("O usuario não foi encontrado.");
    }
    const usuario = rows[0];
    const queryAtualizacao =
      "update into produtos set   nome = $1, token = $2, estoque= $3, preco = $4, categoria = $5, imagem = $6, where id = $7 and usuario_id = $8";
    const produto = await conexao.query(queryAtualizacao, [
      nome,
      token,
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

const excluirProduto = async (req, res) => {};

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
};
