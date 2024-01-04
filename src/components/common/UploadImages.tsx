import React from "react";
import { Button, Form, Modal, Upload, UploadFile } from "antd";
import { useI18n } from "hooks";
import { RcFile, UploadProps } from "antd/es/upload";
import { getAppData } from "@core/utils/store";
import { UploadOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { getFileNameAndExt } from "@core/utils/string";
import { API_URL } from "services/apiWrapper";

export interface UploadImage {
  url: string;
  thumbUrl: string;
}

interface Props {
  label: string;
  maxCount?: number;
  onChange?: (files: UploadImage[]) => void;
  files?: UploadImage[];
}

interface UploadedFile {
  fileNm: string; //서울_경기산.jpg",
  saveNm: string; //R46xxKrqO.jpg",
  savePath: string; ///Users/kyle/Work/samsung/upload/2023/0001/R46xxKrqO.jpg",
  mineType: string; //image/jpeg",
  extension: string; //jpg",
  fileSize: number; //18061,
  seq: number; //0,
  width: number; //312,
  height: number; //339,
  fileName: string; //서울_경기산.jpg",
  url: string; ///v1/preview?savePath=/Users/kyle/Work/samsung/upload/2023/0001/R46xxKrqO.jpg",
  thumbnail: string; ///v1/thumbnail?savePath=/Users/kyle/Work/samsung/upload/2023/0001/thumb/R46xxKrqO.jpg",
  download: string; ///v1/download?filePath=/Users/kyle/Work
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function UploadImages({ maxCount = 1, onChange, files = [] }: Props) {
  const { t } = useI18n();

  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const uploadProps: UploadProps = React.useMemo(
    () => ({
      // todo: get api fn
      action: `${API_URL}/v1/upload/image`,
      accept: "image/png, image/jpeg, image/gif, image/bmp",
      method: "post",
      headers: {
        authorization: getAppData()?.authorization ?? "",
      },
      data: {
        width: 100,
        height: 100,
      },
      // listType: "picture-card",
      listType: "picture",
      fileList,
      maxCount,
      onPreview: async (file: UploadFile) => {
        // console.log(file);
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || "preview");
      },
      onChange: async ({ file, fileList: newFileList }) => {
        setFileList(newFileList);

        if (file.status === "done") {
          const { url, thumbnail: thumbUrl } = file.response.rs as UploadedFile;
          onChange?.([{ url, thumbUrl }]);
        }
      },
      onRemove: (file) => {
        onChange?.([]);
      },
    }),
    [fileList, maxCount, onChange],
  );

  React.useMemo(() => {
    setFileList(
      files?.map(({ url = "", thumbUrl }) => ({
        uid: uuidv4(),
        name: getFileNameAndExt(url).fileNameExt,
        url: `${API_URL}${url}`,
        thumbUrl: `${API_URL}${thumbUrl}`,
        status: "done",
      })),
    );
  }, [files]);

  return (
    <Form.Item label={"File"}>
      <Form.Item>
        <Upload {...uploadProps}>
          {fileList.length < maxCount && <Button icon={<UploadOutlined />}>Upload</Button>}
        </Upload>

        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt='example' style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Form.Item>
    </Form.Item>
  );
}

export { UploadImages };
