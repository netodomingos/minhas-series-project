import React, { useState, useEffect } from 'react';
import Header from './header';
import Generos from './Generos';
import NovoGenero from './novoGenero';
import EditarGenero from './EditarGenero';
import Axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom'

const home = () => {
  return <h1> Home </h1>
}


function App() {
  const [data, setData] = useState({})
  useEffect(() => {
    Axios.get('/api').then(res => {
      setData(res.data)
    })
  }, [])
  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={home} />
        <Route path='/generos' exact component={Generos} />
        <Route path='/generos/novo' exact component={NovoGenero} />
        <Route path='/generos/:id' exact component={EditarGenero} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
}

export default App