// ----- 人豪 ----- //
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

function ManageRecent({ url, acc_id, row }) {
    console.log('function ManageRecent');
    const [data, setData] = useState([
        { acc_name: 'fake John', acc_email: 'john@example.com' },
        { acc_name: 'fake Mike', acc_email: 'mike@example.com' }
    ]);

    useEffect(() => {
        console.log('req ManageRecent');
        let didCancel = false;
        axios(url, acc_id).then((res) => {
            if (!didCancel) {
                setData(res.data);
            }
        });
        return () => { didCancel = true };
    }, []);

    return (
        <Grid
            columns={Object.keys(data[0])}
            data={row ? data.slice(0,row) :data}
            search={
                row ? false: true
            }
            sort={true}
            pagination={
                row ? false: {
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

export default ManageRecent;