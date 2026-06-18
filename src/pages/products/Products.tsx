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
import type { ProductQueryData } from "../../types";
import { makeMultiParForm } from "./helpers";
import { useAddProduct } from "./hooks/useAddProduct";
import { useUpdateProduct } from "./hooks/useUpdateProduct";

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
        {format(new Date(text), "dd-mm-yyyy HH:mm")}
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
  const [selectedDetails, setSelectedDetails] = useState<Product | null>(null);

  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  useEffect(() => {
    if (selectedDetails) {
      setDrawerOpen(true);
     
      //transform from server data to formdata
      const priceConfiguration = Object.entries(
        selectedDetails.priceConfiguration,
      ).reduce((acc, [key, value]) => {
        const stringiFyKey = JSON.stringify({
          configurationKey: key,
          priceType: value.priceType,
        });
        return {
          ...acc,
          [stringiFyKey]: value.availableOptions,
        };
      }, {});

      const attributes = selectedDetails.attributes.reduce((acc, item) => {
        return {
          ...acc,
          [item.name]: item.value,
        };
      }, {});
      const image = [
        {
          uid: "-1",
          name: "product-image",
          status: "done",
          url: selectedDetails.image,
        },
      ];
      form.setFieldsValue({
        ...selectedDetails,
        image: image,
        priceConfiguration,
        attributes,
      });
    }
  }, [selectedDetails, form]);

  const { data: products, isFetching, isError } = useGetProducts(queryParams);
  const { data: restaurants } = useGetTenants();
  const { data: categories } = useGetCategories();

  //mutation
  const { mutateAsync: addProductMutation, isPending: isSubmitting } =
    useAddProduct();
  const { mutateAsync: updateProductMutation, isPending: isUpdating } = useUpdateProduct();

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
  const onHandleClose = () =>{
    form.resetFields();
    setSelectedDetails(null)
    setDrawerOpen(false)
  }
  const onHandleSubmit = async () => {
    await form.validateFields();
    const data = form.getFieldsValue();

    const attrFormValue = form.getFieldValue("attributes");
    const attributes = Object.entries(attrFormValue).map(([key, value]) => ({
      name: key,
      value: value,
    }));
    const priceConfigurationFormValue = form.getFieldValue("priceConfiguration");

    const priceConfiguration = Object.entries(
      priceConfigurationFormValue,
    ).reduce((acc, [key, value]) => {
      const parsedKey = JSON.parse(key);
      return {
        ...acc,
        [parsedKey.configurationKey]: {
          priceType: parsedKey.priceType,
          availableOptions: value,
        },
      };
    }, {});
    const antDFormImage = form.getFieldValue("image");
    const image = antDFormImage[0].originFileObj;
    const tenantId = user?.role === "admin" ? data.tenantId : user?.tenant?.id;
    const formData = {
      ...data,
      image,
      tenantId,
      isPublish: form.getFieldValue("isPublish") ? true : false,
      priceConfiguration,
      attributes,
    };

    const payload = makeMultiParForm(formData);

    const isEdit = !!selectedDetails;

    try {
      if (isEdit) {
        await updateProductMutation({ data: payload, id: selectedDetails?._id!})
      } else {
        await addProductMutation(payload);
      }
    } catch (error: any) {
      console.error(error?.response?.data?.message || "Failed to add product");
    }finally{
      onHandleClose();
    }
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
          title={`${selectedDetails ? "Edit" : "Add"} Product`}
          size={620}
          styles={{ body: { background: colorBgLayout } }}
          destroyOnHidden
          open={drawerOpen}
          onClose={onHandleClose}
          afterOpenChange={(open) => {
            if (!open) {
              form.resetFields();
              setSelectedDetails(null);
            }
          }}
          extra={
            <Space>
              <Button onClick={onHandleClose}>Cancel</Button>
              <Button
                onClick={onHandleSubmit}
                loading={isSubmitting || isUpdating}
                type="primary"
              >
                Submit
              </Button>
            </Space>
          }
        >
          <Form form={form} layout="vertical">
            <ProductForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Products;
