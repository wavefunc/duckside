// ----- 冠樺 ----- //

import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'
import axios from 'axios';

function BackendDatatype() {
   const [account, setAccount] = useState([
      {
         acc_id: '',
         acc_email: '',
         acc_avatar: '',
         acc_setting: '',
         acc_donate: ''
      }
   ]);

   const [asset, setAsset] = useState([{ ast_securities: '' }]);

   useEffect(() => {
      axios.get('http://localhost:5000/account/all').then((rows) => {
         setAccount(rows.data);
      });
      axios.get('http://localhost:5000/asset/all').then((rows) => {
         setAsset(rows.data);
      });
   }, [])

   return (
      <div>
         <h3>資料庫取得的資料型態</h3>
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
                  <td>date</td>
                  <td>{typeof (account[0].acc_donate)}</td>
                  <td>{account[0].acc_donate}</td>
               </tr>
               <tr>
                  <td>ast_securities</td>
                  <td>decimal(15,2)</td>
                  <td>{typeof (asset[0].ast_securities)}</td>
                  <td>{asset[0].ast_securities}</td>
               </tr>
            </tbody>
         </Table>
      </div>
   );
}

export default BackendDatatype;