import React, { Component } from 'react';
import './App.css';
import ToDoItem from './components/ToDoItem';

const NewToDoForm = ({onChange, onSubmit, draft}) => (
  <div>
    <input type="text" onChange={onChange} value={ draft }></input>
    <button onClick={onSubmit}>Add</button>
  </div>
)

class ToDoList extends Component {
  state = {
    tasks: this.props.tasks,
    draft: ''
  }

  updateDraft = event => {
    this.setState({draft: event.target.value});
  }

  addToDo = () => { 
    const { draft }  = this.state;
    this.setState(prevState => ({tasks: [...prevState.tasks, {text: draft}], draft: ''}));
  }

  render() {
    const { title } = this.props;
    const { tasks, draft } = this.state;
    return (
    <div>
      <h1>{ title }</h1>
      { tasks.map(task => <ToDoItem text={task.text} done={task.done}/>) }
      <NewToDoForm 
        onSubmit={this.addToDo}
        onChange={this.updateDraft}
        draft={ draft }
      />
    </div>
    )
  }
}
class App extends Component {
  myTasks = [
    {
      done: true,
      text: 'Record a ReactJS video'
    },
    {
      done: false,
      text: "Go for a walk"
    }    
  ];
  render() {
    return (
      <div>
        <ToDoList title="My stuff" tasks={this.myTasks}/>
      </div>
    );
  }
}

export default App;
