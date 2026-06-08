import { Card, Col, Input, Row, Select } from "antd";

type FilterProps = {
  onFilterChange: (filterName: string, filterValue: string) => void;
  children: React.ReactNode;
}
const RestaurantFilter = ({onFilterChange, children}: FilterProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={12}>
              <Input.Search allowClear placeholder="Search" onChange={(e) => onFilterChange("userSearchFilter", e.target.value)} />
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
