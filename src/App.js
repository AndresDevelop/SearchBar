import React, { Component } from 'react';
import {ApiConsumer} from './Components/ApiConsumer/ApiConsumer';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  RenderInfo = (info) =>(

    info.map(datos =>(
      <li>{datos.name}</li>
    ))
  )
  render() {
    return (
      <div className="App">
        <ApiConsumer>
          {({ loading, error, data }) => {
            if (loading) {
              return <h1>Loading timeline...</h1>;
            }

            if (error) {
              return <h1>{error.message}</h1>;
            }

            return this.RenderInfo(data)
          }}
        </ApiConsumer>     
      </div>
    );
  }
}

export default App;
