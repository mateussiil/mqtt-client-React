import React from 'react';
import { Card, Form, Input, Row, Col, Button } from 'antd';
import { useContext } from 'react';
import { QosOption, topicContrador } from '../Hook/Mqtt';

export const ControllerComponent = () => {
  const { publish, record } = useContext(QosOption)

  const [form] = Form.useForm();

  const payload = {
    kd: 0,
    kp: 0,
    ki: 0
  }

  const onFinish = (values) => {
    publish({ topic: topicContrador, payload: JSON.stringify(values) })
  };

  return (
    <Card
      title="Controlador"
    >
      <Form
        layout="vertical"
        name="basic"
        form={form}
        initialValues={payload}
        onFinish={onFinish}
      >
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item
              label="kd"
              name="kd"
            >
              <Input type='number' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="kp"
              name="kp"
            >
              <Input type='number' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="ki"
              name="ki"
            >
              <Input type='number' />
            </Form.Item>
          </Col>
          <Col span={8} offset={16} style={{ textAlign: 'right' }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
