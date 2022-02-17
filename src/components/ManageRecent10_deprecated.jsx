// ----- 人豪 ----- //
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

function ManageRecentTxn(props) {
    const [data, setData] = useState([
        { acc_name: 'fake John', acc_email: 'john@example.com' },
        { acc_name: 'fake Mike', acc_email: 'mike@example.com' }
    ]);

    useEffect(() => {
        let didCancel = false;
        axios(props.url, props.dataToServer).then((res) => {
            if (!didCancel) {
            setData(res.data);
            }
        });
        return () => {didCancel = true}; 
    }, []);

    return (
        <Grid
            columns={Object.keys(data[0])}
            data={data.slice(-10,)}
            search={true}
            sort={true}
            pagination={{
                enabled: false,
                limit: 10
            }}
            style={{
                th: {
                    'border-top': '1px solid #e2e2e2',
                  },
            }}
        />
    );
}
export default ManageRecentTxn;