import { Alert, Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd";
import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../../components/icons/logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Credentials } from "../../types";
import { getSelf, login } from "../../http/api";
import { useAuthStore } from "../../store";

const loginUser = async (credentials: Credentials) =>{
  try {
    await login(credentials);
  } catch (error) {
    console.error("Login failed:", error);
  }
}
const getLoginUserData = async () => {
  const { data } = await getSelf();
  return data;
}
const LoginPage = () => {
  const { setUser } = useAuthStore();
  const { data: getUserData, refetch } = useQuery({
  queryKey: ["getSelf"],
  queryFn: getLoginUserData,  
  enabled: false,
})
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => { 
      const authenticatedUser = await refetch();
      setUser(authenticatedUser.data)
    }
  })

  return (
    <>
      <Layout
        style={{ height: "100vh", display: "grid", placeItems: "center" }}
      >
        <Space orientation="vertical" size="large" align="center">
          <Layout.Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Logo />
          </Layout.Content>
          <Card
            title={
              <Space
                style={{
                  width: "100%",
                  fontSize: 16,
                  justifyContent: "center",
                }}
              >
                <LockFilled /> Sign In
              </Space>
            }
            style={{ width: 300 }}
            variant="outlined"
          >
            <Form initialValues={{ remember: true }} onFinish={(values) => mutate(values)}>
              {isError && <Alert title={error.message} type="error" showIcon style={{ marginBottom: 16 }} />}
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Username" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="#" id="login-form-forgot">
                  Forgot password?
                </a>
              </Flex>
              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                  loading={isPending}
                >
                  {" "}
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
