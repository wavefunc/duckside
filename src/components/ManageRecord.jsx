// ----- 人豪 ----- //
import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';

/*
<input type="text" list="data" onChange={this._onChange} />

  <datalist id="data">
    {this.state.data.map((item, key) =>
      <option key={key} value={item.displayValue} />
    )}
  </datalist>
*/

function ManageRecord(props) {
    const [dataArr, setDataArr] = useState([]);
    const [inputLabels, setInputLabels] = useState([
        '證券代號', '自訂編號', '部位交易類別', '日期', '價格', '數量(股)', '備註'
    ])

    useEffect(() => {
        // 想辦法去觸發同層元件(最近資料及庫存)重新get交易紀錄及庫存現況
    }, [dataArr]);

    const validate = (values) => {
        const errors = {};
        if (!values.sec_str) {
            errors.sec_str = "Name must not be empty.";
        }
        if (!values.txn_price) {
            errors.txn_price = "Name must not be empty.";
        }
        if (!values.txn_amount) {
            errors.txn_amount = "Name must not be empty.";
        }
        return errors;
    };

    return (
        <Formik
            initValues={{
                txn_date: "",
                sec_str: "",
                txn_round: "",
                txn_position: "",
                txn_price: "",
                txn_amount: "",
                txn_note: "",
            }}
            validate={validate}
            onSubmit={(values, { resetForm }) => {
                console.log(values);
                resetForm();
            }}
        >
            {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                    <label htmlFor="sec_str"></label>
                    <Field name="sec_str">
                        {({ field, meta }) => (
                            <input
                                type="text" {...field}
                                className={meta.error ? "invalid" : ""}
                            />
                        )}
                    </Field>
                    <ErrorMessage name="sec_str">
                        {(err) => <p className="error-text">{err}</p>}
                    </ErrorMessage>
                    <button type="submit">Submit</button>
                </Form>
            )
            }
        </Formik >

        /*
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Your Name</label>
            <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={showNameError ? "invalid" : ""}
            />
            {showNameError ? (
                <p className="error-text">{formik.errors.name}</p>
            ) : null}
            <label htmlFor="email">Your E-Mail</label>
            <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={showEmailError ? "invalid" : ""}
            />
            {showEmailError ? (
                <p className="error-text">{formik.errors.email}</p>
            ) : null}
            <button type="submit">Submit</button>
        </form>
        */

    );
};
export default ManageRecord;