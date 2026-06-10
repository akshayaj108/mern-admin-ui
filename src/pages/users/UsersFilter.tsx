import { Card, Col, Form, Input, Row, Select } from "antd";

type FilterProps = {
  children: React.ReactNode;
}
const UsersFilter = ({ children }: FilterProps) => {
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
            
              <Col>
              <Form.Item name="role">
              <Select
                // defaultValue="lucy"
                allowClear
                placeholder="Select a role"
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "manager", label: "Manager" },
                  { value: "customer", label: "Customer" },
                ]}
              />
                   </Form.Item>
            </Col>
       
            {/* <Col>
            <Select
                // defaultValue="Active"
                allowClear
                onChange={(selected) => onFilterChange("statusFilter", selected)}
                placeholder="Select status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "ban", label: "Banned" }
                ]}
              />
            </Col> */}
          </Row>
        </Col>
        <Col>
            {children}
        </Col>
      </Row>
    </Card>
  );
};

export default UsersFilter;
