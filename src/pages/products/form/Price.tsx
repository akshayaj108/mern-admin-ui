import { Card, Col, Form, InputNumber, Row, Space, Typography } from "antd";
import type { Category } from "../types";

const PriceConfiguration = ({
  category,
}: {
  category: Category | undefined;
}) => {
  if (!category) {
    return null;
  }
  return (
    <Card
      title={<Typography.Text>Product Price</Typography.Text>}
      variant="borderless"
    >
      {Object.entries(category.priceConfiguration).map(
        ([configurationKey, configurationValue]) => (
          <Row
            key={configurationKey}
            gutter={[16, 16]}
            align="middle"
            style={{ marginBottom: 24 }}
          >
            <Col span={6}>
              <Typography.Text
                strong
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {configurationKey} ({configurationValue.priceType})
              </Typography.Text>
            </Col>

            <Col span={20}>
              <Row gutter={[16, 16]}>
                {configurationValue.availableOptions.map((option) => (
                  <Col span={8} key={option}>
                    <Form.Item
                      label={option}
                      name={[
                        "priceConfiguration",
                        JSON.stringify({
                          configurationKey,
                          priceType: configurationValue.priceType,
                        }),
                        option,
                      ]}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        min={0}
                        addonAfter="₹"
                      />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        ),
      )}
    </Card>
  );
};

export default PriceConfiguration;
