import { Card, Col, Input, Row, Select, Space, Form } from "antd";
import useGetTenants from "../../restaurants/hooks/useGetTenant";
import type { Tenant } from "../../../types";

const UserForm = ({isEditing}: { isEditing: boolean}) => {
  const selectedRole = Form.useWatch('role') 
   const { data: allRestaurnants } = useGetTenants({
    currentPage: "1",
    perPage: "500"
  });
  return (
    <Row>
      <Col span={24}>
      <Space orientation="vertical" size="large">
          <Card title="Basic Info">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="First name" name="firstName" 
                rules={[
                  {
                    required: true,
                    message: "First name is required"
                  }
                ]}>
                <Input size="large" placeholder="John" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last name" name="lastName"
                  rules={[
                  {
                    required: true,
                    message: "Last name is required"
                  }
                ]}>
                <Input size="large" placeholder="Roy" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Email" name="email"
                rules={[
                  {
                    required: true,
                    message: "Email is required"
                  },
                  {
                    type: "email",
                    message: "Email is not valid"
                  }
                ]}>
                <Input size="large" placeholder="john.d@gmail.com" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        {!isEditing&&(
          <Card title="Security Info">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="Password" name="pass"
               rules={[
                  {
                    required: true,
                    message: "Password is required"
                  },
                  {
                    min: 4,
                    message: "Password must be at least 4 characters"
                  }
                ]}
              >
                <Input.Password size="large" placeholder="***" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Confirm password" name="confirmPass"
              dependencies={["pass"]}
               rules={[
                  {
                    required: true,
                    message: "Please confirm your password"
                  },
                  ({getFieldValue}) =>({
                    validator(_next, value){
                      if(!value || getFieldValue("pass") === value){
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Password do not match")
                      );
                    }
                  })
                ]}
              >
                <Input.Password size="large" placeholder="***" />
              </Form.Item>
            </Col>
       
          </Row>
        </Card>
        )}
        <Card title="Role Info">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="Role" name="role"
               rules={[
                  {
                    required: true,
                    message: "Role is required"
                  },
                ]}
              >
                <Select
                // defaultValue="lucy"
                allowClear
                size="large"
                onChange={() => {}}
                placeholder="Select a role"
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "manager", label: "Manager" },
                  { value: "customer", label: "Customer" },
                ]}
              />
              </Form.Item>
            </Col>
            {selectedRole === 'manager' &&(
              <Col span={12}>
              <Form.Item label="Restaurants" name="tenantId">
                <Select
                // defaultValue="lucy"
                allowClear
                size="large"
                
                onChange={() => {}}
                placeholder="Select a restaurants"
                options={allRestaurnants?.data?.map((resturant: Tenant) =>({
                  value: Number(resturant.id),
                  label: resturant.name
                }))}
              />
              </Form.Item>
            </Col>
            )}
          </Row>
        </Card>
      </Space>
      </Col>
    </Row>
  );
};

export default UserForm;
