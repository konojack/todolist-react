import React, { Component } from 'react';
import ToDoItem from '../../components/ToDoItem';
import NewToDoForm from '../../components/NewToDoForm';

class ToDoList extends Component {
    static defaultProps = {
        title: "Mu stuff list",
        tasks: [
            { done: true, text: 'Record a ReactJS video' }, 
            { done: false, text: "Go for a walk" }
        ]
    }

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

  export default ToDoList;