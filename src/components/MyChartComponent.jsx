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
    // 網站識別色
    // 'rgb(255, 159, 64)',
    // 'rgb(75, 192, 192)',
    // 'rgb(255, 205, 86)',
    // 上方為投影用, 下方為網站使用 +35 +70
    'rgba(255, 225, 175)',
    'rgba(175, 225, 225)',
    'rgba(255, 240, 155)',

    // 下方是比較大膽的配色
    // 'rgb(250, 198, 43, 1)',
    // 'rgb(28, 169, 202, 0.9)',
    // 'rgb(203, 58, 144, 0.9)',
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
const optionsPie = {
    // maintainAspectRatio: false,
    responsive: true,
    layout: {
        padding: {
            top: 0,
            right: 12,
            left: 12,
            bottom: 12,
        }
    },
    interaction: {
        intersect: false,
        mode: 'point',
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
        tooltip: {
            position:'average',
            callbacks: {
                label: (context) => {
                    let total = context.chart._metasets[context.datasetIndex].total;
                    let i = context.dataIndex;
                    let currentValue = context.dataset.data[i];
                    let percentage = parseFloat((currentValue / total * 100).toFixed(1));
                    return context.label + ' ' + percentage + '%';
                },
            },
            caretSize: 8,
            bodyFont: { size: 20 },
        }
    }
};

// 圓餅圖展示資料
const demoPie = {
    labels: ['台積電', '中鋼', '鴻海'],
    datasets: [
        {
            data: [1190000, 768000, 105000],
            backgroundColor: mainColor,
            borderColor: 'hsl(15, 35%, 60%)',
            borderWidth: 2,
        },
    ],
};

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
            fill: true,
            parsing: {
                yAxisKey: y,
            },
            // borderColor: 'hsl(35, 100%, 50%)',
            // backgroundColor: 'hsl(60, 88%, 66%)',
            // 上方為投影用配色, 下方為網站配色
            borderColor: 'hsl(35, 100%, 50%)',
            backgroundColor: 'hsl(50, 85%, 88%)',
        },
    ] : y.map((v, i) => {
        return ({
            label: yLabels[i],
            data: data,
            backgroundColor: (i < 3 ?
                mainColor[i] : `rgb(112,112,112,${0.6 - 0.2 * (i - 3)})`
            ),
            borderColor: 'rgb(144,144,144)',
            borderWidth: 1.5,
            fill: 'stack',
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

export function MyChartPie({ url, dataToServer, labels, data, ...props }) {
    const dataPie = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: data.map((v, i) => (
                    i < 3 ? mainColor[i] : `rgb(112,112,112,${0.60 - 0.2 * (i - 3)})`
                )),
                borderColor: 'rgb(112,112,112,1)',
                borderWidth: 0.5,
                // 投影時需上邊界, 網站可以不用
                hoverOffset: 20,
                offset: 0,
            },
        ],
    };
    try {
        return <Pie data={data ? dataPie : demoPie} options={optionsPie} {...props} />;
    } catch {
        console.log('發生未預期的錯誤, MyChartPie使用展示資料')
        return <Pie data={demoPie} options={optionsPie} {...props} />;
    }
}