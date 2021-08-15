import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Produtos from "./pages/Produtos";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/produtos" component={Produtos} />
      </Switch>
    </Router>
  );
}

export default Routes;
//.
