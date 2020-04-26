import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class CollegeList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rows: []
        }
    }

    componentDidMount() {
        axios.post('https://haste-up.herokuapp.com/getcollegesfromchart', {
            state: window.localStorage.getItem('StateName'),
            course: window.localStorage.getItem('BranchName')
        })
            .then((response) => {
                this.setState({
                    rows: response.data
                })
            })
            .catch((err) => {
                console.error("Something went wrong", err);
            })
    }

    render() {
        
        const clickHandler = (value) => {
            window.localStorage.setItem('collegeName', value);
            window.location.href = '/college';
        }

        const columns = [
            {
                id: 'name',
                label: 'Name',
                minWidth: 100,
                format: (value) => (<Button onClick={() => clickHandler(value)}>{value}</Button>)
            },
            { id: 'year', label: 'Year', minWidth: 50 },
            {
                id: 'state',
                label: 'State',
                minWidth: 100,
                align: 'right',
            },
            {
                id: 'no_of_students',
                label: 'No. of Student',
                minWidth: 50,
                align: 'right',
            },
        ];

        return (
            <Paper>
                <h1 style={{ textAlign: "center" }}>College List</h1>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (

                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && column.id === 'name' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }
}

export default CollegeList
