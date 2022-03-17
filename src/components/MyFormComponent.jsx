/********
 * 注意: formik相關元件需用<Formik>包起來
 * 
*********/

import { useField } from 'formik';
import { Form, InputGroup, Toast } from 'react-bootstrap';
import { CheckSquare } from 'react-bootstrap-icons';
import dt from "date-and-time";
import React, { useEffect, useRef } from 'react';
import Transition from 'react-transition-group/Transition'

// Formik
export const MyInput = ({ label, flex, maxWidth, hidden, helptext, children, list, getList, setList, ...props }) => {
    const [field, meta] = useField(props);
    let didChanged = useRef(false);
    useEffect(() => {
        // 透過Formik的field來監控本input值的變動,
        // input如具有初始值, 有datalist, 且有驗證一定要從axios來的datalist中選取
        // 在剛重置表單的情況下, 有初始值, 但沒有datalist, 導致不修改input內容觸發請求將無法通過驗證
        if (list && didChanged.current) {
            // 排除第一次render不觸發
            console.log('MyInput useEffect getlist then setlist(callback)');
            getList(field.value, setList);
            return
        }
        didChanged.current = true;
    }, [field.value]);
    return hidden ? null : (
        <>
            <Form.Label
                className="text-nowrap d-inline-block ml-2 mr-2 mb-2"
                style={{ flex: flex, maxWidth: maxWidth || '250px' }}
            >
                {label}
                <InputGroup hasValidation>
                    <Form.Control
                        as={children ? 'select' : 'input'}
                        {...field} {...props}
                        list={list ? `list${props.id || props.name}` : undefined}
                        aria-describedby={`prep${props.id || props.name} apnd${props.id || props.name} helptext${props.id || props.name}`}
                        isInvalid={meta.touched && meta.error}
                    >
                        {children ? typeof children[0] === 'string' ?
                            children.map((v, i) => <option key={i} value={v}>{v}</option>) :
                            children.map((v) => <option key={v.key} value={v.value}>{v.value}</option>) : null
                        }
                    </Form.Control>
                    {props.prepend ? (
                        <InputGroup.Prepend>
                            <InputGroup.Text id={`prep${props.id || props.name}`}>{props.prepend}</InputGroup.Text>
                        </InputGroup.Prepend>
                    ) : null}
                    {props.append ? (
                        <InputGroup.Append>
                            <InputGroup.Text id={`apnd${props.id || props.name}`}>{props.append}</InputGroup.Text>
                        </InputGroup.Append>
                    ) : null}
                    {meta.touched && meta.error ? (
                        <Form.Control.Feedback type="invalid" tooltip={true}>
                            {meta.error}
                        </Form.Control.Feedback>) : null}
                    {helptext ? <Form.Text id={`helptext${props.id || props.name}`} muted>
                        {helptext}
                    </Form.Text> : null}
                </InputGroup>
            </Form.Label>
            {
                list ? (
                    <datalist id={`list${props.id || props.name}`}>
                        {list.map((v, i) =>
                            <option key={i} value={v} />
                        )}
                    </datalist>) : null
            }
        </>
    )
};
export const MyButton = ({ label, flex, maxWidth, type, className, onClick, ...props }) => {
    return (
        <div className="d-inline-block ml-2 mr-2 mb-2"
            style={{ flex: flex, maxWidth: maxWidth || '250px' }}
            {...props}
        >
            {label === undefined ? <>&nbsp;</> : label}
            <div>
                <button type={type} className={className} onClick={onClick}>
                    {props.value}
                </button>
            </div>
        </div>
    )
}
export const MyUpload = ({ label, flex, maxWidth, hidden, helptext, placeholder, setFieldValue, setPreview, ...props }) => {
    const [field, meta] = useField(props);
    let didChanged = useRef(false);
    useEffect(() => {
        console.log('MyUpload useEffect (field.value changed)');
        // 透過Formik的field來監控本input值的變動,
        // 在選取檔案改變時, 觸發父元件傳入的函式(例如設定預覽內容)
        if (setPreview && didChanged.current) {
            console.log('setPreview');
            console.log(field.value);
            // setPreview(field.value);
            return
        }
        didChanged.current = true;
    }, [field.value]);

    return hidden ? null : (
        <div className="d-inline-block ml-2 mr-2 mb-2"
            style={{ flex: flex, maxWidth: maxWidth }}
        >
            {placeholder && label}
            <Form.File custom
                bsCustomPrefix='custom-file'
            >
                <Form.File.Input
                    {...field}
                    onChange={(e) => {console.log(e.target.files[0])}}
                />
                <Form.File.Label
                    data-browse="選擇檔案"
                    bsCustomPrefix="custom-file-label col-form-label-sm d-inline-block mt-1"
                >
                    {placeholder || label}
                </Form.File.Label>
                {meta.touched && meta.error ? (
                    <Form.Control.Feedback type="invalid" tooltip={true}>
                        {meta.error}
                    </Form.Control.Feedback>) : null}
                {helptext ? <Form.Text id={`helptext${props.id}`} muted>
                    {helptext}
                </Form.Text> : null}
            </Form.File>
        </div>
    )
};
export const MyFormikObserver = (props) => {
    // <Formik>(props)=>{  <Form> 使用於此處  </Form> }<Formik>
    // 將想要監控的值傳入MyFormikObserver的value屬性
    // 將最上層元件想在該輸入值變動時做的函式傳入onchange
    useEffect(() => {
        props.onChange(props.value);
    }, [Object.values(props.value).join(', ')]);
    return null
}


