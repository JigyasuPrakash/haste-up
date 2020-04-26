import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Layout/Home/Home';
import Error404 from './components/Layout/Error404';
import CollegeList from './components/Layout/List/CollegeList';
import College from './components/Layout/List/College';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Route render={({ location }) => (
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route path="/college" component={College} />
            <Route path='/collegelist' component={CollegeList} />
            <Route path="/404" component={Error404} />
            <Redirect to='/404' />
          </Switch>
        )} />
      </Container>
    </BrowserRouter>
  );
}

export default App;