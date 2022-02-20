import { useField } from 'formik';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useRef } from 'react';


export const MyInput = ({ label, list, getList, ...props }) => {
    const [field, meta] = useField(props);
    let didChanged = useRef(false);
    useEffect(()=>{
        if(list && didChanged.current){
            console.log('MyInput useEffect getlist');
            getList(field.value);
            return
        }
        didChanged.current = true;
    },[field.value]);
    return (
        <Form.Group className={props.inline ? "d-inline-block ml-1 mr-2" : "ml-1 mb-2"}>
            {label ? (
                <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
            ) : null}
            <InputGroup hasValidation className="d-flex flex-column">
                <Form.Control
                    {...field} {...props}
                    list={`list${props.id}`}
                    aria-describedby={`prep${props.id} apnd${props.id}`}
                    isInvalid={meta.touched && meta.error}
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
                {meta.touched && meta.error ? (
                    <Form.Control.Feedback type="invalid">
                        {meta.error}
                    </Form.Control.Feedback>) : null}
            </InputGroup>
            {list ? (
                <datalist id={`list${props.id}`}>
                    {list.map((v, i) =>
                        <option key={i} value={v} />
                    )}
                </datalist>) : null}
        </Form.Group>
    );
};

export const MySelect = ({ children, label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        // <div>
        //     <label htmlFor={props.id || props.name}>{label}</label>
        //     <select {...field} {...props} className="custom-select" />
        //     {meta.touched && meta.error ? (
        //         <div className="error">{meta.error}</div>
        //     ) : null}
        // </div>
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
                    {...field} {...props}
                    aria-describedby={`prependId${props.id}`}
                    isInvalid={meta.touched && meta.error}
                >
                    {children.map((v, i) => <option key={i} value={v}>{v}</option>)}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {meta.error}
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    );
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
