import { Row, Col, Input, Space } from 'antd'
import './index.css'
import { SearchProps } from 'antd/es/input/Search'
import { useStore } from '@/store'
export default function NavHeader() {
  const { Search } = Input

  const state = useStore()

  // const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    state.updateKeyword(value)
  }

  return (
    <div className='header-wrapper'>
      <Row>
        <Col span={4}></Col>
        <Col span={16} className='header-mid'>
          <div className='header-left-aligned'>Scala HTTP File Server</div>
          <div className='header-right-aligned'>
            <Search placeholder='input search text' allowClear onSearch={onSearch} style={{ width: 200 }} />
          </div>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  )
}
