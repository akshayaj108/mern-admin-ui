import { Button, Card, Col, Input, Row, Select } from "antd";
import { PlusOutlined } from '@ant-design/icons';

const UsersFilter = () => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col>
          <Row style={{ gap: 12}}>
            <Col>
              <Input.Search placeholder="Search" />
            </Col>
            <Col>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                //   onChange={handleChange}
                placeholder="Select a role"
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "manager", label: "Manager" },
                  { value: "customer", label: "Customer" },
                ]}
              />
            </Col>
            <Col>
            <Select
                defaultValue="Active"
                style={{ width: 120 }}
                //   onChange={handleChange}
                placeholder="Select status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "ban", label: "Banned" }
                ]}
              />
            </Col>
          </Row>
        </Col>
        <Col>
            <Button type="primary" icon={<PlusOutlined />}>Add User</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UsersFilter;
