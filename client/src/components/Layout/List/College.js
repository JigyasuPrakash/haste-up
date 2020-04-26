import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import axios from 'axios';


class CollegeList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            collegeDetail: {},
            similarColleges: [],
            courses: [],
            students: []
        }
    }

    componentDidMount() {
        axios.post('https://haste-up.herokuapp.com/getcollegebyname', {
            collegename: window.localStorage.getItem('collegeName')
        })
            .then((response) => {
                this.setState({
                    collegeDetail: response.data,
                    courses: response.data.courses
                })
                window.localStorage.setItem('collegeID', response.data._id);
                window.localStorage.setItem('similarCity', response.data.city);
                window.localStorage.setItem('similarCount', response.data.no_of_students);
                window.localStorage.setItem('similarCourse', response.data.courses);

                axios.post('https://haste-up.herokuapp.com/getsimilarcolleges', {
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

                axios.post('https://haste-up.herokuapp.com/getstudents', {
                    collegeID: window.localStorage.getItem('collegeID')
                })
                    .then((result) => {
                        this.setState({
                            students: result.data
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

        const clickHandler = (value) => {
            window.localStorage.setItem('collegeName', value);
            window.location.href = '/college';
        }

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
            {
                id: 'name',
                label: 'Name',
                minWidth: 100,
                format: (value) => (<Button onClick={() => clickHandler(value)}>{value}</Button>)
            },
            {
                id: 'state',
                label: 'State',
                minWidth: 60,
                align: 'right',
                format: (value) => value.toLocaleString(),
            },
            {
                id: 'no_of_students',
                label: 'No. of Student',
                minWidth: 120,
                align: 'right',
                format: (value) => value.toLocaleString(),
            }
        ];

        const studentColumn = [
            {
                id: 'name',
                label: 'Name',
                minWidth: 100,
            },
            {
                id: 'year_of_batch',
                label: 'Batch',
                minWidth: 80,
                align: 'right',
            }
        ]

        return (
            <Grid container justify="space-evenly">
                <Grid item xs={7}>
                    <Paper>
                        <h1 style={{ textAlign: "center" }}>College: {window.localStorage.getItem('collegeName')}</h1>
                    </Paper>

                    <Grid container justify="space-evenly" direction="row" alignItems="center">
                        <Grid item xs={4} style={styles.box}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>Location</Typography>
                                    <Typography variant="h5" component="h2">
                                        {this.state.collegeDetail.city}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {this.state.collegeDetail.state}, {this.state.collegeDetail.country}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={4} style={styles.box}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>No. of Students</Typography>
                                    <Typography variant="h5" component="h2">
                                        {this.state.collegeDetail.no_of_students}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        &nbsp;
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={4} style={styles.box}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>Year of Estd.</Typography>
                                    <Typography variant="h5" component="h2">
                                        {this.state.collegeDetail.year}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        &nbsp;
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} style={styles.box}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>Courses Offered</Typography>
                                    <Typography variant="h5" component="h2">
                                        {this.state.courses.map((course) => (
                                            <span>{course}, </span>
                                        ))}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        &nbsp;
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} style={styles.box}>
                            <Paper>
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {studentColumn.map((column) => (
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
                                            {this.state.students.map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={ele => {
                                                        console.log(ele)
                                                    }}>
                                                        {studentColumn.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {value}
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
                                                            {column.format && (column.id === 'name' || typeof value === 'number') ? column.format(value) : value}
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
