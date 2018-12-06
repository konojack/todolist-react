import React, { Component } from 'react';
import ToDoItem from '../../components/ToDoItem';
import NewToDoForm from '../../components/NewToDoForm';
import * as toDoItemApi from '../../helpers/toDoItemApi';
import * as _ from 'ramda';
import styled from 'styled-components';

const Header = styled.h1`
  color: #fff;
`
const DestroyButton = styled.button`
  color: #fff;
  border-radius: 10px;
  background: red;
  margin: 10px 0;
  padding: 5px;
`

class ToDoList extends Component {
    componentDidMount = async () => {
      const tasks = await toDoItemApi.getAll();
      this.setState({tasks: tasks});
    }

    static defaultProps = {
        title: "Mu stuff list",
        tasks: []
    }

    state = {
      tasks: this.props.tasks,
      draft: ''
    }
  
    updateDraft = event => {
      this.setState({draft: event.target.value});
    }
  
    addToDo = async () => { 
      const { tasks, draft }  = this.state;
      const task = await toDoItemApi.create({content: draft})
      this.setState({tasks: _.append(task, tasks), draft: ''});
    }

    removeAll = async () => {
      const { tasks } = this.state;
      for(const task of tasks) {
        await this.destroyToDo(task.id);
      }
    }

    findById = (id, arr) => {
      const index = _.findIndex(_.propEq('id', id))(arr)

      return { index, task: arr[index]}
    }

    destroyToDo = async (id) => {
      const { tasks } = this.state;
      await toDoItemApi.destroy(id);
      const { index } = this.findById(id, tasks);

      this.setState({tasks: _.remove(index, 1, tasks)});

    }

    toggleDone = async (id) => {
      const { tasks } = this.state;
      const { index, task } = this.findById(id, tasks);
      const response = await toDoItemApi.update(id, {done: !task.done});

      this.setState({tasks: _.update(index, response, tasks)})
    }
  
    render() {
      const { title } = this.props;
      const { tasks, draft } = this.state;
      return (
      <div>
        <Header>{ title }</Header>
        <DestroyButton onClick={this.removeAll}>Remove all tasks</DestroyButton>
        { tasks.map((task) => 
          <ToDoItem 
            key={task.id}
            id={task.id}
            destroy={this.destroyToDo}
            toggleDone={this.toggleDone}
            text={task.content} 
            done={task.done}/>) 
        }
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