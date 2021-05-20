import React, { useState, forwardRef } from 'react';
import "antd/dist/antd.css";
import { Layout, Modal, Card, Spin, Result, Form, Button, Select } from 'antd';

function Model({isVisible}) {
  console.log('is model visible: ', isVisible)
  let [sd, setVisible] = useState(isVisible);
  console.log("sd", sd)

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal title="Here are you recommendations !!" visible={sd} onOk={handleOk} onCancel={handleCancel}>
      {/* <p style={{ alignItems: "center" }}>Age:{age}</p>
      <p>Gender:{gen === "F" ? "Female" : "Male"}</p>
      <Card bordered={true} style={{ width: 300, marginLeft: '18%' }}>

        {items.map((data, key) => {
          return (
            <span key={key}>
              <p style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 'bold' }}> {data.values.name} </p>
            </span>);
        })}
      </Card> */}
    </Modal>
  );
}

export default Model;