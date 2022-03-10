/* ***人豪***
 * 1. 從父元件接收 url [, dataToServer] 以axios抓取data呈現在表格
 * 2. 如沒收到url, 則以props.data作為data
 * 3. 如沒收到url, 且沒收到data或data.length=0, 則return null
 * 4. 如有收到row=10, 則只呈現前10筆資料（db給日期降冪, 即是最新10筆）
 * 5. 如沒收到col用來對應鍵名及欄名, 將使用原資料鍵名為欄名
 * 
 ********* */

import { Grid, _ } from 'gridjs-react';
import { h } from 'gridjs';
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
                        console.log(`ManageRecent useEffect:  (axios post) data*${res.data.length}`);
                        setData(res.data);
                    }
                })
            } else {
                // 如沒收到dataToServer, 預設以get方法請求
                axios(url).then((res) => {
                    if (beingMounted) {
                        console.log(`ManageRecent useEffect:  (axios get) data*${res.data.length}`);
                        setData(res.data);
                    }
                });
            }
        } else {
            setData(props.data);
        }
        return () => { beingMounted = false }
    }, [url, dataToServerRef, props.refreshState, props.data]);
    useEffect(() => {
        let myCol = props.col.map(x => x);
        if (props.edit || props.delete) {
            myCol.push({
                id: 'action',
                name: h('b', { style: { 'float': 'left', } }, '修改'), width: '8%',
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
    try {
        return (data && data.length ?
            <Grid
                columns={col}
                data={row ? data.slice(0, row) : data}
                search={row ? false : true}
                sort={true}
                pagination={row ? false : { enabled: true, limit: 50 }}
                resizable={true}
                style={{
                    container: { 'margin-top': '5px' },
                    table: { 'width': '100%', 'border-top': '1px solid #e2e2e2', },
                    th: { 'backgroundColor': '#e7ebee', 'font-size': '18px', 'fontWeight': 'bold', 'padding-left': '10px' },
                    td: { 'font-size': '15px', 'text-align': 'left', 'padding-left': '10px' }
                }}
            /> : (
                <Grid
                    columns={[{ "id": "plan_id", "name": "asd_id", "hidden": true, "sort": { "enabled": true }, "resizable": true }, { "id": "plan_date", "name": "日期", "width": "102px", "sort": { "enabled": true }, "resizable": true }, { "id": "sec_id", "name": "代號", "width": "122px", "sort": { "enabled": true }, "resizable": true }, { "id": "sec_name", "name": "名稱", "width": "153px", "sort": { "enabled": true }, "resizable": true }, { "id": "plan_strategy", "name": "類型", "hidden": true, "sort": { "enabled": true }, "resizable": true }, { "id": "plan_param1", "name": "參數", "hidden": true, "sort": { "enabled": true }, "resizable": true }, { "id": "plan_param2", "name": "參數", "hidden": true, "sort": { "enabled": true }, "resizable": true }, { "id": "plan_anchor", "name": "參考", "width": "122px", "sort": { "enabled": true }, "resizable": true }, { "id": "plan_stoploss", "name": "停損", "width": "122px", "sort": { "enabled": true }, "resizable": true }, { "id": "plan_target", "name": "目標", "width": "122px", "sort": { "enabled": true }, "resizable": true }, { "id": "marketPrice", "name": "現價", "width": "122px", "sort": { "enabled": true }, "resizable": true }, { "id": "plan_note", "name": "筆記", "width": "153px", "sort": { "enabled": true }, "resizable": true }]}
                    data={[]}
                    search={false}
                    sort={true}
                    pagination={false}
                    resizable={true}
                    style={{
                        container: { 'margin-top': '5px' },
                        table: { 'width': '100%', 'border-top': '1px solid #e2e2e2', },
                        th: { 'backgroundColor': '#e7ebee', 'font-size': '18px', 'fontWeight': 'bold', 'padding-left': '10px' },
                        td: { 'font-size': '15px', 'text-align': 'left', 'padding-left': '10px' }
                    }}
                />
            )
        )
    } catch {
        console.log('發生未預期的錯誤, ManageRecent無法辨認資料');
        return (
            <Grid
                columns={[{ "id": "plan_id", "name": "asd_id", "hidden": true, "sort": { "enabled": true }, "resizable": true }, { "id": "plan_date", "name": "日期", "width": "102px", "sort": { "enabled": true }, "resizable": true }, { "id": "sec_id", "name": "代號", "width": "122px", "sort": { "enabled": true }, "resizable": true }, { "id": "sec_name", "name": "名稱", "width": "153px", "sort": { "enabled": true }, "resizable": true }, { "id": "plan_strategy", "name": "類型", "hidden": true, "sort": { "enabled": true }, "resizable": true }, { "id": "plan_param1", "name": "參數", "hidden": true, "sort": { "enabled": true }, "resizable": true }, { "id": "plan_param2", "name": "參數", "hidden": true, "sort": { "enabled": true }, "resizable": true }, { "id": "plan_anchor", "name": "參考", "width": "122px", "sort": { "enabled": true }, "resizable": true }, { "id": "plan_stoploss", "name": "停損", "width": "122px", "sort": { "enabled": true }, "resizable": true }, { "id": "plan_target", "name": "目標", "width": "122px", "sort": { "enabled": true }, "resizable": true }, { "id": "marketPrice", "name": "現價", "width": "122px", "sort": { "enabled": true }, "resizable": true }, { "id": "plan_note", "name": "筆記", "width": "153px", "sort": { "enabled": true }, "resizable": true }]}
                data={[{ "plan_id": 84, "plan_date": "4/3", "sec_id": "2412", "plan_anchor": 120, "plan_stoploss": 100, "plan_target": 150, "plan_note": "", "acc_id": 4, "rank": 4, "sec_name": "中華電", "sec_market": "上市", "marketPrice": 123 }]}
                search={false}
                sort={true}
                pagination={false}
                resizable={true}
                style={{
                    container: { 'margin-top': '5px' },
                    table: { 'width': '100%', 'border-top': '1px solid #e2e2e2', },
                    th: { 'backgroundColor': '#e7ebee', 'font-size': '18px', 'fontWeight': 'bold', 'padding-left': '10px' },
                    td: { 'font-size': '15px', 'text-align': 'left', 'padding-left': '10px' }
                }}
            />
        )
    }
}
export default ManageRecent;