// ----- 人豪 ----- //
import { Grid } from 'gridjs-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ManageHistoryTxn(props) {
    const [data, setData] = useState([
        { acc_name: 'fake John', acc_email: 'john@example.com' },
        { acc_name: 'fake Mike', acc_email: 'mike@example.com' }
    ]);

    let url = 'http://localhost:5000/member/list';
    let dataToServer = '';

    useEffect(() => {
        axios(url, dataToServer).then((res) => {
            setData(res.data);
            console.log(data);
            console.log(typeof data);
        });
    }, []);

    return (
        <Grid
            data={data}
            search={true}
            pagination={{
                enabled: true,
                limit: 1,
            }}
        />
    );
}

export default ManageHistoryTxn;