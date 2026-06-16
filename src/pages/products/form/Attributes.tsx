import type { Category } from "../types"
import { Card, Col, Form, InputNumber, Radio, Row, Switch, Typography } from "antd";

const Attributes = ({ category}: { category: Category | undefined}) => {
  if (!category) {
    return null;
  }
  return (
     <Card
          title={<Typography.Text>Attributes</Typography.Text>}
          variant="borderless"
        >
        {category.attributes?.map((attribute) =>{
          return (
            <div key={attribute.name}>
              {attribute.widgetType === 'radio' ?(
                <Form.Item label={attribute.name} name={['attributes', attribute.name]} initialValue={attribute.defaultValue} rules={[
                  {required: true}
                ]}>
                  <Radio.Group>
                    {attribute.availableOptions.map((option) =>{
                      return (
                        <Radio.Button value={option} key={option}>
                        {option}
                      </Radio.Button>
                      )
                    })}
                  </Radio.Group>
                </Form.Item>
              ): attribute?.widgetType === 'switch'?(
                 <Row>
                  <Col>
                    <Form.Item name={['attributes', attribute.name]} label={attribute.name} valuePropName="checked">
                      <Switch checkedChildren="Yes" unCheckedChildren="No" />
                    </Form.Item>
                  </Col>
                 </Row>
              ): null}
            </div>
          )
        })}
        </Card>
  )
}

export default Attributes