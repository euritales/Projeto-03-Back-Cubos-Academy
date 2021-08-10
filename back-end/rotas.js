const express = require("express");
const usuarios = require("./controladores/usuarios");
const produtos = require("./controladores/produtos");

const rotas = express();

rotas.get("/usuarios", usuarios.listarUsuarios);
rotas.get("/usuarios:id", usuarios.obterUsuario);
rotas.post("/usuarios", usuarios.cadastrarUsuario);
rotas.put("/usuarios:id", usuarios.atualizarUsuario);
rotas.delete("/usuarios:id", usuarios.excluirUsuario);

rotas.get("/produtos", produtos.listarProdutos);
rotas.get("/produtos:id", produtos.obterProduto);
rotas.post("/produtos", produtos.cadastrarProduto);
rotas.put("/produtos:id", produtos.atualizarProduto);
rotas.delete("/produtos:id", produtos.excluirProduto);

module.exports = rotas;
