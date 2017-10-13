import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Bestellingen } from './components/Bestellingen';
import { Wenslijst } from './components/Wenslijst';
import { Winkelmand } from './components/Winkelmand';
import { ProductPage } from './components/ProductPage';
import { Home } from './components/Home';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/Wenslijst' component={ Wenslijst } />
    <Route path='/Winkelmand' component={ Winkelmand } />
    <Route path='/ProductPage' component={ ProductPage } />
    <Route path='/Bestellingen' component={ Bestellingen } />
</Layout>;
