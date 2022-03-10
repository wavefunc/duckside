/* ***人豪***
 * 1. 從父元件接收 url [, dataToServer] 以axios抓取data呈現在表格
 * 2. 如沒收到url, 則以props.data作為data
 * 3. 如沒收到url, 且沒收到data或data.length=0, 則return null
 * 4. 如有收到row=10, 則只呈現前10筆資料（db給日期降冪, 即是最新10筆）
 * 5. 如沒收到col用來對應鍵名及欄名, 將使用原資料鍵名為欄名
 * 
 * 選色
 * `hsl(40, 96%, ${-card.weight * 50 + 95}%)`
 * 
 ********* */

import { Grid } from 'gridjs-react';
import { Card, CardDeck } from 'react-bootstrap';
import "gridjs/dist/theme/mermaid.min.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

function MyCurrentPosition({ url, dataToServer, row, col = null, ...props }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        let beingMounted = true;

        if (url) {
            axios.post(url, dataToServer).then((res) => {
                if (beingMounted) {
                    setData(res.data);
                }
            });
        } else {
            setData(props.data);
        }

        return () => { beingMounted = false };
    }, [url, dataToServer, props.refreshState, props.data]);
    try {
        return (
            data && data.length ? (
                <Grid
                    columns={col}
                    data={row ? data.slice(0, row) : data}
                    sort={true}
                    style={{
                        container: { 'marginTop': '5px' },
                        table: { 'width': '100%', 'border-top': '1px solid #e2e2e2', },
                        th: { 'backgroundColor': '#e7ebee', 'fontWeight': 'bolder' },
                        td: { 'font-size': '18px', 'text-align': 'left', 'padding-left': '10px', 'padding-right': '10px' }
                    }}
                    resizable={true}
                    className={props.className ? { ...props.className } : {}}
                />) : (
                <Grid
                    columns={[
                        { id: 'sec_id', name: '代號' },
                        { id: 'sec_name', name: '名稱' },
                        { id: 'total', name: '庫存數量' },
                    ]}
                    data={[]}
                    sort={true}
                    style={{
                        table: { 'width': '100%', 'border-top': '1px solid #e2e2e2', 'marginTop': '5px' },
                        th: { 'backgroundColor': '#e7ebee', 'fontWeight': 'bolder' },
                        td: { 'font-size': '18px', 'text-align': 'left', 'padding-left': '10px', 'padding-right': '10px' }
                    }}
                    resizable={true}
                    className={{ table: 'table table-sm' }}
                />
            )
        );
    } catch {
        console.log('發生未預期的錯誤, CardDeck使用展示資料');
        return (
            <Grid
                columns={[
                    { id: 'sec_id', name: '代號' },
                    { id: 'sec_name', name: '名稱' },
                    { id: 'total', name: '庫存數量' },
                ]}
                data={[]}
                sort={true}
                style={{
                    table: { 'width': '100%', 'border-top': '1px solid #e2e2e2', 'marginTop': '5px' },
                    th: { 'backgroundColor': '#e7ebee', 'fontWeight': 'bolder' },
                    td: { 'font-size': '18px', 'text-align': 'left', 'padding-left': '10px', 'padding-right': '10px' }
                }}
                resizable={true}
                className={{ table: 'table table-sm' }}
            />
        )
    }
}

export const MyCardDeck = (props) => {
    const data = [
        { title: '總資產', value: 6031814, weight: 1 },
        { title: '現金', value: 3535914, weight: 0.376 },
        { title: '證券', value: 2100900, weight: 0.622 },
        { title: '期權', value: 0, weight: 0.042 },
        { title: '其他資產', value: 200000, weight: 0.008 },
        { title: '資券調整', value: 0, weight: -0.006 },
        { title: '其他調整', value: 195000, weight: -0.042 },
    ];
    const renderCard = (card, index) => {
        return (
            <Card key={index} className="p-0 mt-0">
                <Card.Header style={{ backgroundColor: `hsl(35, 88%, ${-card.weight * 75 + 95}%)` }} className="m-0"></Card.Header>
                <Card.Body>
                    <Card.Title as='h6' className="">
                        {card.title}
                        <br />
                        {Math.round(card.weight * 10000) / 100.0 + "%"}
                    </Card.Title>
                    <Card.Text>
                        {`${card.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} `}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    };
    try {
        return <CardDeck className="row">{props.data && props.data.length ? props.data.map(renderCard) : data.map(renderCard)}</CardDeck>;
    } catch {
        console.log('發生未預期的錯誤, CardDeck使用展示資料')
        return <CardDeck className="row">{data.map(renderCard)}</CardDeck>;
    }
};

export default MyCurrentPosition;

