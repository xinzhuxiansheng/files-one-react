import {
  DownloadOutlined,
  DeleteOutlined,
  InfoOutlined,
  FileTextOutlined,
  FileImageOutlined,
  FolderOpenOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FileMarkdownOutlined,
  FileZipOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons'
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { Space, Table, Button, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { FileDescriptor, ListParams } from '@/types/api'
import api from '@/api'
import { useStore } from '@/store/index'
import styles from './index.module.less'

const ContentTable = forwardRef((props, ref) => {
  const { confirm } = Modal
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false)
  const [resourceInfo, setResourceInfo] = useState('')
  const path = useStore(state => state.path)
  const keyword = useStore(state => state.keyword)
  const isHidden = useStore(state => state.isHidden)
  const [files, setFiles] = useState<FileDescriptor[]>()

  //暴露给父组件的方法以及数据
  useImperativeHandle(ref, () => ({
    onUpdateList() {
      getFileList()
    }
  }))

  useEffect(() => {
    getFileList()
  }, [path, keyword, isHidden])

  const getFileList = async () => {
    const searchParams: ListParams = {
      path: path,
      keyword: keyword,
      isHidden: isHidden
    }
    const data = await api.getFiles(searchParams)
    setFiles(data)
  }

  const showDeleteConfirm = record => {
    confirm({
      title: '你是否要删除该目录或者文件?',
      icon: <ExclamationCircleFilled />,
      content: '若删除的是目录，其子目录和同样同样被删除',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  const alertInfo = (record: FileDescriptor) => {
    setResourceInfo(JSON.stringify(record, null, 2))
    setIsOpenInfoModal(true)
  }
  const handleOpenInfoOk = () => {
    setIsOpenInfoModal(false)
  }
  const handleOpenInfoCancel = () => {
    setIsOpenInfoModal(false)
  }

  const columns: ColumnsType<FileDescriptor> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        if (record.fType === 'folder') {
          //是跳转
          return (
            <span>
              <FolderOpenOutlined className={styles.tableFirstC} />
              <a onClick={() => this.goCurrentPath(record)}>{record.name}</a>
            </span>
          )
        } else {
          // 文件是下载
          switch (record.fType) {
            case 'image':
              return (
                <span>
                  <FileImageOutlined className={styles.tableFirstC} />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'pdf':
              return (
                <span>
                  <FilePdfOutlined className={styles.tableFirstC} />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'word':
              return (
                <span>
                  <FileWordOutlined className={styles.tableFirstC} />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'excel':
              return (
                <span>
                  <FileExcelOutlined className={styles.tableFirstC} />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'ppt':
              return (
                <span>
                  <FilePptOutlined className={styles.tableFirstC} />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'md':
              return (
                <span>
                  <FileMarkdownOutlined className={styles.tableFirstC} />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'yasuobao':
              return (
                <span>
                  <FileZipOutlined className={styles.tableFirstC} />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'txt':
              return (
                <span>
                  <FileTextOutlined className={styles.tableFirstC} />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
          }
        }
      }
    },
    {
      title: 'Size',
      dataIndex: 'fSizeDesc',
      key: 'fSizeDesc',
      width: 120
    },
    {
      title: 'ModTime',
      dataIndex: 'modificationTimeDesc',
      key: 'modificationTimeDesc',
      width: 190
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 225,
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='primary'
            // loading={this.state.downloadLoading[record.id]}
            // onClick={() => this.downloadResource(record)}
            icon={<DownloadOutlined />}
            size='small'
          >
            Download
          </Button>
          <Button type='primary' onClick={() => alertInfo(record)} icon={<InfoOutlined />} size='small' />

          {/*删除*/}
          <Button danger icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record)} size='small' />
        </Space>
      )
    }
  ]

  return (
    <div>
      <Table rowKey='id' pagination={false} columns={columns} dataSource={files} />

      <Modal
        title='资源信息'
        open={isOpenInfoModal}
        onOk={handleOpenInfoOk}
        onCancel={handleOpenInfoCancel}
        width={700}
      >
        <pre>{resourceInfo}</pre>
      </Modal>
    </div>
  )
})

export default ContentTable
