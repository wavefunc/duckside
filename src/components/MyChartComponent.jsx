/*
選色參考
`hsl(40, 96%, ${-card.weight * 50 + 95}%)`
`borderColor: `hsl(30, 55%, 50%)`,
`backgroundColor: `hsl(${40 + i * 5}, 95%, ${50 + i * 8}%)`,

*/

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

// 圖表色塊主色
const mainColor = [
    'rgb(250, 198, 43, 1)',
    'rgb(28, 169, 202, 0.9)',
    'rgb(203, 58, 144, 0.9)',
 ];

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
                textAlign: 'left'
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

export function MyChartLine({ data, x, y, yLabels, ...props }) {
    options.parsing = {
        xAxisKey: x,
    };
    console.log(data);
    const labels = data && data.length > 0 ? data.map((v) => v[x]) : undefined;
    const datasets = typeof y === "string" ? [
        {
            label: yLabels,
            data: data,
            borderColor: 'hsl(35, 100%, 50%)',
            backgroundColor: 'hsl(60, 95%, 60%)',
            fill: true,
            parsing: {
                yAxisKey: y,
            }
        },
    ] : y.map((v, i) => {
        return ({
            label: yLabels[i],
            data: data,
            backgroundColor: (i < 3 ?
                mainColor[i] : `rgb(112,112,112,${0.75 - 0.25 * (i-3)})`
            ),
            borderColor: 'rgb(112,112,112,1)',
            borderWidth: 1.5,
            fill: true,
            parsing: {
                yAxisKey: v,
            }
        })
    });

    return (
        <Line options={options} {...props} data={{
            labels: labels,
            datasets: datasets
        }} />
    );
}

export function MyChartPie({ url, dataToServer, data, ...props }) {
    const demo = {
        labels: ['台積電', '中鋼', '鴻海'],
        datasets: [
            {
                data: [1190000, 768000, 105000],
                backgroundColor: [
                    'hsl(30, 88%, 66%)',
                    'hsl(40, 88%, 71%)',
                    'hsl(50, 88%, 76%)',
                ],
                borderColor: 'hsl(15, 35%, 60%)',
                borderWidth: 2,
            },
        ],
    };
    try {
        return <Pie data={data.labels.length ? data : demo} options={options2} {...props} />;
    } catch {
        console.log('發生未預期的錯誤, MyChartPie使用展示資料')
        return <Pie data={demo} options={options2} {...props} />;
    }
}