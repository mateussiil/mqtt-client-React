import React from 'react';
import { Card, Form, Input, Row, Col, Button } from 'antd';
import { QosOption, topicHdesejada } from '../Hook/Mqtt';
import { useContext } from 'react';

export const NivelController = () => {
  const { publish } = useContext(QosOption)

  const [form] = Form.useForm();

  const payload = {
    [topicHdesejada]: '0',
  }

  const onFinish = (values) => {
    publish({ topic: topicHdesejada, payload: JSON.stringify(values) })
  };

  return (
    <Card
      title="Nivel"
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
              label="Nivel"
              name={topicHdesejada}
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