// Toast
export const MyOkToast = (props) => {
    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'absolute',
                right: 0
            }}
            className="mr-3 alert"
        >
            <Toast
                show={props.show} onClose={props.closeToast} delay={1000} autohide
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    top: 0,
                    right: 0,
                    height: 36,
                    width: 200,
                }}
            >
                <Toast.Header>
                    <strong className="mr-auto">
                        <CheckSquare className='mr-1 mb-1 text-success' />
                        修改成功!
                    </strong>
                    <small>{dt.format(new Date(), "M/D H:m")}</small>
                </Toast.Header>
            </Toast>
        </div>
    )
}

const duration = 500;
const defaultStyleSlideUp = {
    position: "absolute",
    top: '50px',
    right: '0',
    zIndex: '0',
};
const transitionStylesSlideUp = {
    entered: {
        transform: 'translateY(-55px)',
        transition: `transform ${duration}ms ease-in-out`,
    },
    exiting: {
        transform: 'translateY(55px)',
        transition: `transform ${duration}ms ease-in-out`
    },
    exited: {
        top: '50px',
    }
};

export const MyOkToastSlideUp = ({ show, ...props }) => {
    return (
        <Transition in={show} timeout={duration} unmountOnExit >
            {(state) => (
                <div className={props.className}
                    style={{
                        width: props.width,
                        ...defaultStyleSlideUp,
                        ...transitionStylesSlideUp[state]
                    }}
                >
                    <Toast
                        onClose={props.closeToast} autohide={true} delay={5000}
                        className="bg-success"
                    >
                        <Toast.Body style={{ fontSize: "18px", padding: '8px' }}>
                            <strong className='mr-2'>
                                <CheckSquare className='mr-2 mb-1' />
                                修改成功!
                            </strong>
                            <small>
                                {dt.format(new Date(), "M/D HH:mm")}
                            </small>
                        </Toast.Body>
                    </Toast>
                </div>
            )}
        </Transition>
    )
}

