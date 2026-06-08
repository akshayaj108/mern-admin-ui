import { Card, Col, Input, Row, Select, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import useGetTenants from "../../../hooks/api/tenant/useGetTenant";
import type { Tenant } from "../../../types";

const UserForm = () => {
  const { data: allRestaurnants } = useGetTenants();
  return (
    <Row>
      <Col span={24}>
      <Space orientation="vertical" size="large">
          <Card title="Basic Info">
          <Row gutter={20}>
            <Col span={12}>
              <FormItem label="First name" name="firstName" 
                rules={[
                  {
                    required: true,
                    message: "First name is required"
                  }
                ]}>
                <Input size="large" placeholder="John" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Last name" name="lastName"
                  rules={[
                  {
                    required: true,
                    message: "Last name is required"
                  }
                ]}>
                <Input size="large" placeholder="Roy" />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="Email" name="email"
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
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card title="Security Info">
          <Row gutter={20}>
            <Col span={12}>
              <FormItem label="Password" name="pass"
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
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Confirm password" name="confirmPass"
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
              </FormItem>
            </Col>
       
          </Row>
        </Card>
        <Card title="Role Info">
          <Row gutter={20}>
            <Col span={12}>
              <FormItem label="Role" name="role"
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
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Restaurants" name="tenants"
               rules={[
                  {
                    required: true,
                    message: " is required"
                  },
                ]}
              >
                <Select
                // defaultValue="lucy"
                allowClear
                size="large"
                onChange={() => {}}
                placeholder="Select a restaurants"
                options={allRestaurnants?.map((resturant: Tenant) =>({
                  value: resturant.id,
                  label: resturant.name
                }))}
              />
              </FormItem>
            </Col>
       
          </Row>
        </Card>
      </Space>
      </Col>
    </Row>
  );
};

export default UserForm;
