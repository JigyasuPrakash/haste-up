import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Layout/Home/Home';
import Error404 from './components/Layout/Error404';
import { Container } from '@material-ui/core';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Route render={({ location }) => (
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route path="/404" component={Error404} />
            <Redirect to='/404' />
          </Switch>
        )} />
      </Container>
    </BrowserRouter>
  );
}

export default App;