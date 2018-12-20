import React, { Component } from 'react'
import { SubmitButton } from '../../helpers/theme'
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

  state = {
    processing: false,
    currentUser: null,
    finished: false
  }

  fbLogin = () => {
    this.setState({processing: true})
    window.FB.getLoginStatus(response => {
      if(response.status !== 'connected') {
        window.FB.login()
      } else {
        window.FB.api('/me', user => {
          sessionStorage.setItem('currentUser', user)
          this.setState({finished: true, processing: false, currentUser: user})
        })
      }
    })
  }

  render() {
    const { finished, currentUser , processing } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' }}

    if(finished) {
      return <Redirect to={from} />
    }
    return (
      <div>
        { currentUser
          ? <div>Hello, { currentUser.name }!</div>
          : <p>You must login to view page {from.pathname}</p>
        }
        { processing
          ? <div>Authenticating...</div>
          : <SubmitButton onClick={this.fbLogin}>Login</SubmitButton>
        }
      </div>
    )
  }
}
