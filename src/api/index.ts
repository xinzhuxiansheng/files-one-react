import request from '@/utils/request'
import { ListParams, FileDescriptor, CreateFolderParams, DeleteResourceParams } from '@/types/api'
export default {
  getFiles(params: ListParams) {
    return request.get<FileDescriptor[]>('/getFiles', params, { showLoading: false })
  },
  createFolder(params: CreateFolderParams) {
    return request.post('/createFolder', params, { showLoading: false })
  },
  deleteResource(params: DeleteResourceParams) {
    return request.post('/delete', params, { showLoading: false })
  },
  downloadResource(name: string) {
    return request.download<Blob>('/download', { name: name }, { showLoading: true })
  },
  isDirectory(name: string) {
    return request.get('/isDirectory', { name: name }, { showLoading: false })
  },
  checkDirectory(path: string) {
    return request.get<string>('/checkDirectory', { path: path }, { showLoading: false })
  }
}
