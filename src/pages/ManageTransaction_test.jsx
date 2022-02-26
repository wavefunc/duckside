/* * * * * 人豪 * * * * * 
 * 
 * 備忘:
 * const acc_email = ... 要換成localStorage
 * 
 * * * * * * * * * * * */

import React, { useState } from 'react';
import { Formik, Form } from 'formik';

import axios from 'axios';
// import dt from 'date-and-time';

import { MyInput } from '../components/MyFormComponent';

// const urlPostCreate = 'http://localhost:5000/transaction/create';
const urlGetDatalist = 'http://localhost:5000/securities/datalist/';

function ManageTransaction_test(props) {
  const [datalist, setDatalist] = useState([]);
  let controller = new AbortController();
  const getDatalist = (inputStr) => {
    if (inputStr.length < 2 || inputStr.length > 4) {
      return
    } else {
      controller.abort();
      controller = new AbortController();
      axios(urlGetDatalist + inputStr, { signal: controller.signal }).then((result) => {
        let datalist = result.data.map((v) => {
          return `${v['sec_id']} ${v['sec_name']}`
        });
        setDatalist(datalist);
      })
    }
  }
  return (
    <Formik
      initialValues={{ sec_str: "", }}
      validate={
        (values) => {
          const errors = {};
          if (!values.sec_str) {
            errors.sec_str = "代號及名稱不可空白";
          }
          if (datalist.indexOf(values.sec_str) < 0) {
            errors.sec_str = "查無此股, 請從選項填入";
          }
          return errors;
        }
      }
      onSubmit={(values, actions) => {
        console.log(`value: ${values.sec_str}`);

      }}
    >
      <Form>
        <MyInput
          label="股票代號及名稱"
          name="sec_str"
          id="sec_str"
          type="text"
          placeholder=""
          inline="true"
          list={datalist}
          getList={getDatalist}
        />
      </Form>
    </Formik>
  )
}
export default ManageTransaction_test;