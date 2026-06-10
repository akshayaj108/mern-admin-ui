import { Breadcrumb, Button, Drawer, Flex, Form, Space, Spin, Table, theme, Typography } from "antd";
import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import RestaurantFilter from "./RestaurantFilter";
import useGetTenants from "../../hooks/api/tenant/useGetTenant";
import RestaurantForm from "./form/RestaurantForm";
import useCreateRestaurant from "../../hooks/api/tenant/useCreateTenant";
import { PER_PAGE } from "../../constants";
import type { TenantFilterValues, QueryData } from "../../types";
import { debounce } from "lodash";
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
const [ filterForm ] = Form.useForm();

const [drawerOpen, setDrawerOpen] = useState(false);
 const [queryParams, setQueryParams] = useState<QueryData>({
    currentPage: "1",
    perPage: PER_PAGE.toString(),
  });


    const {
    token: { colorBgLayout },
  } = theme.useToken();
const { data: allRestaurnants, isFetching, isError } = useGetTenants(queryParams);

const { mutate: createRestaurantMurate, isPending: isSubmitting } = useCreateRestaurant();

const debounceSerachInput = useMemo(() =>{
  return debounce((value: string) =>{
     setQueryParams(prev => ({
      ...prev,
      q: value ?? "",
      currentPage: "1",
    }));
  },600)
},[])
  const onFilterChange = (changedValues: TenantFilterValues) => {
    if(changedValues.q !== undefined){
      debounceSerachInput(changedValues.q);
    }
  };
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
         <RestaurantFilter >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setDrawerOpen(true)}
          >
            Add Restaurant
          </Button>
       </RestaurantFilter>
       </Form>
        <Table 
          dataSource={allRestaurnants?.data} 
          columns={columns} 
          rowKey={"id"} 
          pagination={{
            current: allRestaurnants?.currentPage,
            pageSize: allRestaurnants?.perPage,
            total: allRestaurnants?.total,
            onChange(page, pageSize) {
              setQueryParams(prevValue => ({
                ...prevValue,
                perPage:pageSize.toString(),
                currentPage: page.toString()
              }))
            },
          }}
          />;
        <Drawer
          title={"Create Restaurant"}
          size={420}
          styles={{ body: { background: colorBgLayout } }}
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