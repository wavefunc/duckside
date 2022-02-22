/* ***人豪***
 * 1. 從父元件接收url及id, 以axios抓取資料存在fetchData後呈現在表格
 * 2. 如果沒收到接收url及id, 可直接接受data, 呈現在表格中
 * 3. 如果收到row, 例如10, 就只呈現前10筆資料（db給降冪, 即是最新10筆）
 * 4. 如果fetchData為空陣列(請求失敗或資料還沒回來), 或父元件未給props, 則呈現data預設值[{'資料加載中':'請稍候'}]
 * 
 ********* */

import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import "gridjs/dist/theme/mermaid.min.css";
import React, { useLayoutEffect, useState, useRef } from 'react';
import axios from 'axios';

function ManageRecent({ data = [], url, acc, row, col = null, edit, del }) {
    console.log(`ManageRecent: data*${data.length}`);
    const [fetchData, setFetchData] = useState([]);
    useLayoutEffect(() => {
        let beingMounted = true;
        console.log('ManageRecent useEffect');
        if (url) {
            console.log('ManageRecent useEffect req');
            if (acc) {
                axios(url, { data: { acc_email: acc, method: 'post' } }).then((res) => {
                    if (beingMounted) {
                        setFetchData(res.data);
                    }
                });
            } else {
                axios(url).then((res) => {
                    if (beingMounted) {
                        setFetchData(res.data);
                    }
                });
            }
        }
        return () => { beingMounted = false };
    }, [url, acc]);
    useLayoutEffect(() => {
        if (edit) {
            let apndBtnCol = {
                name: '修改',
                formatter: (cell, row) => {
                    return h('button', {
                        className: 'btn btn-outline-warning',
                        onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
                    }, '編輯');
                }
            }

        }
    }, [edit, del])

    // 判斷是否有資料: data && data.length
    return (
        data && data.length ? (
            <Grid
                columns={col}
                data={row ?
                    (fetchData.length ? fetchData.slice(0, row) : data.slice(0, row)) :
                    (fetchData.length ? fetchData : data)
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
                    table: {
                        'width': '100%',
                        'border-top': '1px solid #e2e2e2',
                    },
                }}
            />) : null
    );
}
// export default ManageRecent;
export default React.memo(ManageRecent);