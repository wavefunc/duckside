import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'
import axios from 'axios';

function MysqlTest() {
   const [account, setAccount] = useState([
      {
         acc_id: '',
         acc_email: '',
         acc_avatar: '',
         acc_setting: '',
         acc_donate: ''
      }
   ]);

   useEffect(() => {
      axios.get('http://localhost:5000/account').then((rows) => {
         setAccount(rows.data);
      });
   }, [])

   return (
      <div>
         <h1>資料庫取得資料範例</h1>
         <Table striped bordered hover>
            <tbody>
               <tr>
                  <th>DB欄位</th>
                  <th>DB資料型態</th>
                  <th>前端取得資料型態</th>
                  <th>內容</th>
               </tr>
               <tr>
                  <td>acc_id</td>
                  <td>int</td>
                  <td>{typeof (account[0].acc_id)}</td>
                  <td>{account[0].acc_id}</td>
               </tr>
               <tr>
                  <td>acc_email</td>
                  <td>varchar</td>
                  <td>{typeof (account[0].acc_email)}</td>
                  <td>{account[0].acc_email}</td>
               </tr>
               <tr>
                  <td>acc_avatar</td>
                  <td>mediumblob</td>
                  <td>{typeof (account[0].acc_avatar)}</td>
                  <td>{JSON.stringify(account[0].acc_avatar).slice(0, 50) + '...'}</td>
               </tr>
               <tr>
                  <td>acc_setting</td>
                  <td>json</td>
                  <td>{typeof (account[0].acc_setting)}</td>
                  <td>{JSON.stringify(account[0].acc_setting)}</td>
               </tr>
               <tr>
                  <td>acc_donate</td>
                  <td>datetime</td>
                  <td>{typeof (account[0].acc_donate)}</td>
                  <td>{account[0].acc_donate}</td>
               </tr>
            </tbody>
         </Table>
      </div>
   );
}

export default MysqlTest;