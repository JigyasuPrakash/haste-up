import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';

class Charts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pieChartData: {},
            barData: {},
            optionsPie: {
                title: {
                    display: true,
                    text: "Statewise Data"
                },
                legends: {
                    display: true
                },
                maintainAspectRatio: true
            },
            optionsBar: {
                title: {
                    display: true,
                    text: "Coursewise Data"
                },
                legends: {
                    display: true
                },
                maintainAspectRatio: true
            }
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/getchartdata')
            .then((response) => {
                this.setState({
                    pieChartData: {
                        labels: response.data.labels1,
                        datasets: [{
                            data: response.data.percentage1,
                            backgroundColor: [
                                'rgba(255,99,132,0.6)',
                                'rgba(54,162,235,0.6)',
                                'rgba(75,192,192,0.6)'
                            ],
                            borderWidth: 1,
                            borderColor: '#777',
                            hoverBorderWidth: 3,
                            hoverBorderColor: '#fff'
                        }]
                    },
                    barData: {
                        labels: response.data.labels2,
                        datasets: [{
                            label: '',
                            data: response.data.percentage2,
                            backgroundColor: [
                                'rgba(152,99,210,0.6)',
                                'rgba(152,99,210,0.6)',
                                'rgba(152,99,210,0.6)',
                                'rgba(152,99,210,0.6)',
                                'rgba(152,99,210,0.6)',
                                'rgba(152,99,210,0.6)',
                                'rgba(152,99,210,0.6)',
                                'rgba(152,99,210,0.6)',

                            ],
                            borderWidth: 1,
                            borderColor: '#777',
                            hoverBorderWidth: 3,
                            hoverBorderColor: '#fff'
                        }]
                    }
                })
            })
            .catch((error) => {
                console.error('Somthing went wrong', error)
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

        return (
            <div style={styles.root}>
                <Grid container justify="space-evenly" direction="row" alignItems="center">
                    <Grid item xs={6} style={styles.box}>
                        <Paper style={styles.paper}>
                            <Doughnut data={this.state.pieChartData} options={this.state.optionsPie} onElementsClick={ele => {
                                window.localStorage.setItem('StateName', this.state.barData.labels[ele[0]._index]);
                                window.location.href = "/collegelist"
                            }} />
                        </Paper>
                    </Grid>

                    <Grid item xs={6} style={styles.box}>
                        <Paper style={styles.paper}>
                            <Bar data={this.state.barData} options={this.state.optionsBar} onElementsClick={ele => {
                                window.localStorage.setItem('CourseName', this.state.barData.labels[ele[0]._index]);
                                window.location.href = "/collegelist"
                            }} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Charts;