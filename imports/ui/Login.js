import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
    }
    
    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        Meteor.loginWithPassword({email}, password, (err) => {
            if(err) {
                this.setState({
                    error: 'Email and password don\'t match!'
                })
            } else {
                browserHistory.push('/links')
            }
        })

    }

    render () {
        return (
            <div>
                <h1>Login to Short Lnk</h1>

                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="email" ref="email" name="email" placeholder="Email" />
                    <input type="password" ref="password" name="password" placeholder="Password" />
                    <button>Login</button>
                </form>

                <Link to="/signup">Have an acccount?</Link>
            </div>
        )
    }
}