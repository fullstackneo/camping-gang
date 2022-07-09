import { Row, Col } from 'antd';
import { useState } from 'react';

const Header = () => {
  const [state, setState] = useState({ userName: 'Neo' })
  return (
    <div>
      <Row>
        <Col span={24}>
          <span>Welcome: {state.userName}</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}><span>Homepage</span></Col>
        <Col span={20}><span>2022-7-7</span></Col>
      </Row>
    </div>
  );
};

export default Header;
