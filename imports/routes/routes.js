import { Router, Route, browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor'
import React from 'react'

import NotFound from '../ui/NotFound'
import Signup from '../ui/Signup'
import Login from '../ui/Login'
import Link from '../ui/Link'

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

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname
    const isAuthenticatedPage = authenticatedPage.includes(pathname)
    const isUnauthenticatedPage = unauthenticatedPage.includes(pathname)

    if(isAuthenticated && isUnauthenticatedPage) {
        browserHistory.replace('/links')
    } else if(!isAuthenticated && isAuthenticatedPage) {
        browserHistory.replace('/')
    }
}

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
        <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
        <Route path="*" component={NotFound} />
    </Router>
)