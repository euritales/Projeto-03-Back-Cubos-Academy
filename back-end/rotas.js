const express = require("express");
const usuarios = require("./controladores/usuarios");
const produtos = require("./controladores/produtos");
const login = require("./controladores/login");
const verificarLogin = require("./filtros/verificarLogin");

const rotas = express();
// 03 - post V
// 03 - get ()

rotas.post("/usuarios", usuarios.cadastrarUsuario); //V
rotas.post("/login", login.login); //V

rotas.use(verificarLogin);
rotas.post("/produtos", produtos.cadastrarProduto); //V
rotas.get("/perfil", usuarios.obterUsuario); // X
rotas.put("/usuarios/:id", usuarios.atualizarUsuario); //X
rotas.put("/produtos/:id", produtos.atualizarProduto); //V

rotas.get("/produtos", produtos.listarProdutos); //V PRIMEIRA FUNÇÃO
rotas.get("/produtos/:id", produtos.obterProduto); //X SEGUNDA, USUARIO LOGADO
rotas.delete("/produtos/:id", produtos.excluirProduto); //V TERCEIRO

module.exports = rotas;
