import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            // position: 'top' as const,
        },
        // title: {
        //     display: true,
        //     text: 'Chart.js Line Chart',
        // },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Current Month',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(31, 120, 180)',
            backgroundColor: 'rgba(31, 120, 180, 0.5)',
        },
        {
            fill: true,
            label: 'Last Month',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(166, 206, 227)',
            backgroundColor: 'rgba(166, 206, 227, 0.5)',
        },
    ],
};
export default function ClawbackChart() {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="new_leads_chart p-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="chart_title">
                                        {/* <h2>Clawback</h2> */}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="chart_select_button">
                                        <select className="form-control" name="" id="">
                                            <option>Monthly</option>
                                            <option>Weekly</option>
                                            <option>Yearly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <div className="chart my-4">
                                        <Line options={options} data={data} />
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
