import { useRef, useState, useEffect } from 'react'
import leftEye from '../../assets/kv-left-eye.png'
import kvPeople from '../../assets/kv-people.png'
import rightEye from '../../assets/kv-right-eye.png'
import slogan from '../../assets/kv-slogan.png'
import styles from './Kv.module.scss'

export default function Kv() {
  const rightEyeRef = useRef(null)
  const leftEyeRef = useRef(null)
  const rightEyePosition = useRef({})
  const leftEyePosition = useRef({})
  const [leftEyeMoveDiff, setLeftEyeMoveDiff] = useState({ x: 0, y: 0 })
  const [rightEyeMoveDiff, setRightEyeMoveDiff] = useState({ x: 0, y: 0 })

  // 監聽元素是否已經載入完成，計算眼球位置
  useEffect(() => {
    if (!rightEyeRef.current || !leftEyeRef.current) return

    const updateRect = () => {
      rightEyePosition.current = rightEyeRef.current.getBoundingClientRect()
      leftEyePosition.current = leftEyeRef.current.getBoundingClientRect()
    }

    setTimeout(() => {
      updateRect()
    }, 200)

    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect, true) // scroll 滾動也可能改變位置

    return () => {
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect, true)
    }
  }, [])

  // 監聽滑鼠移動事件，計算眼球移動
  useEffect(() => {
    const handleMouseMove = e => {
      if (!rightEyePosition.current || !leftEyePosition.current) return
      // 計算兩眼的區域，滑鼠在兩眼區域眼球不移動
      const eyeView = {
        left: Math.min(rightEyePosition.current.left, leftEyePosition.current.left),
        right: Math.max(rightEyePosition.current.right, leftEyePosition.current.right),
        top: Math.min(rightEyePosition.current.top, leftEyePosition.current.top),
        bottom: Math.max(rightEyePosition.current.bottom, leftEyePosition.current.bottom),
      }

      let leftMoveX = 0
      let leftMoveY = 0
      let rightMoveX = 0
      let rightMoveY = 0

      if (e.clientX < eyeView.left) {
        leftMoveX = Math.min(eyeView.left - e.clientX, (leftEyePosition.current.width * 2) / 3) * -1
        rightMoveX = Math.min(eyeView.left - e.clientX, rightEyePosition.current.width / 3) * -1
      } else if (e.clientX > eyeView.right) {
        leftMoveX = Math.min(e.clientX - eyeView.right, leftEyePosition.current.width / 10)
        rightMoveX = Math.min(e.clientX - eyeView.right, rightEyePosition.current.width / 15)
      }

      if (e.clientY < eyeView.top) {
        leftMoveY = Math.min(eyeView.top - e.clientY, leftEyePosition.current.height / 10) * -1
        rightMoveY = Math.min(eyeView.top - e.clientY, rightEyePosition.current.height / 10) * -1
      } else if (e.clientY > eyeView.bottom) {
        leftMoveY = Math.min(e.clientY - eyeView.bottom, leftEyePosition.current.height / 15)
        rightMoveY = Math.min(e.clientY - eyeView.bottom, rightEyePosition.current.height / 20)
      }

      setLeftEyeMoveDiff({ x: leftMoveX, y: leftMoveY })
      setRightEyeMoveDiff({ x: rightMoveX, y: rightMoveY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // 監聽滑鼠離開視窗事件
  useEffect(() => {
    const handleMouseOut = e => {
      if (!e.relatedTarget && !e.toElement) {
        // 滑鼠離開視窗時，將眼球移回原位
        setLeftEyeMoveDiff({ x: 0, y: 0 })
        setRightEyeMoveDiff({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <div className={styles.kv}>
      <div className={styles.content}>
        <div className={styles.people}>
          <div>
            <img src={kvPeople} alt="主視覺人物" />
          </div>
          <div
            ref={leftEyeRef}
            className={styles.leftEye}
            style={{ transform: `translate(${leftEyeMoveDiff.x}px, ${leftEyeMoveDiff.y}px)` }}
          >
            <img src={leftEye} alt="主視覺人物左眼" />
          </div>
          <div
            ref={rightEyeRef}
            className={styles.rightEye}
            style={{ transform: `translate(${rightEyeMoveDiff.x}px, ${rightEyeMoveDiff.y}px)` }}
          >
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
