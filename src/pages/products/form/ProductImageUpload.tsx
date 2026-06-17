import {
  Form,
  Image,
  Space,
  Upload,
  type GetProp,
  type UploadFile,
  type UploadProps,
} from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  
const ProductImageUpload = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    const latestFileList = fileList.slice(-1);

    setFileList(latestFileList);
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
    <Space>
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
          {fileList?.length >= 1 ? null : uploadButton}
        </Upload>
      </Form.Item>
      {previewImage && (
        <Image
          styles={{ root: { display: "none" } }}
          preview={{
            open: previewOpen,
            onOpenChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </Space>
  );
};

export default ProductImageUpload;
