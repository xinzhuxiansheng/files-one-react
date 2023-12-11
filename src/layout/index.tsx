import React, { useState, useRef, useEffect } from 'react'
import {
  HomeOutlined,
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  CloudUploadOutlined,
  FolderAddOutlined,
  InboxOutlined,
  FolderViewOutlined
} from '@ant-design/icons'
import { Breadcrumb, Button, Layout, theme, Row, Col, Modal, Upload, Input } from 'antd'
import NavHeader from '@/components/NavHeader'
import ContentTable from '@/components/ContentTable'
import styles from './index.module.less'
import { useStore } from '@/store'
import api from '@/api'
import { CreateFolderParams } from '@/types/api'
import { message } from '@/utils/AntdGlobal'
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface'

const { Content } = Layout

const App: React.FC = () => {
  // const { Dragger } = Upload
  const state = useStore()
  const tableRef = useRef<any>(null)
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false)
  const [goPathModalOpen, setGoPathModalOpen] = useState(false)
  const [goPath, setGoPath] = useState('')
  const [newFolderName, setNewFolderName] = useState('')
  const [breadPaths, setBreadPaths] = useState<string[]>([])
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { Dragger } = Upload

  useEffect(() => {
    splitBread()
  }, [state.path])

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

  const goIndex = () => {
    state.updatePath('/')
  }

  const splitBread = () => {
    // 使用 split 方法按 '/' 分割路径
    const parts = state.path.split('/')
    // 使用 filter 方法排除掉等于 '/' 的部分
    const filteredParts = parts.filter(part => part !== '/' && part !== '')
    setBreadPaths(filteredParts)
  }
  const handleBack = () => {
    var path = state.path
    const parts = path.split('/').filter(part => part !== '/' && part !== '')
    parts.pop() // 移除数组的最后一个元素
    state.updatePath('/' + parts.join('/')) // 将数组重新组合成一个字符串
  }

  const showUploadModal = () => {
    setIsUploadModalOpen(true)
  }
  const handleUploadOk = () => {
    setIsUploadModalOpen(false)
  }
  const handleUploadCancel = () => {
    setIsUploadModalOpen(false)
  }

  // go to path
  const showGoPathModal = () => {
    setGoPathModalOpen(true)
  }
  const handleGoPathOk = async () => {
    const data = await api.checkDirectory(goPath)
    state.updatePath(data)
    setGoPathModalOpen(false)
  }
  const handleGoPathCancel = () => {
    setGoPathModalOpen(false)
  }
  const handleGoPathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoPath(e.target.value)
  }

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    data: {
      path: state.path
    },
    maxCount: 1,
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    beforeUpload(file: RcFile) {
      // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      // if (!isJpgOrPng) {
      //   message.error('只能上传 png 或 jpeg 格式的图片!')
      // }
      // const isLt2M = file.size / 1024 / 1024 < 0.5
      // if (!isLt2M) {
      //   message.error('图片不能超过500K!')
      // }
      return true
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
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
              <Breadcrumb.Item onClick={goIndex}>
                <HomeOutlined />
              </Breadcrumb.Item>
              {/* <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item> */}
              {breadPaths.map((part, index) => (
                <Breadcrumb.Item key={index}>{part}</Breadcrumb.Item>
              ))}
            </Breadcrumb>

            {/* 操作按钮 */}
            <div className={styles.baropMiddleWrapper}>
              <Button className={styles.baropAntBtn} icon={<ArrowLeftOutlined />} onClick={handleBack}>
                Back
              </Button>
              <Button className={styles.baropAntBtn} icon={<EyeInvisibleOutlined />} onClick={handleIsHidden}>
                Hidden
              </Button>
              <Button className={styles.baropAntBtn} icon={<CloudUploadOutlined />} onClick={showUploadModal}>
                Upload
              </Button>
              <Button className={styles.baropAntBtn} icon={<FolderAddOutlined />} onClick={showNewFolderModal}>
                New Folder
              </Button>
              <Button className={styles.baropAntBtn} icon={<FolderViewOutlined />} onClick={showGoPathModal}>
                Go To Path
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

      <Modal title='Go To Path' open={goPathModalOpen} onOk={handleGoPathOk} onCancel={handleGoPathCancel}>
        <div className='newFolderWrapper'>
          <p className='newFolderDesc'>please enter 'Go To Path'</p>
          <Input placeholder='go to path' value={goPath} onChange={handleGoPathChange} />
        </div>
      </Modal>

      <Modal title='Upload' open={isUploadModalOpen} onOk={handleUploadOk} onCancel={handleUploadCancel}>
        <div className='uploadWrapper'>
          <Dragger {...props}>
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
