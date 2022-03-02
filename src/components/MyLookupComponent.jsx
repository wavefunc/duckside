import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeSeriesScale,
    Filler,
} from 'chart.js';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState, useRef } from 'react';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeSeriesScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

const options = {
};

const urlGetDatalist = 'http://localhost:5000/securities/datalist/';
let controller = new AbortController();
const getDatalist = (inputStr, callback) => {
    if (inputStr.length < 2 || inputStr.length > 6) {
        return
    } else {
        controller.abort();
        controller = new AbortController();
        axios(urlGetDatalist + inputStr, { signal: controller.signal }).then((result) => {
            let datalist = result.data.map((v) => {
                return `${v['sec_id']} ${v['sec_name']}`
            });
            callback(datalist);
        })
    }
}

export function MyCandleLookup(props) {
    const [showCandle, setShowCandle] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const inputSecStr = useRef(null);
    const handleSubmit = () => { console.log("candle") };
    return (
        <>
            <Form className="form-inline">
                <InputGroup className="d-flex flex-column">
                    <Form.Control
                        {...props}
                        ref={inputSecStr} id="sec_str" name="sec_str"
                        list='lookupCandle'
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
                    <datalist id='lookupCandle'>
                        {datalist.map((v, i) =>
                            <option key={i} value={v} />
                        )}
                    </datalist>
                </InputGroup>
                <Button
                    className="ml-1" size="sm"
                    onClick={handleSubmit} variant="warning" >
                    <Search />
                </Button>
            </Form>
            <Modal show={showCandle} onHide={() => { setShowCandle(false) }} centered={true} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{inputSecStr}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>

    )
}
