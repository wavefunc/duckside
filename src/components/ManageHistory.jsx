// ----- 人豪 ----- //
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

function ManageHistory(props) {
    console.log(props.row);
    const [data, setData] = useState([
        { acc_name: 'fake John', acc_email: 'john@example.com' },
        { acc_name: 'fake Mike', acc_email: 'mike@example.com' }
    ]);

    useEffect(() => {
        let didCancel = false;
        axios(props.url, props.acc_id).then((res) => {
            if (!didCancel) {
                setData(res.data);
            }
        });
        return () => { didCancel = true };
    }, []);

    return (
        <Grid
            columns={Object.keys(data[0])}
            data={props.row ? data.slice(0,props.row) :data}
            search={true}
            sort={true}
            pagination={
                props.row ? false: {
                    enabled : true,
                    limit : 50
                }
            }
            style={{
                th: {
                    'border-top': '1px solid #e2e2e2',
                },
            }}
        />
    );
}

export default ManageHistory;