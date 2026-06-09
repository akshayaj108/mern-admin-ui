import { Breadcrumb, Button, Drawer, Form, Space, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import RestaurantFilter from "./RestaurantFilter";
import useGetTenants from "../../hooks/api/tenant/useGetTenant";
import RestaurantForm from "./form/RestaurantForm";
import useCreateRestaurant from "../../hooks/api/tenant/useCreateTenant";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "firstName",
    render: (text: string) => (
      <div>
        {text}
      </div>
    ),
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const Restaurant = () => {
const [ form ] = Form.useForm();
const [drawerOpen, setDrawerOpen] = useState(false);

const { data: allRestaurnants, isLoading, isError, error } = useGetTenants();
const { mutate: createRestaurantMurate, isPending: isSubmitting } = useCreateRestaurant();
const onHandleSubmit = async () =>{
  await form.validateFields();
  const data = form.getFieldsValue();
  await createRestaurantMurate(data);
  form.resetFields();
  setDrawerOpen(false);
}
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
              title: "Restaurants",
            },
          ]}
        />
        {isLoading && <>Loading ...</>}
        {isError && <>{error.message} </>}
        <RestaurantFilter
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
            Add Restaurant
          </Button>
       </RestaurantFilter>
        <Table dataSource={allRestaurnants} columns={columns} rowKey={"id"} />;
        <Drawer
          title={"Create Restaurant"}
          size={420}
          destroyOnHidden
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          extra={
            <Space>
              <Button onClick={() => {
                form.resetFields();
                setDrawerOpen(false)
              }
              }>Cancel</Button>
              <Button onClick={onHandleSubmit} loading={isSubmitting} type="primary">
                Submit
              </Button>
            </Space>
          }
        >
          <Form form={form} layout="vertical">
            <RestaurantForm />
          </Form>
        </Drawer>
      </Space>
    </>
  )
}

export default Restaurant;