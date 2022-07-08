import React from 'react';
import Admin from './pages/Admin';
import SiteList from './pages/SiteList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Row, Col } from 'antd';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import NavLeft from './components/layout/NavLeft';

// import logo from './logo.svg';

function App() {
  return (
    <Router>
      <Row>
        <Col span={3}>
          <NavLeft />
        </Col>
        <Col span={21}>
          <Header />
          <Row>
            <Routes>
              <Route path="/" element={<Admin />} />
              <Route path="/campsites" element={<SiteList />} />
            </Routes>
          </Row>
          <Footer />
        </Col>
      </Row>
    </Router>
  );
}

export default App;
