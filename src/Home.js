import React, { useState } from 'react';
import "antd/dist/antd.css";
import { Layout, Modal, Card, Spin, Form, Button, Select } from 'antd';
import './index.css';

const { Content } = Layout;
const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


function Home() {

    const [endAge, setEndAge] = useState();
    const [startAge, setStartAge] = useState();
    const [gender, setGender] = useState();
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false)

    const onFinish = () => {
        setLoading(true)
        let url = null;

        const urlObject = new URL(`/recommendations/userattribute/trending`, window.location.href);
        urlObject.searchParams.append('agegroup', '{start:' + startAge + ",end:" + endAge + '}');
        urlObject.searchParams.append('gender', gender);

        url = urlObject.toString();

        fetch(url)
            .then(resp => {
                if (!resp.ok) {
                    throw Error("Could not fetch data for that resource");
                }
                return resp.json()
            })
            .then(data => {
                console.log(data)
                setIsModalVisible(true)
                setData(data.recommendedItems.items)
                setLoading(false);
            });
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };

    function handleAgeChange(value) {
        console.log(`selected ${value}`);
        switch (value) {
            case "1":
                setStartAge(0);
                setEndAge(17);
                break;
            case "2":
                setStartAge(18);
                setEndAge(25);
                break;
            case "3":
                setStartAge(26);
                setEndAge(35);
                break;
            case "4":
                setStartAge(36);
                setEndAge(45);
                break;
            case "5":
                setStartAge(46);
                setEndAge(100);
                break;
            default:
                break;
        }
    }

    function handleGenderChange(value) {
        console.log(`selected ${value}`);
        switch (value) {
            case "1":
                setGender("M")
                break;
            case "2":
                setGender("F")
                break;
            default:
                break;
        }
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Content className="content-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
            {isLoading ? <Spin tip="Loading..." style={{ marginLeft: '44%', marginTop: '13%' }}></Spin> :
                <Form
                    {...layout}
                    style={{ marginTop: '10%', marginLeft: '10%' }}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Age"
                        className="form-group"
                        name="age"
                        rules={[{ required: true, message: 'Please input your Age!' }]}
                    >
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select the Age"
                            optionFilterProp="children"
                            onChange={handleAgeChange}
                        >
                            <Option value="1">Less than 18</Option>
                            <Option value="2">18-25</Option>
                            <Option value="3">26-35</Option>
                            <Option value="4">36-45</Option>
                            <Option value="5">More than 45</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[{ required: true, message: 'Please input your Gender!' }]}
                    >
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select the Gender"
                            optionFilterProp="children"
                            onChange={handleGenderChange}
                        >
                            <Option value="1">Male</Option>
                            <Option value="2">Female</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            }

            <Modal title="Here are your recommendations !!" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p style={{ alignItems: "center" }}>Age:{endAge}</p>
                <p>Gender:{gender === "F" ? "Female" : "Male"}</p>
                <Card bordered={true} style={{ width: 300, marginLeft: '18%' }}>

                    {data.map((data, key) => {
                        return (
                            <span key={key}>
                                <p style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 'bold' }}> {data.values.name} </p>
                            </span>);
                    })}
                </Card>
            </Modal>
        </Content>
    );
}


export default Home;