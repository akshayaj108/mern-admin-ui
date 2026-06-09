import { Card, Col, Form, Input, Row, Space } from "antd";

const RestaurantForm = () => {
  return (
    <Row>
      <Col span={24}>
        <Space orientation="vertical" size="large">
            <Card title="Restaurant Info">
                <Row gutter={20}>
                    <Col span={24}>
                        <Form.Item
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Restaurant name is required"
                            },
                            {
                                min: 3,
                                message: "Enter restaurant name at least min 3 character"
                            }
                        ]}
                        name="name"
                        >
                            <Input placeholder="Restaurant name" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                     <Form.Item
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: "Restaurant address is required"
                            },
                        ]}
                        name="address"
                        >
                            <Input placeholder="Restaurant address" />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default RestaurantForm;
