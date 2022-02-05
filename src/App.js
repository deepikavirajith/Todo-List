import React, { Component, ReactDOM } from "react";
import './App.css';
import Header from './components/HeaderComponent';
import ToDoList from './components/ToDoListComponent';


class App extends Component {
  render(){
  return (
    <div className="App">
    <Header />
    <ToDoList />
    </div>
    
  );
  }
}

export default App;
