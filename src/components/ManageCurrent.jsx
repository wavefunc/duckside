/* ***人豪***
 * 1. 從父元件接收 url [, dataToServer] 以axios抓取data呈現在表格
 * 2. 如沒收到url, 則以props.data作為data
 * 3. 如沒收到url, 且沒收到data或data.length=0, 則return null
 * 4. 如有收到row=10, 則只呈現前10筆資料（db給日期降冪, 即是最新10筆）
 * 5. 如沒收到col用來對應鍵名及欄名, 將使用原資料鍵名為欄名
 * 
 ********* */

import { Grid } from 'gridjs-react';
import { Card, CardDeck } from 'react-bootstrap';
import "gridjs/dist/theme/mermaid.min.css";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function MyCurrentPosition({ url, dataToServer, row, col = null, ...props }) {
    const [data, setData] = useState([]);
    console.log(`MyCurrentPosition: data*${data.length}`);

    useEffect(() => {
        let beingMounted = true;

        console.log('MyCurrentPosition useEffect:');
        if (url) {
            console.log('MyCurrentPosition useEffect req (post)');
            axios.post(url, dataToServer).then((res) => {
                if (beingMounted) {
                    setData(res.data);
                }
            });
        } else {
            setData(props.data);
        }
        return () => { beingMounted = false };
    }, [url, dataToServer.dateQuery, dataToServer.dateQuery, props.refreshState, props.data]);
    return (
        data && data.length ? (
            <Grid
                columns={col}
                data={row ? data.slice(0, row) : data}
                sort={true}
                style={{
                    table: {
                        'width': '96%',
                        'border-top': '1px solid #e2e2e2',
                    },
                }}
                resizable={true}
                className={props.className ? { ...props.className } : {}}
            />) : null
    );
}

export const MyCardDeck = () => {
    const [cardInfo, setData] = useState([]);
    console.log(cardInfo);

    useEffect(() => {
        setData([
            { title: '總資產', value: 1206000, weight: 1 },
            { title: '現金', value: 453000, weight: 0.376 },
            { title: '證券', value: 750000, weight: 0.622 },
            { title: '期權', value: 50000, weight: 0.042 },
            { title: '其他資產', value: 100000, weight: 0.008 },
            { title: '資券調整', value: -7000, weight: -0.006 },
            { title: '其他調整', value: 50000, weight: -0.042 },
        ])
    }, []);

    const renderCard = (card, index) => {
        return (
            <Card key={index} className="p-0">
                <Card.Header style={{backgroundColor: `hsl(50, 88%, ${-card.weight*40+95}%)`}} className="m-0"></Card.Header>
                <Card.Body>
                    <Card.Title as='h6' className="">
                        {`${card.title} ${(Math.round(card.weight * 10000) / 100.0 + "%")}`}
                    </Card.Title>
                    <Card.Text>
                        {`${card.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} `}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    };

    return <CardDeck className="row">{cardInfo.map(renderCard)}</CardDeck>;
};

export default MyCurrentPosition;

