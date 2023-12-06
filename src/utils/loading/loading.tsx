import { Spin } from 'antd'
import './loading.less'
export default function Loading({ tip = 'loading' }: { tip?: string }) {
  return (
    <Spin tip={tip} size='large' className='request-loading'>
      {/* 必须包裹子元素才能生效 */}
      <p></p>
    </Spin>
  )
}
