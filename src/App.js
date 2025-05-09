import React, { Component, ReactDOM } from "react";
import './App.css';
import Header from './components/HeaderComponent';
import ToDoList from './components/ToDoListComponent';
import AddComponent from "./components/AddComponent";
import Reference from "./components/ReferenceComponent";
import TestComponent from "./components/TestComponent";
import EditComponent from "./components/EditComponent";


class App extends Component {
  render(){
  return (
    <div className="App">
    <TestComponent />
    </div>
    
  );
  }
}

export default App;
