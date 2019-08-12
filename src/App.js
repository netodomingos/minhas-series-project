import React from 'react';
import Header from './header';
import Generos from './Generos';
import NovoGenero from './novoGenero';
import EditarGenero from './EditarGenero';
import Series from './Series';
import NovaSerie from './novaSerie';
import InfoSerie from './InfoSerie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const home = () => {
  return <h1> Home </h1>
}

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={home} />
        <Route path='/generos' exact component={Generos} />
        <Route path='/series' exact component={Series} />
        <Route path='/generos/novo' exact component={NovoGenero} />
        <Route path='/series/novo' exact component={NovaSerie} />
        <Route path='/generos/:id' exact component={EditarGenero} />
        <Route path='/series/:id' exact component={InfoSerie} />
      </Switch>
    </Router>
  );
}

export default App