import axios from 'axios'
import { useCallback } from 'react'

const useFileDownloader = () => {
  const downloadFile = useCallback(async (url: string, filename: string) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' })
      const blob = new Blob([response.data])
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(response.data)
      link.download = filename
      document.body.appendChild(link)
      link.click()

      // 检查 parentNode 是否存在
      if (link.parentNode) {
        link.parentNode.removeChild(link)
      }
      window.URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('下载失败:', error)
    }
  }, [])

  return downloadFile
}

export default useFileDownloader
