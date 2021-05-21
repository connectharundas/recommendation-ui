import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";
import { Layout, Breadcrumb } from 'antd';
import { Form, Input, Button } from 'antd';

import Recommendations from './component/recommendations';

const { Content } = Layout;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

function Home() {
    const [isLoading, setLoading] = useState(false);
    const [items, setItems] = useState(0);
    const[results, setTotalResults] = useState(0);

    const onFinish = (values) => {
        console.log('Success:', values);

        const url = "http://localhost:3001/List";
        fetch(url)
            .then(resp => {
                if (!resp.ok) {
                    throw Error("Could not fetch data for that resource");
                }
                return resp.json()
            })
            .then(data => {
                setItems(data.recommendedItems.items);
                setTotalResults(data.totalResults);
                setLoading(true)
            })
            .catch(err => {
                setLoading(false);
                console.log(err.message);
            })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {isLoading ? <Recommendations totalItems={items} totalResults={results} /> :
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item label="Limit" name="limit" rules={[{ required: true, message: 'Please input your limit!' }]}>
                            <Input name="limit" id="limit" />
                        </Form.Item>
                        <Form.Item label="Offset" name="offset" rules={[{ required: true, message: 'Please input your offset!' }]}>
                            <Input name="offset" id="offset" />
                        </Form.Item>
                        <Form.Item label="Age Group" name="agegroup" rules={[{ required: true, message: 'Please input your age group!' }]}>
                            <Input name="agegroup" id="agegroup" />
                        </Form.Item>
                        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please input your gender!' }]}>
                            <Input name="gender" id="gender" />
                        </Form.Item>
                        <Form.Item label="Fashion Type" name="fashiontype" rules={[{ required: true, message: 'Please input your fashiontype!' }]}>
                            <Input name="fashiontype" id="fashiontype" />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                        </Button>
                        </Form.Item>
                    </Form>
                }
            </div>
        </Content >
    );
}

export default Home;