import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from "antd";

type FilterProps = {
  children: React.ReactNode;
};
const ProductFilter = ({ children }: FilterProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item name="q">
                <Input.Search size="medium" allowClear placeholder="Search" />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item name="categoryId">
                <Select
                  // defaultValue="lucy"
                  size="medium"
                  allowClear
                  placeholder="Category"
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "manager", label: "Manager" },
                    { value: "customer", label: "Customer" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col>
            <Form.Item name="categoryId">
            <Select
                // defaultValue="Active"
                size="medium"
                allowClear
                placeholder="Tenant"
                options={[
                  { value: "active", label: "Active" },
                  { value: "ban", label: "Banned" }
                ]}
              />
              </Form.Item>
            </Col>
            <Col>
            <Form.Item name="isPublish">
                <Space>
                  <Switch defaultChecked />
                  <Typography.Text>Show only publish</Typography.Text>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  );
};

export default ProductFilter;
