import { Navigate, NavLink, Outlet } from "react-router-dom"
import { useAuthStore } from "../store"
import { useState } from 'react';
import Icon, {
  BellFilled,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Space, theme } from 'antd';
import Logo from "../components/icons/logo";
import HomeIcon from "../components/icons/HomeIcon";
import ProductIcon from "../components/icons/ProductIcon";
import PromosIcon from "../components/icons/PromosIcon";
import { useLogout } from "../hooks/useLogout";

const { Header, Content, Footer, Sider } = Layout;


const items =[
  {
    key: "/",
    icon: <Icon component={HomeIcon} />,
    label: <NavLink to="/">Home</NavLink>
  },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: <NavLink to="/users">Users</NavLink>
  },
  {
    key: "/restaurants",
    icon: <UserOutlined />,
    label: <NavLink to="/restaurants">Restaurants</NavLink>
  },
  {
    key: "/products",
    icon: <Icon component={ProductIcon} />,
    label: <NavLink to="/products">Products</NavLink>
  },
  {
    key: "/promos",
    icon: <Icon component={PromosIcon} />,
    label: <NavLink to="/promos">Promos</NavLink>
  }
]
const Dashboard = () => {
  const { logoutUser } = useLogout();
  const [collapsed, setCollapsed] = useState(false)
   const {
    token: { colorBgContainer },
  } = theme.useToken();

    const { user } = useAuthStore();
    if(user === null){
       return <Navigate to={"/auth/login"} replace={true} />
    }
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          theme="light"
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">
            <Logo />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={["/"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ paddingLeft: "16px", paddingRight: "16px", background: colorBgContainer }}>
            <Flex gap={"middle"}  justify="space-between">
              <Badge text={user?.role === "admin"? "Admin Controller": user?.tenant?.name} status="success" />
              <Space size={16}>
                <Badge dot>
                    <BellFilled />
                </Badge>
                <Dropdown menu={{ items: [ { key: 'logout', label: "Logout", onClick: () => logoutUser() }] }} placement="bottomRight">
                        <Avatar
                          style={{ backgroundColor: "#fde3cf", color: "#f56a00"}}>
                              U
                          </Avatar>
                    </Dropdown>
              </Space>
            </Flex>
          </Header>
          <Content style={{ margin: "24px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2026 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Dashboard