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

// 折線圖基本設定 (資產變動圖使用)
const options = {
    maintainAspectRatio: false,
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
                    let currentYmdArr = v.split('-');
                    if (i === 0) {
                        return `${currentYmdArr[0]}/${currentYmdArr[1]}/${currentYmdArr[2]}`;
                    } else {
                        // return `${currentYmdArr[1]}/${currentYmdArr[2]}`
                        let currentDate = new Date(arr[i].value);
                        let previousDate = new Date(arr[i - 1].value);
                        return currentDate.getFullYear() !== previousDate.getFullYear() ? `${currentYmdArr[0]}/${currentYmdArr[1]}/${currentYmdArr[2]}` : `${currentYmdArr[1]}/${currentYmdArr[2]}`;
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
                },
            }
        },
        title: {
            display: false,
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
// 圓餅圖基本設定
const options2 = {
    // maintainAspectRatio: false,
    responsive: true,
    layout: {
        padding: 12
    },
    interaction: {
        intersect: false,
        mode: 'index',
    },
    plugins: {
        legend: {
            align: 'center',
            labels: {
                font: {
                    size: 18
                },
                textAlign:'left'
            }
        },
        title: {
            display: false,
        },
        // tooltip: {
        //     callbacks: {
        //         title: (i) => {
        //             let tempIdx = i[0].label.lastIndexOf(',')
        //             return i[0].label.slice(0, tempIdx);
        //         },
                //         label: (i) => {
                //             return [i.dataset.label, i.raw];
                //         }
            // }
        // }
    }
};


// 假資料: 圓餅圖
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

export function MyChartLine({ data, x, y, yLabels, ...props }) {
    options.parsing = {
        xAxisKey: x,
    };

    const labels = data ? data.map((v) => v[x]) : undefined;
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
        <Line options={options} {...props} data={{
            labels: labels,
            datasets: datasets
        }} />
    );
}

export function MyChartPie({ url, dataToServer, ...props }) {
    return <Pie data={data2} options={options2} />;
}