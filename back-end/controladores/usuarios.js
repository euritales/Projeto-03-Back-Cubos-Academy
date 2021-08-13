const conexao = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const obterUsuario = async (req, res) => {
  const { authorization } = req.headers;
  const { usuario } = req;

  if (!authorization) {
    return res.status(404).json("Token não informado.");
  }

  try {
    if (!authorization) {
      return res.status(404).json("Token não informado.");
    }
    const queryConsultarUsuario = "select * from usuarios where id = $1";
    const consultaUsuario = await conexao.query(queryConsultarUsuario, [
      usuario.id,
    ]);
    if (usuario.rowCount === 0) {
      return res.status(404).json("Usuario não encontrado");
    }
    return res.status(200).json(consultaUsuario.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;

  if (!nome) {
    return res.status(404).json("O campo nome é obrigatório.");
  }

  if (!email) {
    return res.status(404).json("O campo email é obrigatório.");
  }

  if (!senha) {
    return res.status(404).json("O campo senha é obrigatório.");
  }

  if (!nome_loja) {
    return res.status(404).json("O campo nome_loja é obrigatório.");
  }
  try {
    const queryConsultaEmail = "select * from usuarios where email = $1";
    const { rowCount: quantidadeUsuarios } = await conexao.query(
      queryConsultaEmail,
      [email]
    );

    if (quantidadeUsuarios > 0) {
      return res.status(400).json("O email informado já existe.");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const query =
      "insert into usuarios (nome, email, senha, nome_loja) values ($1, $2, $3, $4)";
    const usuarioCadastrado = await conexao.query(query, [
      nome,
      email,
      senhaCriptografada,
      nome_loja,
    ]);
    if (usuarioCadastrado.rowCount == 0) {
      return res.status(400).json("Não foi possível cadastrar o usuário.");
    }
    return res.status(200).json("Usuario cadastrado com sucesso.");
  } catch (error) {
    return res.status(error.message);
  }
};
const atualizarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;
  const { id } = req.params;

  if (!nome || !email || !senha || !nome_loja) {
    return res
      .status(404)
      .json("Os campos 'nome, email, senha, nome_loja' são obrigatorios.");
  }
  try {
    const queryVerificarEmail = "select * from usuarios where email = $1";
    const verificarEmail = await conexao.query(queryVerificarEmail, [email]);

    if (verificarEmail.rowCount > 1) {
      return res.status(400).json("O email informado ja existe.");
    }
    const queryAtualizarUsuario =
      "update usuarios set nome = $1, email = $2, senha = $3, nome_loja = $4 where id = $5";
    const atualizacaoUsuario = await conexao.query(queryAtualizarUsuario, [
      nome,
      email,
      senha,
      nome_loja,
      id,
    ]);

    if (atualizacaoUsuario.rowCount === 0) {
      return res.status(404).json("Não foi possivel cadastrar o produto.");
    }
    return res.status(200).json("Usuario atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  obterUsuario,
  cadastrarUsuario,
  atualizarUsuario,
};
