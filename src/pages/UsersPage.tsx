import { Breadcrumb, Space, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { users } from "../http/api";
import { render } from "@testing-library/react";
import type { User } from "../types";
import { useAuthStore } from "../store";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

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
  const { user } = useAuthStore();
  if(user?.role === "manager"){
    return <Navigate to={"/"} />
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
      <Space orientation="vertical" style={{ width: "100%" }}>
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
        <Table dataSource={users} columns={columns} />;
      </Space>
    </>
  );
};

export default Users;
