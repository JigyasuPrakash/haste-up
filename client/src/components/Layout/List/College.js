import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


class CollegeList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            collegeDetail: {},
            similarColleges: [],
        }
    }

    componentDidMount() {
        axios.post('http://localhost:8080/getcollegebyname', {
            collegename: window.localStorage.getItem('collegeName')
        })
            .then((response) => {
                this.setState({
                    collegeDetail: response.data
                })
                window.localStorage.setItem('similarCity', response.data.city);
                window.localStorage.setItem('similarCount', response.data.no_of_students);
                window.localStorage.setItem('similarCourse', response.data.courses);

                axios.post('http://localhost:8080/getsimilarcolleges', {
                    city: window.localStorage.getItem('similarCity'),
                    studentcount: window.localStorage.getItem('similarCount'),
                    course: window.localStorage.getItem('similarCourse')
                })
                    .then((res) => {
                        this.setState({
                            similarColleges: res.data
                        })
                    })
                    .catch((err) => {
                        console.error("Somthing went wrong", err);
                    })
            })
            .catch((err) => {
                console.error("Somthing went wrong", err);
            })
    }


    render() {

        const styles = {
            root: {
                flexGrow: 1,
                padding: '10px'
            },
            box: {
                padding: '10px'
            },
            paper: {
                padding: '10px'
            }
        };

        const columns = [
            { id: 'name', label: 'Name', minWidth: 100 },
            {
                id: 'state',
                label: 'state',
                minWidth: 80,
                align: 'right',
                format: (value) => value.toLocaleString(),
            },
            {
                id: 'no_of_students',
                label: 'No of Student',
                minWidth: 100,
                align: 'right',
                format: (value) => value.toLocaleString(),
            }
        ];

        return (
            <Grid container justify="space-evenly">
                <Grid item xs={7}>
                    <Paper>
                        <h1 style={{ textAlign: "center" }}>College: {window.localStorage.getItem('collegeName')}</h1>
                    </Paper>

                    <Grid container justify="space-evenly" direction="row" alignItems="center">
                        <Grid item xs={12} style={styles.box}>
                            <Paper style={styles.paper}>
                                
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Paper>
                        <h1 style={{ textAlign: "center" }}>Similar Colleges</h1>
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
                                    {this.state.similarColleges.map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={ele => {
                                                console.log(ele)
                                            }}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
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

                </Grid>
            </Grid>
        )
    }
}

export default CollegeList
