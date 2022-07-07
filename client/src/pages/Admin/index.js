import { Row, Col } from 'antd';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import Home from '../../components/layout/Home';
import NavLeft from '../../components/layout/NavLeft';

const Admin = () => {
  return (
    <Row>
      <Col span={3}>
        <NavLeft />
      </Col>
      <Col span={21}>
        <Header />
        <Row>
          <Home />
        </Row>
        <Footer />
      </Col>
    </Row>
  );
};
export default Admin;