// 純元件
export const MySelectPlain = ({ children, label, ...props }) => {
    if (label) {
        return (
            <Form.Group className={props.inline ? "d-inline-block ml-1 mr-2" : "ml-1 mb-2"}>
                <Form.Label>{label}</Form.Label>
                <InputGroup>
                    {props.prepend ? (
                        <InputGroup.Prepend>
                            <InputGroup.Text id={`prependId${props.id}`}>{props.prepend}</InputGroup.Text>
                        </InputGroup.Prepend>
                    ) : null}
                    <Form.Control
                        as='select'
                        {...props}
                        aria-describedby={`prependId${props.id}`}
                    >
                        {typeof children[0] === 'string' ?
                            children.map((v, i) => <option key={i} value={v}>{v}</option>) :
                            children.map((v) => <option key={v.key} value={v.value}>{v.value}</option>)
                        }
                    </Form.Control>
                </InputGroup>
            </Form.Group>
        );
    } else {
        return (
            <InputGroup>
                {props.prepend ? (
                    <InputGroup.Prepend>
                        <InputGroup.Text id={`prependId${props.id}`}>{props.prepend}</InputGroup.Text>
                    </InputGroup.Prepend>
                ) : null}
                <Form.Control
                    as='select' {...props}
                    aria-describedby={`prependId${props.id}`}
                >
                    {typeof children[0] === 'string' ?
                        children.map((v, i) => <option key={i} value={v}>{v}</option>) :
                        children.map((v) => <option key={v.key} value={v.value}>{v.value}</option>)
                    }
                </Form.Control>
            </InputGroup>
        );
    };
}
export const MyInputPlain = ({ label, list, ...props }) => {
    if (label) {
        return (
            <Form.Group className={props.inline ? "d-inline-block ml-1 mr-2" : "ml-1 mb-2"}>
                <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
                <InputGroup className="d-flex flex-column">
                    <Form.Control
                        {...props}
                        list={`list${props.id}`}
                        aria-describedby={`prep${props.id} apnd${props.id} helptext${props.id}`}
                    />
                    {props.prepend ? (
                        <InputGroup.Prepend>
                            <InputGroup.Text id={`prep${props.id}`}>{props.prepend}</InputGroup.Text>
                        </InputGroup.Prepend>
                    ) : null}
                    {props.append ? (
                        <InputGroup.Append>
                            <InputGroup.Text id={`apnd${props.id}`}>{props.append}</InputGroup.Text>
                        </InputGroup.Append>
                    ) : null}
                    {props.helptext ? <Form.Text id={`helptext${props.id}`} muted>
                        {props.helptext}
                    </Form.Text> : null}
                </InputGroup>
                {list ? (
                    <datalist id={`list${props.id}`}>
                        {list.map((v, i) =>
                            <option key={i} value={v} />
                        )}
                    </datalist>) : null}
            </Form.Group>
        );
    } else {
        return (
            <InputGroup className="d-flex flex-column">
                <Form.Control
                    {...props}
                    list={`list${props.id}`}
                    aria-describedby={`prep${props.id} apnd${props.id} helptext${props.id}`}
                />
                {props.prepend ? (
                    <InputGroup.Prepend>
                        <InputGroup.Text id={`prep${props.id}`}>{props.prepend}</InputGroup.Text>
                    </InputGroup.Prepend>
                ) : null}
                {props.append ? (
                    <InputGroup.Append>
                        <InputGroup.Text id={`apnd${props.id}`}>{props.append}</InputGroup.Text>
                    </InputGroup.Append>
                ) : null}
                {props.helptext ? <Form.Text id={`helptext${props.id}`} muted>
                    {props.helptext}
                </Form.Text> : null}
                {list ? (
                    <datalist id={`list${props.id}`}>
                        {list.map((v, i) =>
                            <option key={i} value={v} />
                        )}
                    </datalist>) : null}
            </InputGroup>
        )
    }
};

/***********



export const MyCheckbox = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export const MyInputAppendSubmit = ({label, ... props}) => {
    const [field, meta] = useField(props);
    return (
    <InputGroup className="ml-1 mb-2">
        <FormControl
            {...field} {...props}
            placeholder={label}
            aria-label={label}
            aria-describedby="basic-addon2"
        />
        <InputGroup.Append>

        </InputGroup.Append>
    </InputGroup>
    );
}


**********/
