import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export class NotFound extends Component {
    state = {
        counter: 10
    }

    componentDidMount = () => {
        const intervalId = setInterval(this.countDown, 1000);
        this.setState({intervalId});
    }

    componentWillUnmount = () => {
        clearInterval(this.state.intervalId)
    }

    countDown = () => this.setState({counter: this.state.counter - 1})

    render() {
        const { location } = this.props;
        const { counter } = this.state;
        return (
            <div>
                <p>No match for <code>{location.pathname}</code></p>
                <p>Redirect to homepage in {counter} seconds</p>
                { counter === 0 && <Redirect to='/'/>}
            </div>
        )
    }
}

export default NotFound
