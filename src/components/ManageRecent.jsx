/* ***人豪***
 * 1. 從父元件接收url及id, 以axios抓取資料存在fetchData後呈現在表格
 * 2. 如果沒收到接收url及id, 可直接接受data, 呈現在表格中
 * 3. 如果收到row, 例如10, 就只呈現前10筆資料（db給降冪, 即是最新10筆）
 * 4. 如果fetchData為空陣列(請求失敗或資料還沒回來), 或父元件未給props, 則呈現data預設值[{'資料加載中':'請稍候'}]
 * 
 ********* */

import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function ManageRecent({ data = [], url, id = "", row }) {
    console.log('ManageRecent');
    const [fetchData, setFetchData] = useState([]);
    const refData = useRef(data);
    useEffect(() => {
        let beingMounted = true;

        console.log('ManageRecent useEffect:');
        if (url) {
            console.log('ManageRecent useEffect req');
            axios(url, id).then((res) => {
                if (beingMounted) {
                    setFetchData(res.data);
                }
            });
        }

        return () => { beingMounted = false };
    }, [refData, url, id, row]);

    return (
        <Grid
            columns={[
                { id: 'txn_date', name: '日期', formatter: (v) => v.split('T')[0] },
                { id: 'sec_id', name: '代號' },
                { id: 'txn_round', name: '編號' },
                { id: 'txn_position', name: '類型' },
                { id: 'txn_price', name: '價格' },
                { id: 'txn_amount', name: '數量' },
                { id: 'txn_note', name: '摘要' }
            ]}
            data={row ?
                (fetchData != "" ? fetchData.slice(0, row) : data.slice(0, row)) :
                (fetchData != "" ? fetchData : data)
            }
            search={
                row ? false : true
            }
            sort={true}
            pagination={
                row ? false : {
                    enabled: true,
                    limit: 50
                }
            }
            resizable={true}
            style={{
                th: {
                    'border-top': '1px solid #e2e2e2',
                },
            }
            }
        />
    );
}

export default ManageRecent;