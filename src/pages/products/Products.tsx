import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Image,
  Space,
  Spin,
  Table,
  Tag,
  theme,
  Typography,
} from "antd";
import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import { useAuthStore } from "../../store";
import { useEffect, useMemo, useState } from "react";
import { PER_PAGE } from "../../constants";
import { debounce } from "lodash";
import ProductFilter from "./ProductFilter";
import useGetTenants from "../restaurants/hooks/useGetTenant";
import useGetCategories from "./hooks/useGetCategories";
import useGetProducts from "./hooks/useGetProducts";
import type { Product, ProductFilterValues } from "./types";
import { format } from "date-fns";
import ProductForm from "./form/ProductForm";
import type { ProductQueryData, QueryData } from "../../types";
import { makeMultiParForm } from "./helpers";
import { useAddProduct } from "./hooks/useAddProduct";

const columns = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    render: (text: string, record: Product) => {
      return (
        <Space>
          <Image width={60} src={record.image} />
          <Typography.Text>{text}</Typography.Text>
        </Space>
      );
    },
  },
  {
    title: "Description",
    dataIndex: "descriptions",
    key: "descriptions",
  },
  {
    title: "Status",
    dataIndex: "isPublish",
    key: "isPublish",
    render: (status: boolean) => {
      return (
        <Space>
          {status ? (
            <Tag color={"green"}>Published</Tag>
          ) : (
            <Tag color={"purple"}>Draft</Tag>
          )}
        </Space>
      );
    },
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => (
      <Typography.Text>
        {format(new Date(text), "dd-mm-yyyy HH:MM")}
      </Typography.Text>
    ),
  },
];

const Products = () => {
  const { user } = useAuthStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [queryParams, setQueryParams] = useState<ProductQueryData>({
    page: "1",
    limit: String(PER_PAGE),
    tenantId: user?.role === "manager" ? user.tenant?.id : "",
  });
  const [selectedUserDetails, setSelectedDetails] = useState<Product | null>(
    null,
  );

  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  useEffect(() => {
    // if (selectedUserDetails) {
    //   setDrawerOpen(true);
    //   form.setFieldsValue({
    //     ...selectedUserDetails,
    //     tenantId: Number(selectedUserDetails.tenant?.id),
    //   });
    // }
  }, [selectedUserDetails, form]);

  const { data: products, isFetching, isError } = useGetProducts(queryParams);
  const { data: restaurants } = useGetTenants();
  const { data: categories } = useGetCategories();
  
  //mutation
  const { mutate: addProductMutation, isPending: isSubmitting} = useAddProduct();

  const debounceSerachInput = useMemo(() => {
    return debounce((value: string) => {
      setQueryParams((prev: ProductQueryData) => ({
        ...prev,
        q: value ?? "",
        categoryId: value ?? "",
        tenantId: value ?? "",
        page: "1",
      }));
    }, 500);
  }, []);
  const onFilterChange = (changedValues: ProductFilterValues) => {
    if (changedValues.q !== undefined) {
      debounceSerachInput(changedValues.q);
    } else {
      setQueryParams((prev) => ({
        ...prev,
        ...changedValues,
        page: "1",
      }));
    }
  };

  const onHandleSubmit = async () => {
    await form.validateFields();
    const data = form.getFieldsValue();

const attrFormValue = form.getFieldValue('attributes');
const attributes = Object.entries(attrFormValue).map(([key, value]) => ({
  name: key,
  value: value
}))
const priceConfigurationFormValue = form.getFieldValue('priceConfiguration');

    
    const priceConfiguration = Object.entries(priceConfigurationFormValue).reduce((acc, [key, value]) =>{
     const parsedKey = JSON.parse(key);
     return{
      ...acc,
      [parsedKey.configurationKey]: {
        priceType: parsedKey.priceType,
        avalableOptions: value
      }
     }
    },{});
    const antDFormImage = form.getFieldValue('image');
    const image = antDFormImage[0].originFileObj;

    const formData = {
      ...form.getFieldsValue(),
      image,
      isPublish: form.getFieldValue('isPublish') ? true: false,
      priceConfiguration,
      attributes
    }

    const payload = makeMultiParForm(formData)
    
    const isEdit = !!selectedUserDetails;
    if (isEdit) {
      // await updateUserMutate({ id: selectedUserDetails?.id, data });
    } else {
      await addProductMutation(payload);
    }
    form.resetFields()
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
                title: "Products",
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
              {"Something went wrong! failed to fetch products"}{" "}
            </Typography.Text>
          )}
        </Flex>
        <Form
          form={filterForm}
          initialValues={{
            isPublish: false,
          }}
          onValuesChange={onFilterChange}
        >
          <ProductFilter
            restaurantList={restaurants?.data || []}
            categories={categories || []}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setDrawerOpen(true)}
            >
              Add Product
            </Button>
          </ProductFilter>
        </Form>
        <Table
          dataSource={products?.data || []}
          columns={[
            ...columns,
            {
              title: "Actions",
              render: (_: string, record: Product) => (
                <Button type="link" onClick={() => setSelectedDetails(record)}>
                  Edit
                </Button>
              ),
            },
          ]}
          rowKey={"_id"}
          loading={isFetching}
          pagination={{
            total: products?.total,
            current: products?.currentPage,
            pageSize: products?.perPage,
            onChange: (page, pageSize) => {
              setQueryParams((prevQueryParams) => {
                return {
                  ...prevQueryParams,
                  page: page.toString(),
                  limit: pageSize.toString(),
                };
              });
            },
            showTotal: (total: number, range: number[]) => {
              return `Showing ${range[0]} - ${range[1]} of ${total} items`;
            },
          }}
        />

        <Drawer
          title={`${selectedUserDetails ? "Edit" : "Create"} Product`}
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
                loading={isSubmitting}
                disabled={isSubmitting}
                type="primary"
              >
                Submit
              </Button>
            </Space>
          }
        >
          <Form form={form} layout="vertical">
            <ProductForm isEditing={!!selectedUserDetails} />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Products;
