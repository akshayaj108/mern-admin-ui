import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from "antd";
import type { Tenant } from "../../types";
import type { Category } from "./types";

type FilterProps = {
  restaurantList: Tenant[];
  categories: Category[];
  children: React.ReactNode;
};
const ProductFilter = ({ children, categories, restaurantList }: FilterProps) => {
  return (
    <Card>
      <Row justify={"space-between"} align={"middle"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item name="q">
                <Input.Search size="medium" allowClear placeholder="Search" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name="category">
                <Select
                  // defaultValue="lucy"
                  size="medium"
                  allowClear
                  placeholder="Category"
                  options={categories?.map((category) =>({
                  value: category._id,
                  label: category.name
                }))}
                />
              </Form.Item>
            </Col>

            <Col span={6} >
            <Form.Item name="tenant">
            <Select
                // defaultValue="Active"
                size="medium"
                allowClear
                placeholder="Tenant"
                 options={restaurantList?.map((resturant: Tenant) =>({
                  value: resturant.id,
                  label: resturant.name
                }))}
              />
              </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item name="isPublish">
                <Space >
                  <Switch defaultChecked />
                  <Typography.Text>Show publish</Typography.Text>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col style={{ position: "relative", bottom: 6}}>{children}</Col>
      </Row>
    </Card>
  );
};

export default ProductFilter;
