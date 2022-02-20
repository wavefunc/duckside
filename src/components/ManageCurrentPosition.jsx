/* ***人豪***
 * 1. 從父元件接收props.data呈現在表格中
 * 2. 如果沒收到props.data, 就接受 props.url, props.acc_id 自己來axios
 * 3. 收到的props改變時, 重新執行1跟2
 * 
 ********* */

import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

function ManageCurrentPosition(props) {
    console.log('ManageCurrentPosition');
    const [data, setData] = useState([
        {'表格接收資料中':'請稍候'}
    ]);
    useEffect(() => {
        let beingMounted = true;
        console.log('ManageCurrentPosition useEffect:');
        if (props.data != []) {
            console.log('ManageCurrentPosition useEffect setData');
            setData(props.data);
        } else if (props.url) {
            console.log('ManageCurrentPosition useEffect req');
            axios(props.url, props.acc_id).then((res) => {
                if (beingMounted) {
                    setData(res.data);
                }
            });
        } else { console.log('ManageCurrentPosition useEffect do nothing') }
        return () => { beingMounted = false };
    }, [props]);

    return (
        <Grid
            columns={Object.keys(data[0])}
            data={data}
            sort={true}
            style={{
                th: {
                    'border-top': '1px solid #e2e2e2',
                  },
            }}
        />
    );
}
export default ManageCurrentPosition;