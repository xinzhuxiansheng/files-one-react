import React, { useState, useRef, MutableRefObject } from 'react'
import {
  HomeOutlined,
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  CloudUploadOutlined,
  FolderAddOutlined,
  InboxOutlined
} from '@ant-design/icons'
import { Breadcrumb, Button, Layout, Menu, theme, Row, Col, Modal, Upload, Input } from 'antd'
import NavHeader from '@/components/NavHeader'
import ContentTable from '@/components/ContentTable'
import styles from './index.module.less'
import { useStore } from '@/store'
import api from '@/api'
import { CreateFolderParams } from '@/types/api'

const { Content } = Layout

const App: React.FC = () => {
  const { Dragger } = Upload
  const state = useStore()
  const tableRef = useRef<any>(null)
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  // New Folder
  const showNewFolderModal = () => {
    setIsNewFolderModalOpen(true)
  }
  const handleNewFolderOk = async () => {
    // 发起请求
    const createFolderParams: CreateFolderParams = {
      path: state.path,
      name: newFolderName
    }
    const data = await api.createFolder(createFolderParams)
    setIsNewFolderModalOpen(false)
    tableRef.current.onUpdateList()
  }
  const handleNewFolderCancel = () => {
    setIsNewFolderModalOpen(false)
  }

  const handleIsHidden = () => {
    var isHidden = state.isHidden
    state.updateIsHidden(!isHidden)
  }

  const handleNewFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value)
  }

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout>
      <NavHeader />

      <Row style={{ backgroundColor: '#fff' }}>
        <Col span={4}></Col>
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
            <div className={styles.baropMiddleWrapper}>
              <Button className={styles.baropAntBtn} icon={<ArrowLeftOutlined />}>
                Back
              </Button>
              <Button className={styles.baropAntBtn} icon={<EyeInvisibleOutlined />} onClick={handleIsHidden}>
                Hidden
              </Button>
              <Button className={styles.baropAntBtn} icon={<CloudUploadOutlined />}>
                Upload
              </Button>
              <Button className={styles.baropAntBtn} icon={<FolderAddOutlined />} onClick={showNewFolderModal}>
                New Folder
              </Button>
            </div>

            {/* <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
            </div> */}
            <ContentTable ref={tableRef} />
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
        </Col>
        <Col span={4}></Col>
      </Row>

      {/* <Modal title='New Folder'>
        <div className='newFolderWrapper'>
          <p className='newFolderDesc'>current path: </p>
          <p className='newFolderDesc'>please enter the new directory name</p>
          <Input placeholder='folder name' />
        </div>
      </Modal> */}

      <Modal title='New Folder' open={isNewFolderModalOpen} onOk={handleNewFolderOk} onCancel={handleNewFolderCancel}>
        <div className='newFolderWrapper'>
          <p className='newFolderDesc'>current path: &nbsp;{state.path}</p>
          <p className='newFolderDesc'>please enter the new directory name</p>
          <Input placeholder='folder name' value={newFolderName} onChange={handleNewFolderNameChange} />
        </div>
      </Modal>

      <Modal title='Upload'>
        <div className='uploadWrapper'>
          <Dragger>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
            </p>
          </Dragger>
        </div>
      </Modal>
    </Layout>
  )
}

export default App
