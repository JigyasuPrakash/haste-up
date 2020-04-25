import React, { Component } from 'react'
import { Grid, Paper } from '@material-ui/core';
import { Bar, Doughnut } from 'react-chartjs-2';

class Charts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chartData: {
                labels: ['Boston', 'Worcester', 'SpringField', 'Lowell', 'Cambridge', 'New Bedford'],
                datasets: [{
                    label: 'Population',
                    data: [617594, 181045, 153060, 106519, 105162, 95072],
                    backgroundColor: [
                        'rgba(255,99,132,0.6)',
                        'rgba(54,162,235,0.6)',
                        'rgba(75,192,192,0.6)',
                        'rgba(153,102,255,0.6)',
                        'rgba(255,159,64,0.6)',
                        'rgba(255,99,132,0.6)'
                    ],
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#fff'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Largest Cities In Massachusetts',
                    fontSize: 25
                },
                legend: {
                    display: true,
                }
            }
        }
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
                padding: '5px'
            }
        };

        return (
            <div style={styles.root}>
                <Grid container justify="space-evenly" direction="row" alignItems="center">
                    <Grid item xs={6} style={styles.box}>
                        <Paper style={styles.paper}>
                            <Doughnut data={this.state.chartData} options={{ maintainAspectRatio: true }} />
                        </Paper>
                    </Grid>

                    <Grid item xs={6} style={styles.box}>
                        <Paper style={styles.paper}>
                            <Bar data={this.state.chartData} options={{ maintainAspectRatio: true }} />
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container justify="space-evenly" direction="row" alignItems="center">
                    <Grid item xs={6} style={styles.box}>
                        <Paper style={styles.paper}>
                            <Doughnut data={this.state.chartData} options={{ maintainAspectRatio: true }} />
                        </Paper>
                    </Grid>

                    <Grid item xs={6} style={styles.box}>
                        <Paper style={styles.paper}>
                            <Bar data={this.state.chartData} options={{ maintainAspectRatio: true }} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Charts;