const express = require("express");
const usuarios = require("./controladores/usuarios");
const produtos = require("./controladores/produtos");
const login = require("./controladores/login");

const rotas = express();

rotas.post("/usuarios", usuarios.cadastrarUsuario);
rotas.post("/login", login.login);
rotas.get("/usuarios/:id", usuarios.obterUsuario);
rotas.put("/usuarios/:id", usuarios.atualizarUsuario);

rotas.post("/produtos", produtos.cadastrarProduto);
rotas.put("/produtos/:id", produtos.atualizarProduto);
rotas.get("/produtos", produtos.listarProdutos);
rotas.get("/produtos/:id", produtos.obterProduto);
rotas.delete("/produtos/:id", produtos.excluirProduto);

module.exports = rotas;
