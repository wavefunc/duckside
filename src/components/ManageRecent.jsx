/* ***人豪***
 * 1. 從父元件接收 url [, dataToServer] 以axios抓取data呈現在表格
 * 2. 如沒收到url, 則以props.data作為data
 * 3. 如沒收到url, 且沒收到data或data.length=0, 則return null
 * 4. 如有收到row=10, 則只呈現前10筆資料（db給日期降冪, 即是最新10筆）
 * 5. 如沒收到col用來對應鍵名及欄名, 將使用原資料鍵名為欄名
 * 
 ********* */

import { Grid, _ } from 'gridjs-react';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

import "gridjs/dist/theme/mermaid.min.css";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function ManageRecent({ url, dataToServer, row, ...props }) {
    const [data, setData] = useState([]);
    const dataToServerRef = useRef(dataToServer);
    const [col, setCol] = useState([]);
    useEffect(() => {
        let beingMounted = true;
        if (url) {
            // 如有收到url屬性, 則以axios請求資料來呈現在表格
            if (dataToServer) {
                // 如有收到dataToServer(鍵值對), 以post方法請求, 否則預設以get方法請求
                axios.post(url, dataToServer).then((res) => {
                    if (beingMounted) {
                        setData(res.data);
                    }
                });
            } else {
                // 如沒收到dataToServer, 預設以get方法請求
                axios(url).then((res) => {
                    if (beingMounted) {
                        setData(res.data);
                    }
                });
            }
        } else {
            setData(props.data);
        }
        return () => { beingMounted = false };
    }, [url, dataToServerRef, props.refreshState, props.data]);
    useEffect(() => {
        let myCol = props.col.map(x => x);
        if (props.edit || props.delete) {
            myCol.push({
                name: '修改',
                formatter: (cell, row) => {
                    return [
                        props.edit ? _(<PencilSquare onClick={() => props.edit(row.cells)} cursor="pointer" className='mr-2' />, "i") : null,
                        props.delete ? _(<Trash onClick={() => props.delete(row.cells)} cursor="pointer" />, "i") : null
                    ]
                }
            });
        };
        setCol(myCol);
    }, []);

    return (data && data.length ?
        <Grid
            columns={col}
            data={row ? data.slice(0, row) : data}
            search={row ? false : true}
            sort={true}
            pagination={row ? false : { enabled: true, limit: 50 }}
            resizable={true}
            style={{
                table: { 'width': '100%', 'border-top': '1px solid #e2e2e2', 'marginTop': '5px' },
                th: { 'backgroundColor': '#e7ebee', 'fontWeight': 'bolder' }
            }}
        />:null
    )
}
export default ManageRecent;