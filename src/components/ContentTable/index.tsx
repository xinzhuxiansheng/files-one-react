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
import React, { useEffect, useState } from 'react'
import { Space, Table, Button, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { FileDescriptor, ListParams } from '@/types/api'
import api from '@/api'

export default function ContentTable() {
  const { confirm } = Modal

  const [searchParams, setSearchParams] = useState<ListParams>({
    path: '/',
    keyword: '',
    isHidden: true
  })
  const [files, setFiles] = useState<FileDescriptor[]>()

  useEffect(() => {
    getFileList()
  }, [])

  const getFileList = async () => {
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
              <FolderOpenOutlined className='tableFirstC' />
              <a onClick={() => this.goCurrentPath(record)}>{record.name}</a>
            </span>
          )
        } else {
          // 文件是下载
          switch (record.fType) {
            case 'image':
              return (
                <span>
                  <FileImageOutlined className='tableFirstC' />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'pdf':
              return (
                <span>
                  <FilePdfOutlined className='tableFirstC' />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'word':
              return (
                <span>
                  <FileWordOutlined className='tableFirstC' />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'excel':
              return (
                <span>
                  <FileExcelOutlined className='tableFirstC' />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'ppt':
              return (
                <span>
                  <FilePptOutlined className='tableFirstC' />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'md':
              return (
                <span>
                  <FileMarkdownOutlined className='tableFirstC' />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'yasuobao':
              return (
                <span>
                  <FileZipOutlined className='tableFirstC' />
                  <a className='tableFirstCLink'>{record.name}</a>
                </span>
              )
            case 'txt':
              return (
                <span>
                  <FileTextOutlined className='tableFirstC' />
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
          <Button type='primary' icon={<InfoOutlined />} size='small' />

          {/*删除*/}
          <Button danger icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record)} size='small' />
        </Space>
      )
    }
  ]

  const data: FileDescriptor[] = [
    {
      id: 0,
      name: 'flink_checkpoint',
      fType: 'folder',
      fSize: 128,
      fSizeDesc: '128.0 B',
      internalPath: '/Users/a/TMP/flink_checkpoint',
      isHidden: false,
      modificationTime: 1690969220505,
      modificationTimeDesc: '2023-08-02 17:40:20'
    },
    {
      id: 1,
      name: 'example_file',
      fType: 'image',
      fSize: 1024,
      fSizeDesc: '1.0 KB',
      internalPath: '/Users/a/TMP/example_file.txt',
      isHidden: false,
      modificationTime: 1690969330600,
      modificationTimeDesc: '2023-08-02 17:42:10'
    },
    {
      id: 2,
      name: 'hidden_folder',
      fType: 'folder',
      fSize: 2048,
      fSizeDesc: '2.0 KB',
      internalPath: '/Users/a/TMP/hidden_folder',
      isHidden: true,
      modificationTime: 1690969440700,
      modificationTimeDesc: '2023-08-02 17:44:00'
    }
  ]

  return (
    <div>
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  )
}
