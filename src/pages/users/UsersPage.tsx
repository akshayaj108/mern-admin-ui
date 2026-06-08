import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { users } from "../../http/api";
import { PlusOutlined } from "@ant-design/icons";
import type { User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilter from "./UsersFilter";
import { useState } from "react";

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
const getUsers = async () => {
  try {
    const response = await users();
    return response.data;
  } catch (error) {
    console.log("getting error while fetching users", error);
  }
};
const Users = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAuthStore();
  if (user?.role === "manager") {
    return <Navigate to={"/"} />;
  }
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <>
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
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
        {isLoading && <>Loading ...</>}
        {isError && <>{error.message} </>}
        <UsersFilter
          onFilterChange={(filterName, filterValue) => {
            console.log("filter name- ", filterName);
            console.log("filter value- ", filterValue);
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setDrawerOpen(true)}
          >
            Add User
          </Button>
        </UsersFilter>
        <Table dataSource={users} columns={columns} rowKey={"id"} />;
        <Drawer
          title={"Create user"}
          size={420}
          destroyOnHidden
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          extra={
            <Space>
              <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
              <Button onClick={() => setDrawerOpen(false)} type="primary">
                Submit
              </Button>
            </Space>
          }
        ></Drawer>
      </Space>
    </>
  );
};

export default Users;
