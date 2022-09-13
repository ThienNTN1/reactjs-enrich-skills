import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Modal,
  Col,
  Row,
  Table,
  Space,
} from "antd";
import "./Home.css";

import { useStore, actions } from "../../store";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const Home = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary"    
            onClick={() => handleToggleUpdate(record)} 
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => showModalConfirm(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const [state, dispatch] = useStore();
  const [form] = Form.useForm();
  const [isModalVisibleConfirm, setIsModalVisibleConfirm] = useState(false);
  let [indexMember, setIndexMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (values) => {
    console.log('formData', values)
    const member = { ...values, key: "id" + new Date().getTime() };
    dispatch(actions.addMember(member));
    form.resetFields();
    setIsEditing(false);
  };

  // handle delete member
  const showModalConfirm = (recordKey) => {
    setIndexMember(recordKey);
    setIsModalVisibleConfirm(true);
  };

  const handleOkConfirm = () => {
    setIsModalVisibleConfirm(false);
    dispatch(actions.deleteMember(indexMember));
  };

  const handleCancelConfirm = () => {
    setIsModalVisibleConfirm(false);
  };

  // handle update member
  const handleToggleUpdate = (member) => {
    console.log("updating...", member);
    setIsEditing(true);

    form.setFieldsValue({
      key: member.key,
      name: member.name,
      username: member.username,
      email: member.email,
      gender: member.gender,
      age: member.age,
      address: member.address,
    });
    
  };
  const handleUpdateMember = (values) => {
    console.log('updated value', values);
    const updatedMember = { ...values};
    console.log("member...", updatedMember);
    dispatch(actions.updateMember(updatedMember));
    form.resetFields();
    setIsEditing(false);
  };

  return (
    <div className="homePage">
      <div className="container">
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form
              name="basic"
              {...layout}
              onFinish={!isEditing ? handleSubmit : handleUpdateMember}
              autoComplete="off"
              form={form}
              validateMessages={validateMessages}
            >
              <Row>
                <Col span={12}>
                  <Form.Item 
                    label="Name" 
                    name='name'
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      name="name"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      name="username"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                      },
                    ]}
                  >
                    <Input 
                      name="email"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='gender'
                    label="Gender"
                  >
                    <Select
                      name='gender'
                      allowClear
                      placeholder="Select your gender"
                    >
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item 
                    name="age"
                    label="Age" 
                    style={{ width: "100%" }}
                    rules={[
                      {
                        type: 'number',
                        min: 0,
                        max: 99,
                      },
                    ]}
                  >
                    <InputNumber
                      name="age"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item 
                    name="address"
                    label="Address"
                  >
                    <Input
                      name="address"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="row">
                <Form.Item className="wrapperButton">
                  <Button
                    className="btnCenter"
                    type="primary"
                    htmlType="submit"
                  >
                    {!isEditing ? "Add" : "Save"}
                  </Button>
                </Form.Item>
              </Row>
              <Form.Item
                name="key"
                hidden 
                label="key"
              >
                <Input 
                  type="hidden" 
                  name="key" 
                  />
              </Form.Item>
            </Form>

            {/* table */}
            <Table columns={columns} dataSource={state.members} />

            {/* modal confirm delete */}
            <Modal
              title="Xác nhận"
              visible={isModalVisibleConfirm}
              onOk={handleOkConfirm}
              onCancel={handleCancelConfirm}
            >
              <p>Do you want to delete this user?</p>
            </Modal>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
