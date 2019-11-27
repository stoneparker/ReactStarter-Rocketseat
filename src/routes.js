import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Product from './pages/product';

const Routes = () => (
    <BrowserRouter> {/* indica que estamos utilizando dentro de um browser */}
        <Switch> {/* permite que apenas um rota seja chamada ao mesmo tempo */}
            <Route exact path="/" component={Main} />
            <Route path="/products/:id" component={Product} />
        </Switch>
    </BrowserRouter>
);

export default Routes;

