import { Button, Card, Col, Input, Row, Select } from "antd";
import { PlusOutlined } from '@ant-design/icons';

type UserFilterProps = {
  onFilterChange: (filterName: string, filterValue: string) => void;
}
const UsersFilter = ({onFilterChange}: UserFilterProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col>
          <Row style={{ gap: 12}}>
            <Col>
              <Input.Search allowClear placeholder="Search" onChange={(e) => onFilterChange("userSearchFilter", e.target.value)} />
            </Col>
            <Col>
              <Select
                // defaultValue="lucy"
                allowClear
                style={{ width: 120 }}
                onChange={(selected) => onFilterChange("roleFilter", selected)}
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
                // defaultValue="Active"
                allowClear
                style={{ width: 120 }}
                onChange={(selected) => onFilterChange("statusFilter", selected)}
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
