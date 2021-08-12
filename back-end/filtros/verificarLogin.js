const conexao = require("../conexao");
const segredo = require("../segredo");
const jwt = require("jsonwebtoken");

const verificarLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json("Token não informado.");
  }

  try {
    const token = authorization.replace("Bearer", "").trim();

    const { id } = jwt.verify(token, segredo);

    const queryVerificar = "select * from usuarios where id = $1";
    const { rows, rowCount } = await conexao.query(queryVerificar, [id]);

    if (rowCount == 0) {
      return res.status(404).json("O usuario não foi encontrado.");
    }
    const { senha, ...usuario } = rows[0];

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(400).json(error.massage);
  }
};

module.exports = verificarLogin;
