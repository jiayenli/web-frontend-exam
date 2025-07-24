import styles from './Kv.module.scss'
import kvPeople from '../../assets/kv-people.png'
import leftEye from '../../assets/kv-left-eye.png'
import rightEye from '../../assets/kv-right-eye.png'
import slogan from '../../assets/kv-slogan.png'

export default function Kv() {
  return (
    <div className={styles.kv}>
      <div className={styles.content}>
        <div className={styles.people}>
          <div>
            <img src={kvPeople} alt="主視覺人物" />
          </div>
          <div className={styles.leftEye}>
            <img src={leftEye} alt="主視覺人物左眼" />
          </div>
          <div className={styles.rightEye}>
            <img src={rightEye} alt="主視覺人物右眼" />
          </div>
          <div className={styles.peopleMask} />
        </div>
        <div className={styles.slogan}>
          <img src={slogan} alt="HeeLoo" />
        </div>
      </div>
    </div>
  )
}
