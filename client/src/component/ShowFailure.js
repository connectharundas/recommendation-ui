import React from 'react';
import "antd/dist/antd.css";
import {Result, Button } from 'antd';

function ShowFailure() {
    return (
        <div>
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary">Back Home</Button>}
            />
        </div>
    );
}


export default ShowFailure;