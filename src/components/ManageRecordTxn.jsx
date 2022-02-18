// ----- 人豪 ----- //
import { useEffect, useState } from 'react';
import { useField, Formik, Form } from 'formik';
import axios from 'axios';
import { MyTextInput, MySelect} from './MyFormComponent.jsx';

/*
<input type="text" list="data" onChange={this._onChange} />

  <datalist id="data">
    {this.state.data.map((item, key) =>
      <option key={key} value={item.displayValue} />
    )}
  </datalist>
*/

function ManageRecordTxn(props) {
    console.log('function ManageRecordTxn');

    return (
        <>
            <h1>Subscribe!</h1>
            <Formik
                initialValues={{
                    txn_date: (new Date()).toISOString().split('T')[0],
                    sec_str: "",
                    txn_round: 1,
                    txn_position: "",
                    txn_price: 600,
                    txn_amount: 1000,
                    txn_note: "",
                }}
                validate={
                    (values) => {
                        const errors = {};
                        if (!values.sec_str) {
                            errors.sec_str = "證券代號及名稱不可空白";
                        }
                        if (!values.txn_price) {
                            errors.txn_price = "價格不可空白";
                        }
                        if (!values.txn_amount) {
                            errors.txn_amount = "數量不可空白";
                        }
                        return errors;
                    }
                }
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form>
                    <MyTextInput
                        label="股票代號及名稱"
                        name="sec_str"
                        type="text"
                        placeholder="2330 台積電"
                    />
                    <MyTextInput
                        label="股票代號及名稱"
                        name="sec_str"
                        type="text"
                        placeholder="2330 台積電"
                    />
                    <MyTextInput
                        label="摘要"
                        name="txn_note"
                        type="text"
                        placeholder="隔壁老王說的?"
                    />
                    <MySelect label="類型" name="txn_position">
                        <option value="">依交易部位性質選擇</option>
                        <option value="建倉">建倉</option>
                        <option value="加碼">加碼</option>
                        <option value="減碼">減碼</option>
                        <option value="停利">停利</option>
                        <option value="停損">停損</option>
                    </MySelect>
                    <button type="submit" className="btn btn-warning">送出</button>
                </Form>
            </Formik>
        </>
    );
};
export default ManageRecordTxn;