import styles from './index.module.less'
export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>React18 通用后台管理系统</div>
        <div className={styles.desc}>React18 + ReactRouter6.0 + AntD5.x + typescript5.0 ...</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
