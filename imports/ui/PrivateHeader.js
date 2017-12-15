import { Accounts } from 'meteor/accounts-base'
import PropTypes from 'prop-types';
import React from 'react'

const PrivateHeader = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <button onClick={() => Accounts.logout()}>Logout</button>
        </div>
    )
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PrivateHeader