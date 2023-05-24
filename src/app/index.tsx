import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import styles from './styles/global/global.module.scss'

import { AppRouting } from '../pages'

const App = () => {
  return (
    <div className={styles.app}>
      <AppRouting />
    </div>
  )
}

export { App }
