import React, { Component } from 'react';
import {ApiConsumer} from './Components/ApiConsumer/ApiConsumer';
import logo from './logo.svg';
import './App.css';
import SearchInput from './Components/SearchBar/SearchBar'

class App extends Component {


  render() {
    return (
      <div className="App">
           <SearchInput></SearchInput>
           
      </div>
    );
  }
}

export default App;
