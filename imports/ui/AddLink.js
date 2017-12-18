import React from 'react'
import Modal from 'react-modal'
import { Meteor } from 'meteor/meteor'

export default class AddLink extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            url: '',
            error: ''
        }
    }

    onSubmit(e) {
        e.preventDefault()

        const { url } = this.state

        Meteor.call('link.insert', url, (err, res) => {
            if(!err) {
                this.handleModalClose()
            } else {
                this.setState({error: err.reason})
            }
        })
    }

    onChange(e) {
        this.setState({url: e.target.value.trim() })
    }

    handleModalClose() {
        this.setState({
            isOpen: false, 
            url: '', 
            error: ''
        })
    }

    render () {
        return (
            <div>
                <button onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
                
                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Add link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}>

                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <input 
                            type="text"
                            placeholder="URL"
                            ref="url"
                            value={this.state.url}
                            onChange={this.onChange.bind(this)}
                        />
                        <button>Add Link</button>
                    </form>
                    <button onClick={this.handleModalClose.bind(this)}>Cancel</button>
                </Modal>
            </div>
        )
    }
}