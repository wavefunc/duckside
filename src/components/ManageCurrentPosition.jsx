/* ***人豪***
 * 1. 從父元件接收data呈現在表格中
 * 2. 如果沒收到data, 就接受 url, acc_id 自己來axios
 * 3. 收到的props改變時, 重新執行1跟2
 * 
 ********* */

import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function ManageCurrentPosition({ data = [{ '資料加載中': '請稍候' }], url, id }) {
    console.log('ManageCurrentPosition');
    const [fetchData, setFetchData] = useState([]);
    const refData = useRef(data);
    useEffect(() => {
        let beingMounted = true;

        console.log('ManageCurrentPosition useEffect:');
        if (url) {
            console.log('ManageCurrentPosition useEffect req');
            axios(url, id).then((res) => {
                if (beingMounted) {
                    setFetchData(res.data);
                }
            });
        }

        return () => { beingMounted = false };
    }, [url, id, refData]);

    return (
        <Grid
            columns={fetchData != "" ? Object.keys(fetchData[0]) : Object.keys(data[0])}
            data={fetchData != "" ? fetchData : data}
            sort={true}
            style={{
                th: {
                    'border-top': '1px solid #e2e2e2',
                },
            }}
            resizable={true}
        />
    );
}
export default ManageCurrentPosition;