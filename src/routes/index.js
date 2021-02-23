import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Comidas from '../pages/Comidas';
import Bebidas from '../pages/Bebidas';
import ComidasDetalhes from '../pages/ComidasDetalhes';
import BebidasDetalhes from '../pages/BebidasDetalhes';
import ComidasProcesso from '../pages/ComidasProcesso';
import BebidasProcesso from '../pages/BebidasProcesso';
import Explorar from '../pages/Explorar';
import BebidasExplorar from '../pages/BebidasExplorar';
import ComidasExplorar from '../pages/ComidasExplorar';
import ComidasIngredientes from '../pages/ComidasIngredientes';
import BebidasIngredientes from '../pages/BebidasIngredientes';
import ComidasArea from '../pages/ComidasArea';
import Perfil from '../pages/Perfil';
import ReceitasFeitas from '../pages/ReceitasFeitas';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/comidas" component={ Comidas } />
    <Route exact path="/bebidas" component={ Bebidas } />
    <Route exact path="/comidas/:id" component={ ComidasDetalhes } />
    <Route exact path="/bebidas/:id" component={ BebidasDetalhes } />
    <Route exact path="/comidas/:id/in-progress" component={ ComidasProcesso } />
    <Route exact path="/bebidas/:id/in-progress" component={ BebidasProcesso } />
    <Route exact path="/explorar" component={ Explorar } />
    <Route exact path="/explorar/comidas" component={ ComidasExplorar } />
    <Route exact path="/explorar/bebidas" component={ BebidasExplorar } />
    <Route
      exact
      path="/explorar/comidas/ingredientes"
      component={ ComidasIngredientes }
    />
    <Route
      exact
      path="/explorar/bebidas/ingredientes"
      component={ BebidasIngredientes }
    />
    <Route exact path="/explorar/comidas/area" component={ ComidasArea } />
    <Route exact path="/explorar/bebidas/area" component={ () => <h1>Not Found</h1> } />
    <Route exact path="/perfil" component={ Perfil } />
    <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
    <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />

  </Switch>
);

export default Routes;
