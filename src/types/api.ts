// 接口类型定义

export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

export interface ResultData<T> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

export interface FileDescriptor {
  id: number
  name: string
  fType: string
  fSize: number
  fSizeDesc: string
  internalPath: string
  isHidden: boolean
  modificationTime: number
  modificationTimeDesc: string
}

export interface ListParams {
  path: string
  keyword: string
  isHidden: boolean
}

export interface CreateFolderParams {
  path: string
  name: string
}
