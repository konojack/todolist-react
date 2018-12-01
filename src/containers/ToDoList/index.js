import React, { Component } from 'react';
import ToDoItem from '../../components/ToDoItem';
import NewToDoForm from '../../components/NewToDoForm';
import styled from 'styled-components';

const Container = styled.div`
  background: #2b2e39;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  padding: 14px;
  border-radius: 14px;
  margin-top: 14px;
`
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
    apiUrl = "https://5c01dd5ad526f900134722f2.mockapi.io/todo_list";

    componentDidMount = () => {
      fetch(this.apiUrl)
        .then(resp => resp.json())
        .then(json => this.setState({tasks: json}));
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
  
    addToDo = () => { 
      const { draft }  = this.state;
      this.setState(prevState => ({tasks: [...prevState.tasks, {content: draft, done: false}], draft: ''}));
    }

    removeAll = () => {
      this.setState({tasks: []});
    }
  
    render() {
      const { title } = this.props;
      const { tasks, draft } = this.state;
      return (
      <Container>
        <Header>{ title }</Header>
        <DestroyButton onClick={this.removeAll}>Remove all tasks</DestroyButton>
        { tasks.map(task => <ToDoItem text={task.content} done={task.done}/>) }
        <NewToDoForm 
          onSubmit={this.addToDo}
          onChange={this.updateDraft}
          draft={ draft }
        />
      </Container>
      )
    }
  }

  export default ToDoList;