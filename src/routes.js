import React from 'react';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';

/* Realizo a importação das paginas no
componente de rotas */

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return ( /*Definindo as rotas do sistema */
    <BrowserRouter>
      <Switch>

        <Route path="/" exact  component={ Main } />
        <Route path="/repository/:repository" component={ Repository } />

      </Switch>
    </BrowserRouter>
  );

}
