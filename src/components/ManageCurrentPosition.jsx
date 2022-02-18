// ----- 人豪 ----- //

import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

function ManageCurrentPosition({url, acc_id}) {
    console.log('function ManageCurrentPosition');
    const [data, setData] = useState([
        { acc_name: 'fake John', acc_email: 'john@example.com' },
        { acc_name: 'fake Mike', acc_email: 'mike@example.com' }
    ]);

    useEffect(() => {
        console.log('req ManageCurrentPosition');
        let didCancel = false;
        axios(url, acc_id).then((res) => {
            setData(res.data);
        });
        return () => { didCancel = true };
    }, []);

    return (
        <Grid
            columns={Object.keys(data[0])}
            data={data}
            sort={true}
            style={{
                th: {
                    'border-top': '1px solid #e2e2e2',
                  },
            }}
        />
    );
}
export default ManageCurrentPosition;