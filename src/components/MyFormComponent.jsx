/********
 * 注意: formik相關元件需用<Formik>包起來
 * 
*********/

import { useField } from 'formik';
import { Button, Form, InputGroup, Toast } from 'react-bootstrap';
import { CheckSquare } from 'react-bootstrap-icons';
import dt from "date-and-time";
import React, { useEffect, useRef, useState } from 'react';
import Transition from 'react-transition-group/Transition'
import * as xlsx from "xlsx"
import { Grid } from 'gridjs-react';

// Formik
export const MyInput = ({ label, flex, maxWidth, hidden, helptext, children, list, getList, setList, ...props }) => {
    const [field, meta] = useField(props);
    let didChanged = useRef(false);
    useEffect(() => {
        // 透過Formik的field監控本input值的變動,
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
export const MyUpload = ({ label, flex, maxWidth, hidden, helptext, placeholder, setFieldValue, preview, fileType, mutiple, ...props }) => {
    const [field, meta] = useField(props);
    const handleFileChange = (e) => {
        if (mutiple) {
            // 保留給未來多檔上傳功能使用
        } else {
            setFieldValue(field.name, e.target.files[0]);
            console.log(e.target.files[0]);
        }
    }
    let didChanged = useRef(false);
    useEffect(() => {
        console.log('MyUpload useEffect (field.value changed)');

        // 如input值改變時有一些其他的動作要執行, 也可以放這邊

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
                    name={props.name}
                    onChange={handleFileChange}
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
export const MyFormikObserver = ({ onChange, value }) => {
    // 此元件用來監控Formik表單的輸入值, 在其值有變動時執行自訂的函式(以新輸入值作為參數)
    // MyFormikObserver的value屬性: 利用父元件的 Formik.values (物件) 傳入想要監控的值
    // MyFormikObserver的onChange屬性: 從根父元件傳入想要在該值改變時執行的函式
    // ex. <Formik>(props)=>{  <Form> <MyFormikObserver value={props.values} onChange={...}/> </Form> }<Formik>
    useEffect(() => {
        onChange(value);
    }, [Object.values(value).join(', ')]);
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
export const MyFilePreview = ({ file, flex, maxWidth, minHeight, maxHeight, placeholder }) => {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(undefined);
    const to_json = (workbook) => {
        var result = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
        return result;
        // return JSON.stringify(result, 2, 2);
    };

    useEffect(() => {
        if (!file) { return; }
        setLoading(true);

        let reader = new FileReader();
        if (file.type.search('image') > -1) {
            reader.onloadend = () => {
                let data = reader.result;
                setPreview(data);
                setLoading(false);
            };
            reader.readAsDataURL(file);
        }
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === "application/vnd.ms-excel") {
            reader.onloadend = () => {
                let data = reader.result;
                let workbook = xlsx.read(data);
                setPreview(to_json(workbook));
                setLoading(false);
            }
            reader.readAsArrayBuffer(file);
        }
    }, [file]);

    if (file) {
        return (
            <>
                {loading && (<p className="small m-2">讀取中...</p>)}
                {!loading && preview && file.type.search('image') > -1 && (
                    <div className={"d-inline-flex rounded-sm ml-2 mr-2 mb-2"}
                        style={{
                            flex: flex, maxWidth: maxWidth,
                            minHeight: minHeight, maxHeight: maxHeight, overflowY: 'auto', overflowX: 'hidden',
                            border: '1px solid #CED4DA', font: '15px Arial'
                        }}
                    >
                        <img src={preview}
                            alt={file.name}
                            className="img-thumbnail m-2"
                            height={200}
                            width={200} />
                    </div>
                )}
                {!loading && preview && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === "application/vnd.ms-excel") && (
                    // <p style={{whiteSpace:'pre'}}>{preview[0]}</p>
                    <Grid
                        columns={preview[0]}
                        data={[...preview].slice(1,)}
                        className={{
                            container: "d-inline-flex rounded-sm ml-2 mr-2 mb-2",
                            table: 'table table-sm'
                        }}
                        style={{
                            container: {
                                flex: flex, maxWidth: maxWidth,
                                minHeight: minHeight, maxHeight: maxHeight, overflowY: 'auto', overflowX: 'hidden',
                                font: '15px Arial'
                            },
                            table: { 'border-top': '1px solid #e2e2e2', },
                        }}
                    />
                )}
            </>
        );
    } else {
        return (
            <div className="d-inline-flex rounded-sm ml-2 mr-2 mb-2 p-2"
                style={{ flex: flex, maxWidth: maxWidth, border: '1px solid #CED4DA', minHeight: minHeight }}>
                <p className="small ml-1">{placeholder || '預覽'}</p>
            </div>
        )
    }
}
export const MyFileExample = ({ col, variant, value, className }) => {
    const dataHeader = col.map((obj)=>obj['title']);
    console.log(dataHeader);
    let handleDownload = () => {
        console.log('MyFileExample ready')

    }
    return (
        <Button
            variant={variant}
            onClick={handleDownload}
            className={className}
        >
            {value}
        </Button>
    )
}