import request from '@/utils/request'
import { ListParams, FileDescriptor, CreateFolderParams } from '@/types/api'
export default {
  getFiles(params: ListParams) {
    return request.get<FileDescriptor[]>('/getFiles', params, { showLoading: false })
  },
  createFolder(params: CreateFolderParams) {
    return request.post('/createFolder', params, { showLoading: false })
  }
}
