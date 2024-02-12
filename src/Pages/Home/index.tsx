import { Col, Row } from "antd";
import VideoRecorder from "../../Components/VideoRecorder";

import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Row>
        <Col sm={{ offset: 6, span: 12 }} xs={24}>
          <div>
            <VideoRecorder />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
