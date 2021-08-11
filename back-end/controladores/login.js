const conexao = require("../conexao");
const bcrypt = require("bcrypt");
const jwb = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(404).json("Email e senha são obrigatorios.");
  }
  try {
    const queryEmail = "select * from usuarios where email = $1";
    const { rows, rowCount } = await conexao.query(queryEmail, [email]);

    if (rowCount == 0) {
      return res.status(404).json("Usuario não encontrado.");
    }
    const usuario = rows[0];

    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

    if (!senhaVerificada) {
      return res.status(400).json("Email e senha nao conferem.");
    }

    const token = jwb.sign({ id: usuario.id }, "senhaParaToken", {
      expiresIn: "1d",
    });

    const { senha: senhaUsuario, ...dadosUsuario } = usuario;

    return res.status(200).json({ usuario: dadosUsuario, token });
  } catch {
    return res.status(400).json(error.message);
  }
};

module.exports = { login };
