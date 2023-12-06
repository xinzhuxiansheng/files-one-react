import request from '@/utils/request'
import { ListParams, FileDescriptor } from '@/types/api'
export default {
  getFiles(params: ListParams) {
    return request.get<FileDescriptor[]>('/users/login', params, { showLoading: false })
  }
}