import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    TimeSeriesScale,
    Filler,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeSeriesScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

const options = {
    responsive: true,
    scales: {
        x: {
            type: 'timeseries',
            display: 'auto',
            ticks: {
                source: "labels",
                font: {
                    size: 18,
                },
                callback: (v, i, arr) => {
                    console.log(v);
                    let currentYmdArr = v.split('-');
                    if (i == 0) {
                        return `${currentYmdArr[0]}/${currentYmdArr[1]}/${currentYmdArr[2]}`;
                    } else {
                        // return `${currentYmdArr[1]}/${currentYmdArr[2]}`
                            let currentDate = new Date(arr[i].value);
                            let previousDate = new Date(arr[i-1].value);
                            return currentDate.getFullYear() !== previousDate.getFullYear() ? `${currentYmdArr[0]}/${currentYmdArr[1]}/${currentYmdArr[2]}`:`${currentYmdArr[1]}/${currentYmdArr[2]}`;
                    }
                }
            },
            time: {
                unit: 'day',
                align: 'start',
                displayFormats: {
                    day: "yyyy-M-d",
                }
            }
        },
        y: {
            title: {
                display: true,
                text: '元',
            },
            ticks: {
                font: {
                    size: 18,
                }
            },
            stack: 1,
            stackWeight: 3,
            position: 'right',
            beginAtZero: false,
            offset: true,
            stacked: true,
        },
    },
    interaction: {
        intersect: false,
        mode: 'index',
    },
    plugins: {
        legend: {
            align: 'start',
            labels: {
                font: {
                    size: 18
                }
            }
        },
        title: {
            display: true,
        },
        tooltip: {
            callbacks: {
                title: (i) => {
                    let tempIdx = i[0].label.lastIndexOf(',')
                    return i[0].label.slice(0, tempIdx);
                },
                //         label: (i) => {
                //             return [i.dataset.label, i.raw];
                //         }
            }
        }
    }
};
const data2 = {
    labels: ['台積電', '元大台灣50', '富邦台50'],
    datasets: [
        {
            data: [312500, 213000, 40925],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export function MyChartLine({ data, x, y, yLabels }) {
    console.log("--MyChartLine--")
    console.log(typeof y);
    console.log(y);
    options.parsing = {
        xAxisKey: x,
    };

    const labels = data.map((v) => v[x]);
    const datasets = typeof y === "string" ? [
        {
            label: yLabels,
            data: data,
            borderColor: `hsl(50, 88%, 55%)`,
            backgroundColor: `hsl(50, 88%, 95%)`,
            fill: true,
            parsing: {
                yAxisKey: y,
            }
        },
    ] : y.map((v, i) => ({
        label: yLabels[i],
        data: data,
        borderColor: `hsl(45, 88%, 60%)`,
        backgroundColor: `hsl(55, 85%, ${77 + i * 5}%)`,
        fill: true,
        parsing: {
            yAxisKey: v,
        }
    }));

    return (
        <Line options={options} data={{
            labels: labels,
            datasets: datasets
        }} />
    );
}

export function MyChartPie({ url, dataToServer, ...props }) {
    return <Pie options={options} data={data2} />;
}

