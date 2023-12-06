type ENV = 'dev' | 'stg' | 'prd'

let env: ENV = 'dev'
if (location.host === 'localhost:8080') {
  env = 'dev'
} else if (location.host === 'driver-stg.marsview.cc') {
  env = 'stg'
} else {
  env = 'prd'
}

const config = {
  dev: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-dev.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'http://localhost:5000'
  },
  stg: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-dev.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https:xxxx'
  },
  prd: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-dev.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https:xxxx'
  }
}

export default {
  env,
  ...config[env]
}
