import {
  Card,
  Col,
  Input,
  Row,
  Select,
  Space,
  Form,
  Upload,
  Image,
  Switch,
  Typography,
} from "antd";
import useGetTenants from "../../restaurants/hooks/useGetTenant";
import type { Tenant } from "../../../types";
import useGetCategories from "../hooks/useGetCategories";
import type { Category } from "../types";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import Attributes from "./Attributes";
import { useGetCategory } from "../hooks/useGetCatory";
import PriceConfiguration from "./Price";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType, p0?: (url: any) => void): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ProductForm = ({ isEditing }: { isEditing: boolean }) => {
  const form = Form.useFormInstance();
  const selectedCategory = Form.useWatch("categoryId");
  const { data: allRestaurnants } = useGetTenants();
  const { data: categories } = useGetCategories();
  const { data: categoryDetails } = useGetCategory(selectedCategory);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    const latestFileList = fileList.slice(-1);

    setFileList(latestFileList);
    const imageFile = latestFileList[0].originFileObj;
   form.setFieldValue("image", imageFile);
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {<PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
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
                <Form.Item
                  label="Upload image"
                  name={"image"}
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e?.fileList}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => false}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    maxCount={1}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      styles={{ root: { display: "none" } }}
                      preview={{
                        open: previewOpen,
                        onOpenChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Tenant Info">
            <Row gutter={20}>
              {true && (
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
                          value: Number(resturant.id),
                          label: resturant.name,
                        }),
                      )}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Card>
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
