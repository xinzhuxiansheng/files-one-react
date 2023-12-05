import React from 'react'
import {
  HomeOutlined,
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  CloudUploadOutlined,
  FolderAddOutlined
} from '@ant-design/icons'
import { Breadcrumb, Button, Layout, Menu, theme, Row, Col } from 'antd'
import NavHeader from '@/components/NavHeader'
import styles from './index.module.less'

const { Header, Content, Footer } = Layout

const App: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout>
      <NavHeader />

      <Row style={{ backgroundColor: '#fff' }}>
        <Col span={4}>col-8</Col>
        <Col span={16}>
          <Content className='site-layout'>
            {/* 面包屑 */}
            <Breadcrumb className={styles.breadWrapper} style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            {/* 操作按钮 */}
            <div>
              <Button icon={<ArrowLeftOutlined />}>Back</Button>
              <Button icon={<EyeInvisibleOutlined />}>Hidden</Button>
              <Button icon={<CloudUploadOutlined />}>Upload</Button>
              <Button icon={<FolderAddOutlined />}>New Folder</Button>
            </div>

            <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>Content</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Col>
        <Col span={4}>col-8</Col>
      </Row>
    </Layout>
  )
}

export default App
