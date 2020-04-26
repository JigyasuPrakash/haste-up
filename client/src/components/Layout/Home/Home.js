import React, { Component } from 'react'
import Charts from './Charts';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <h1 style={{ textAlign: "center" }}>Your College Mate</h1>
                <p style={{ textAlign: "center" }}>
                    To get started click on any of the stats and relevent result would be displayed on the screen.
                </p>
                <Charts />
            </React.Fragment>
        )
    }
}

export default Home;