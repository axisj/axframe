import React from "react";
import { Button, Form, Input, Modal, Popconfirm, Space } from "antd";
import { API_URL } from "services/apiWrapper";
import { getAppData } from "@core/utils/store";
import axios from "axios";
import { useBtnI18n, useI18n } from "hooks";
import { DeleteOutlined, DownloadOutlined, EyeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { IconText } from "@core/components/common";
import { errorDialog } from "@core/components/dialogs";
import { FileDto } from "@types";

interface Props {
  file?: FileDto;
  onChangeFile?: (file?: FileDto) => void;
  disabled?: boolean;
}

function FileUploader({ file, onChangeFile, disabled }: Props) {
  const { t } = useI18n();
  const btnT = useBtnI18n();
  const [spinning, setSpinning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [uploadedFile, setUploadedFile] = React.useState<FileDto>();
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const abortController = React.useRef(new AbortController()).current;

  const handleButtonClick = React.useCallback((e) => {
    inputRef.current?.click();
  }, []);

  const onChange = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        setSpinning(true);
        const formData = new FormData();
        formData.append("width", "100");
        formData.append("height", "100");

        const file = event.target.files?.item(0);
        if (file) formData.append("file", file);
        const url = `${API_URL}/v1/upload/image`;

        const { data } = await axios.post(url, formData, {
          signal: abortController.signal,
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: getAppData()?.authorization ?? "",
          },
          onUploadProgress: (progressEvent) => {
            if (file) {
              setProgress(Math.round((progressEvent.loaded / file.size) * 100));
            }
          },
        });

        if (data.error) {
          await errorDialog({ content: data.error.data });
        } else {
          setUploadedFile(data.rs);
          onChangeFile?.(data.rs);
        }
      } catch (err: any) {
        await errorDialog(err);
      } finally {
        setSpinning(false);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    },
    [abortController.signal, onChangeFile],
  );

  const handleDel = React.useCallback(() => {
    setUploadedFile(undefined);
    onChangeFile?.(undefined);
  }, [onChangeFile]);

  React.useEffect(() => {
    if (file !== uploadedFile) {
      if (file) {
        setUploadedFile(file);
      } else {
        setUploadedFile(undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <>
      <input
        type='file'
        accept={"image/png, image/jpeg, image/gif, image/bmp"}
        ref={inputRef}
        onChange={onChange}
        style={{ display: "none" }}
      />

      <Form.Item name={["fileUpload", 0, "fileKey"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "savePath"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "seq"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "saveNm"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "fileSize"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "fileNm"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "extension"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "width"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "height"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "dwldCnt"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "attachCls"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "attachClsId"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "thumbnail"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "url"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>
      <Form.Item name={["fileUpload", 0, "download"]} noStyle>
        <Input type={"hidden"} />
      </Form.Item>

      <Space size={5}>
        <Input
          value={spinning ? `Uploading ${progress}%` : uploadedFile?.fileNm}
          readOnly
          onClick={handleButtonClick}
          disabled={disabled}
        />
        <Button onClick={handleButtonClick} loading={spinning} disabled={disabled}>
          {btnT("파일선택")}
        </Button>

        {uploadedFile && (
          <Space size={10} style={{ margin: "0 10px", whiteSpace: "nowrap" }}>
            <IconText
              icon={<EyeOutlined />}
              block
              onClick={() => {
                setPreviewOpen(true);
              }}
            >
              {btnT("preview")}
            </IconText>

            <IconText
              icon={<DownloadOutlined />}
              block
              onClick={() => {
                window.open(`${API_URL}${uploadedFile?.download}`);
              }}
            >
              {btnT("download")}
            </IconText>

            <Popconfirm
              title='Delete'
              description={t("msg.deleteConfirm")}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={handleDel}
            >
              <IconText icon={<DeleteOutlined />} block>
                {btnT("삭제")}
              </IconText>
            </Popconfirm>
          </Space>
        )}
      </Space>

      <Modal open={previewOpen} title={uploadedFile?.savePath} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img alt='example' style={{ width: "100%" }} src={`${API_URL}${uploadedFile?.url}`} />
      </Modal>
    </>
  );
}

export { FileUploader };
