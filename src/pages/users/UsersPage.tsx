import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Spin,
  Table,
  theme,
  Typography,
} from "antd";
import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { type FieldData, type QueryData, type User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilter from "./UsersFilter";
import { useState } from "react";
import UserForm from "./forms/UserForm";
import useGetUsers from "../../hooks/api/users/useGetUsers";
import useCreateUser from "../../hooks/api/users/useCreateUser";
import { PER_PAGE } from "../../constants";

const columns = [
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (_text: string, record: User) => (
      <div>
        {record.firstName} {record.lastName}
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

const Users = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [queryParams, setQueryParams] = useState<QueryData>({
    currentPage: "1",
    perPage: String(PER_PAGE),
  });

  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const { user } = useAuthStore();

  if (user?.role === "manager") {
    return <Navigate to={"/"} />;
  }
  const { data: users, isFetching, isError, error } = useGetUsers(queryParams);
  const { mutate: createUserMutate, isPending: isSubmitting } = useCreateUser();
  const onHandleSubmit = async () => {
    await form.validateFields();
    const data = form.getFieldsValue();
    await createUserMutate(data);
    form.resetFields();
    setDrawerOpen(false);
  };

  const onFilterChange = (changedValues: FieldData) => {
    const filters = {
      q: changedValues.q ?? "",
      role: changedValues.role ?? "",
    };

    setQueryParams(prev => ({
      ...prev,
      ...filters,
      currentPage: "1",
    }));
  };
  return (
    <>
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <Flex justify="space-between">
          <Breadcrumb
            separator={<RightOutlined />}
            items={[
              {
                title: <Link to="/">Dashboard</Link>,
              },
              {
                title: "Users",
              },
            ]}
          />
          {isFetching && (
            <Spin
              style={{ marginRight: 8 }}
              indicator={<LoadingOutlined spin />}
            />
          )}
          {isError && (
            <Typography.Text type="danger">
              {"Something went wrong! failed to fetch users"}{" "}
            </Typography.Text>
          )}
        </Flex>
        <Form
          form={filterForm}
          onValuesChange={(_, allValues) => onFilterChange(allValues)}
        >
          <UsersFilter>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setDrawerOpen(true)}
            >
              Add User
            </Button>
          </UsersFilter>
        </Form>
        <Table
          dataSource={users?.data}
          columns={columns}
          rowKey={"id"}
          loading={isFetching}
          pagination={{
            total: users?.total,
            current: users?.currentPage,
            pageSize: users?.perPage,
            onChange: (page, pageSize) => {
              setQueryParams((prevQueryParams) => {
                return {
                  ...prevQueryParams,
                  currentPage: page.toString(),
                  perPage: pageSize.toString(),
                };
              });
            },
          }}
        />
        ;
        <Drawer
          title={"Create user"}
          size={620}
          styles={{ body: { background: colorBgLayout } }}
          destroyOnHidden
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          extra={
            <Space>
              <Button
                onClick={() => {
                  form.resetFields();
                  setDrawerOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={onHandleSubmit}
                loading={isSubmitting}
                type="primary"
              >
                Submit
              </Button>
            </Space>
          }
        >
          <Form form={form} layout="vertical">
            <UserForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
