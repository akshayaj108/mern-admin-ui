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
import { type UserFilterValues, type QueryData, type User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilter from "./UsersFilter";
import { useEffect, useMemo, useState } from "react";
import UserForm from "./forms/UserForm";
import useGetUsers from "../../hooks/api/users/useGetUsers";
import useCreateUser from "../../hooks/api/users/useCreateUser";
import { PER_PAGE } from "../../constants";
import { debounce } from "lodash";
import useUpdateUser from "../../hooks/api/users/useUpdateUser";

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
  {
    title: "Restaurant",
    dataIndex: "tenant",
    key: "tenant",
    render: (_text: string, record: User) => <div>{record.tenant?.name}</div>,
  },
];

const Users = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [queryParams, setQueryParams] = useState<QueryData>({
    currentPage: "1",
    perPage: String(PER_PAGE),
  });
  const [selectedUserDetails, setSelectedDetails] = useState<User | null>(null);

  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  useEffect(() => {
    if (selectedUserDetails) {
      setDrawerOpen(true);
      form.setFieldsValue({
        ...selectedUserDetails,
        tenantId: Number(selectedUserDetails.tenant?.id),
      });
    }
  }, [selectedUserDetails, form]);
  const { user } = useAuthStore();

  if (user?.role === "manager") {
    return <Navigate to={"/"} />;
  }
  const { data: users, isFetching, isError } = useGetUsers(queryParams);
  const { mutate: createUserMutate, isPending: isSubmitting } = useCreateUser();
  const { mutate: updateUserMutate, isPending: isUpdating } = useUpdateUser();

  const debounceSerachInput = useMemo(() => {
    return debounce((value: string) => {
      setQueryParams((prev) => ({
        ...prev,
        q: value ?? "",
        currentPage: "1",
      }));
    }, 500);
  }, []);
  const onFilterChange = (changedValues: UserFilterValues) => {
    if (changedValues.q !== undefined) {
      debounceSerachInput(changedValues.q);
    } else {
      setQueryParams((prev) => ({
        ...prev,
        role: changedValues.role ?? "",
        currentPage: "1",
      }));
    }
  };

  const onHandleSubmit = async () => {
    await form.validateFields();
    const data = form.getFieldsValue();
    const isEdit = !!selectedUserDetails;
    if (isEdit) {
      await updateUserMutate({ id: selectedUserDetails?.id, data });
    } else {
      await createUserMutate(data);
    }
    setDrawerOpen(false);
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
        <Form form={filterForm} onValuesChange={onFilterChange}>
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
          columns={[
            ...columns,
            {
              title: "Actions",
              render: (_: string, record: User) => (
                <Button type="link" onClick={() => setSelectedDetails(record)}>
                  Edit
                </Button>
              ),
            },
          ]}
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
            showTotal: (total: number, range: number[]) => {
              return `Showing ${range[0]} - ${range[1]} of ${total} items`;
            },
          }}
        />
        ;
        <Drawer
          title={`${selectedUserDetails ? "Edit" : "Create"} user`}
          size={620}
          styles={{ body: { background: colorBgLayout } }}
          destroyOnHidden
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          afterOpenChange={(open) => {
            if (!open) {
              form.resetFields();
              setSelectedDetails(null);
            }
          }}
          extra={
            <Space>
              <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
              <Button
                onClick={onHandleSubmit}
                loading={isSubmitting || isUpdating}
                disabled={isSubmitting || isUpdating}
                type="primary"
              >
                Submit
              </Button>
            </Space>
          }
        >
          <Form form={form} layout="vertical">
            <UserForm isEditing={!!selectedUserDetails} />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
