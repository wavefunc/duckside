/* ***人豪***
 * 1. 從父元件接收 url [, dataToServer] 以axios抓取data呈現在表格
 * 2. 如沒收到url, 則以props.data作為data
 * 3. 如沒收到url, 且沒收到data或data.length=0, 則return null
 * 4. 如有收到row=10, 則只呈現前10筆資料（db給日期降冪, 即是最新10筆）
 * 5. 如沒收到col用來對應鍵名及欄名, 將使用原資料鍵名為欄名
 * 
 ********* */

import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import "gridjs/dist/theme/mermaid.min.css";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function ManageRecent({ url, dataToServer, row, col = undefined, ... props }) {
    const [data, setData] = useState([]);
    const dataToServerRef = useRef(dataToServer);

    console.log(`ManageRecent: data*${data.length}`);
    useEffect(() => {
        let beingMounted = true;
        console.log('ManageRecent useEffect');
        if (url) {
            // 如有收到url屬性, 則以axios請求資料來呈現在表格
            if (dataToServer) {
                // 如有收到dataToServer(鍵值對), 以post方法請求, 否則預設以get方法請求
                console.log('ManageRecent useEffect req (post)');
                axios.post(url, dataToServer).then((res) => {
                    if (beingMounted) {
                        console.log(res.data);
                        setData(res.data);
                    }
                });
            } else {
                // 如沒收到dataToServer, 預設以get方法請求
                console.log('ManageRecent useEffect req (get)');
                axios(url).then((res) => {
                    if (beingMounted) {
                        console.log(res.data);
                        setData(res.data);
                    }
                });
            }
        } else {
            console.log(`ManageRecent useEffect use props.data: ${props.data}`)
            setData(props.data);
        }
        return () => { beingMounted = false };
    }, [url, dataToServerRef, props.refreshState, props.data]);
    useEffect(() => {
        if (props.editHandler) {
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
        if (props.deleteHandler) {
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
    }, [])

    return (
        // 判斷是否有資料: data && data.length
        data && data.length ? (
            <Grid
                columns={col}
                data={row ? data.slice(0, row) : data}
                search={row ? false : true}
                sort={true}
                pagination={row ? false : { enabled: true, limit: 50 }}
                resizable={true}
                style={{table: { 'width': '100%', 'border-top': '1px solid #e2e2e2', }}}
            />) : null
    );
}
export default ManageRecent;