/* ***人豪***
 * 1. 從父元件接收 url [, dataToServer] 以axios抓取data呈現在表格
 * 2. 如沒收到url, 則以props.data作為data
 * 3. 如沒收到url, 且沒收到data或data.length=0, 則return null
 * 4. 如有收到row=10, 則只呈現前10筆資料（db給日期降冪, 即是最新10筆）
 * 5. 如沒收到col用來對應鍵名及欄名, 將使用原資料鍵名為欄名
 * 
 ********* */

import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import { useLayoutEffect, useState, useRef } from 'react';
import axios from 'axios';

function ManageCurrentPosition({ url, dataToServer, row, col = null, ...props }) {
    const [data, setData] = useState([]);
    const dataToServerRef = useRef(dataToServer);
    
    console.log(`ManageCurrentPosition: data*${data.length}`);
    useLayoutEffect(() => {
        let beingMounted = true;

        console.log('ManageCurrentPosition useEffect:');
        if (url) {
            console.log('ManageCurrentPosition useEffect req (post)');
            axios.post(url, dataToServer).then((res) => {
                if (beingMounted) {
                    setData(res.data);
                }
            });
        } else {
            setData(props.data);
        }
        return () => { beingMounted = false };
    }, [url, dataToServerRef, props.refreshState, props.data]);
    return (
        data && data.length ? (
        <Grid
            columns={col}
            data={row ? data.slice(0, row) : data}
            sort={true}
            style={{
                table: {
                    'width': '100%',
                    'border-top': '1px solid #e2e2e2',
                },
            }}
            resizable={true}
        />):null
    );
}
export default ManageCurrentPosition;