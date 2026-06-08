import { Card, Col, Input, Row } from "antd";
import FormItem from "antd/es/form/FormItem";

const UserForm = () => {
  return (
    <Row>
      <Col span={24}>
        <Card title="Basic Info">
          <Row gutter={20}>
            <Col span={12}>
              <FormItem label="First name" name="name">
                <Input placeholder="First name" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="First name" name="name">
                <Input placeholder="First name" />
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default UserForm;
