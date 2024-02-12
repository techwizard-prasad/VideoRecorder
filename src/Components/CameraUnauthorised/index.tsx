import { MehOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import React from "react";

import style from "./styles.module.scss";

interface ICameraUnauthorisedProps {
  getCameraPermission: () => Promise<void>;
  loading: boolean;
}

const CameraUnauthorised: React.FC<ICameraUnauthorisedProps> = ({
  getCameraPermission,
  loading,
}) => {
  return (
    <div className={style.container}>
      <Space direction="vertical">
        {" "}
        <MehOutlined height={30} width={30} className={style.mehIcon} />
        <Typography.Text>
          Plase grant us access to your camera and microphone.
        </Typography.Text>
        <Button type="primary" onClick={getCameraPermission} loading={loading}>
          Grant Access
        </Button>
      </Space>
    </div>
  );
};

export default CameraUnauthorised;
