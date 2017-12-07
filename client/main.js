import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Tracker } from 'meteor/tracker'

import NotFound from '../imports/ui/NotFound'
import Signup from '../imports/ui/Signup'
import Login from '../imports/ui/Login'
import Link from '../imports/ui/Link'

//Dev
window.browserHistory = browserHistory;

const unauthenticatedPage = ['/', '/signup'];
const authenticatedPage = ['/links'];

const onEnterPublicPage = () => {
    if(Meteor.userId()) {
        browserHistory.replace('/links');
    }
}

const onEnterPrivatePage = () => {
    if(!Meteor.userId()) {
        browserHistory.replace('/');
    }
}

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
        <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
        <Route path="*" component={NotFound} />
    </Router>
)

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId()
    const pathname = browserHistory.getCurrentLocation().pathname
    const isAuthenticatedPage = authenticatedPage.includes(pathname)
    const isUnauthenticatedPage = unauthenticatedPage.includes(pathname)

    if(isAuthenticated && isUnauthenticatedPage) {
        browserHistory.replace('/links')
    } else if(!isAuthenticated && isAuthenticatedPage) {
        browserHistory.replace('/')
    }

})

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'))
})