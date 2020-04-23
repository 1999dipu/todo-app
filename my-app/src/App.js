import React, {Component} from 'react';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import axios from 'axios';


class App extends Component {
  state={
    todos:[]
  }
  componentDidMount(){
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then(res=>this.setState({todos:res.data}))
  }
  // Toggle Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };
  // Delete Todo
  delTodo = (id) =>{
    
    this.setState({ todos:[...this.state.todos.filter(todo => todo.id
      !==id) ] } );
  }

  //add Todo
  addTodo = (title) =>{
    const newTodo={
      id: uuidv4(),
      title,
      completed:false
    }
    this.setState({ todos:[...this.state.todos,newTodo]});
  }

  render() {
    //passsing the state console.log(this.state.todos)
    return (
      <div className="App">
        <div className="container">
        <Header />
        <AddTodo addTodo ={this.addTodo} />
        <Todos todos={this.state.todos} 
        markComplete={this.markComplete}
        delTodo={this.delTodo}
        /> 
        </div>
      </div>
    );
  }
}
export default App;
//as imported todos do can be taken same as its html tag 
//this is done to embed the component into our main app