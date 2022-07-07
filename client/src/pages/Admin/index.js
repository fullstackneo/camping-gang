import { Row, Col } from 'antd';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import NavLeft from '../../components/layout/NavLeft';

const Admin = () => {
  return (
    <Row>
      <Col span={3}>
        <NavLeft></NavLeft>
      </Col>
      <Col span={21}>
        <Header></Header>
        <Row></Row>
        <Footer></Footer>
      </Col>
    </Row>
  );
};
export default Admin;
