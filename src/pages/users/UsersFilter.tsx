import { Card, Col, Input, Row, Select } from "antd";

type FilterProps = {
  onFilterChange: (filterName: string, filterValue: string) => void;
  children: React.ReactNode;
}
const UsersFilter = ({onFilterChange, children}: FilterProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={12}>
              <Input.Search allowClear placeholder="Search" onChange={(e) => onFilterChange("userSearchFilter", e.target.value)} />
            </Col>
            <Col>
              <Select
                // defaultValue="lucy"
                allowClear
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
            {children}
        </Col>
      </Row>
    </Card>
  );
};

export default UsersFilter;
