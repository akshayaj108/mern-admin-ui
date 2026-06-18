  import {
    Card,
    Col,
    Input,
    Row,
    Select,
    Space,
    Form,
    Switch,
    Typography,
  } from "antd";
  import useGetTenants from "../../restaurants/hooks/useGetTenant";
  import type { Tenant } from "../../../types";
  import useGetCategories from "../hooks/useGetCategories";
  import type { Category } from "../types";
  import Attributes from "./Attributes";
  import { useGetCategory } from "../hooks/useGetCatory";
  import PriceConfiguration from "./Price";
  import ProductImageUpload from "./ProductImageUpload";
import { useAuthStore } from "../../../store";

  const ProductForm = () => {
    const { user } = useAuthStore();

    const selectedCategory = Form.useWatch("categoryId");
    const { data: allRestaurnants } = useGetTenants();
    const { data: categories } = useGetCategories();
    const { data: categoryDetails } = useGetCategory(selectedCategory);
    
    return (
      <Row>
        <Col span={24}>
          <Space orientation="vertical" size="large">
            <Card title="Basic Info">
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="Product name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Product name is required",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Pizza" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[
                      {
                        required: true,
                        message: "Category is required",
                      },
                    ]}
                  >
                    <Select
                      // defaultValue="lucy"
                      allowClear
                      size="large"
                      onChange={() => {}}
                      placeholder="Select a category"
                      options={
                        Array.isArray(categories)
                          ? (categories as Category[]).map(
                              (category: Category) => ({
                                value: category._id,
                                label: category.name,
                              }),
                            )
                          : []
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Description"
                    name="descriptions"
                    rules={[
                      {
                        required: true,
                        message: "description is required",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={2}
                      maxLength={100}
                      size="large"
                      placeholder="Write about product"
                      style={{ resize: "none" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Product image">
              <Row gutter={20}>
                <Col span={12}>
                    <ProductImageUpload  />
                </Col>
              </Row>
            </Card>
            
            {user?.role === 'admin' && (
               <Card title="Tenant Info">
              <Row gutter={20}>
                  <Col span={24}>
                    <Form.Item label="Restaurants" name="tenantId">
                      <Select
                        // defaultValue="lucy"
                        allowClear
                        size="large"
                        onChange={() => {}}
                        placeholder="Select a restaurants"
                        options={allRestaurnants?.data?.map(
                          (resturant: Tenant) => ({
                            value: String(resturant.id),
                            label: resturant.name,
                          }),
                        )}
                      />
                    </Form.Item>
                  </Col>
              </Row>
            </Card>
            )}
            {selectedCategory && (
              <>
                <PriceConfiguration category={categoryDetails?.data} />
                <Attributes category={categoryDetails?.data} />
              </>
            )}
            <Card title="Other properties">
              <Row gutter={20}>
                <Col span={24}>
                  <Space>
                    <Form.Item name="isPublish">
                      <Switch
                        defaultChecked={false}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </Form.Item>
                    <Typography.Text
                      style={{ marginBottom: 20, display: "block" }}
                    >
                      Published
                    </Typography.Text>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Space>
        </Col>
      </Row>
    );
  };

  export default ProductForm;
