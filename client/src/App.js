import React from 'react';
import "antd/dist/antd.css";
import './index.css';
import Home from './Home';
import { Layout } from 'antd';

const { Header, Footer } = Layout;

function App() {

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Layout className="site-layout">
          <Header className="site-layout-background">
             <span style={{fontSize: '50px', margin: '32%', fontFamily: 'Fantasy', fontWeight: '900'}}>
               Recommendations 
               </span>
          </Header>
          <Home/>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
  );
}

export default App;
