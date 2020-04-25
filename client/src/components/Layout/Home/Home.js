import React, { Component } from 'react'
import Charts from './Charts';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <React.Fragment>
                <Charts />
            </React.Fragment>
        )
    }
}

export default Home;