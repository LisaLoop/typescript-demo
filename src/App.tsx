import React from 'react';
import './App.css';
import {TodoList} from './components/list'
import {Todo} from './core/types'


const listItems: Todo[] = [{
    name: "something",
    description: "blah",
    isDone: false,
    id: "1"
}]

function App() {
  return (
    <div className="App">
     <TodoList todos={listItems}/>
    </div>
  );
}

export default App;
