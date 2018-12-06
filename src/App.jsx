import React, { Component } from 'react';
import './App.css';
import ToDoList from './containers/ToDoList';
import ToDoEditForm from './components/ToDoEditForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import NotFound from './components/NotFound'

const Container = styled.div`
  background: #2b2e39;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  padding: 14px;
  border-radius: 14px;
  margin-top: 14px;
`

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Switch>
            <Route exact path='/' component={ToDoList} />
            <Route path='/todo_items/:itemId' component={ToDoEditForm} />
            <Route component={NotFound}></Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
