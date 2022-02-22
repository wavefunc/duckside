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

function ManageCurrentPosition({ data, col=null, url, id }) {
    console.log(`ManageCurrentPosition: data*${data.length}`);
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
    // 判斷是否有資料: data && data.length
    return (
        <Grid
            columns={data && data.length? col:null}
            data={fetchData.length? fetchData : data}
            sort={true}
            style={{
                table: {
                    'width': '100%',
                    'border-top': '1px solid #e2e2e2', 
                },
            }}
            resizable={true}
        />
    );
}
export default ManageCurrentPosition;