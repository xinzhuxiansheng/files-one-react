import ReactDOM from 'react-dom/client'
import Loading from './loading'

let count = 0

export const showLoading = () => {
  if (count === 0) {
    const loading = document.createElement('div')
    loading.setAttribute('id', 'loading')
    document.body.appendChild(loading)
    ReactDOM.createRoot(loading).render(<Loading />)
  }
  count++
  // const loading = document.getElementById('loading') as HTMLDivElement
  // ReactDOM.createRoot(loading).render(<Loading />)
}

export const hideLoading = () => {
  if (count < 0) return
  count--
  if (count === 0) document.body.removeChild(document.getElementById('loading') as HTMLDivElement)
}
