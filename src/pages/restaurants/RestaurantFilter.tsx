import { Card, Col, Form, Input, Row } from "antd";

type FilterProps = {
  children: React.ReactNode;
}
const RestaurantFilter = ({children}: FilterProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={12}>
            <Form.Item name="q">
              <Input.Search allowClear placeholder="Search"  />
            </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col>
            {children}
        </Col>
      </Row>
    </Card>
  );
};

export default RestaurantFilter;
