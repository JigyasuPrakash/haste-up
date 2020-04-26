import React, { Component } from 'react'
import Charts from './Charts';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <h1 style={{ textAlign: "center" }}>Your College Mate</h1>
                <span style={{ textAlign: "center" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </span>
                <Charts />
            </React.Fragment>
        )
    }
}

export default Home;