import styles from './Carousel.module.scss'
import { useRef, useEffect, useState, useCallback } from 'react'

export default function Carousel({
  images = [],
  imageWidth = 250,
  autoPlayInterval = 3000,
  gap = 8,
  onReady = () => {},
  imgReady,
}) {
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalSlides, setTotalSlides] = useState([...images])
  const [isCarouselTransition, setIsCarouselTransition] = useState(false)
  const [dragDiff, setDragDiff] = useState(0)
  const timerRef = useRef(null)
  const isLoop = useRef(false)
  const perCount = useRef(0)

  // 切換圖片
  const handleNext = useCallback(
    (index, length) => {
      clearTimeout(timerRef.current)

      if (index === length - perCount.current - 1) {
        setIsCarouselTransition(false)
        setCurrentIndex(perCount.current + 1)
      }

      if (index === perCount.current) {
        setIsCarouselTransition(false)
        setCurrentIndex(length - perCount.current - 2)
      }

      isEndAnimation.current = false
      timerRef.current = setTimeout(() => {
        isEndAnimation.current = true
        setIsCarouselTransition(true)
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, autoPlayInterval)
    },
    [autoPlayInterval]
  )

  //點擊點點切換
  const handleDotClick = useCallback(
    index => {
      if (isEndAnimation.current || !isLoop.current) return
      clearTimeout(timerRef.current)
      setCurrentIndex(index + perCount.current + 1)
    },
    [isLoop]
  )

  // 拖曳事件處理
  const startX = useRef(0)
  const isDragging = useRef(false)
  const isEndAnimation = useRef(false)

  // 處理拖曳開始
  const handleDragStart = e => {
    if (isEndAnimation.current || !isLoop.current) return
    setIsCarouselTransition(true)
    isDragging.current = true
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX
    startX.current = clientX
    clearTimeout(timerRef.current)
  }

  // 處理拖曳移動
  const handleDragMove = e => {
    if (!isDragging.current || isEndAnimation.current || !isLoop.current) return
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
    const diff = Math.min((imageWidth * 3) / 4, Math.abs(clientX - startX.current))
    setDragDiff(clientX - startX.current > 0 ? diff : -diff)
  }

  // 處理拖曳結束
  const handleDragEnd = () => {
    if (!isDragging.current || isEndAnimation.current || !isLoop.current) return
    isEndAnimation.current = true
    isDragging.current = false
    if (dragDiff === 0) {
      handleNext(currentIndex, totalSlides.length)
    } else {
      dragDiff > 0 ? setCurrentIndex(prev => prev - 1) : setCurrentIndex(prev => prev + 1)
    }
    setDragDiff(0)
  }

  //擴展圖片列表，包含頭尾各複製比可見數量＋1張圖片
  const lastRun = useRef(0)
  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      const observer = new ResizeObserver(entries => {
        const now = Date.now()
        if (now - lastRun.current < 100 && lastRun.current) return
        lastRun.current = now

        setIsCarouselTransition(false)
        const entry = entries[0]
        const width = entry.contentRect.width
        perCount.current = Math.floor(width / (imageWidth + gap))
        isLoop.current = perCount.current < images.length

        if (isLoop.current) {
          const imagesWithIndex = images.map((img, index) => ({
            src: img,
            activeIndex: index,
          }))

          const startImages = imagesWithIndex.slice(0, perCount.current + 1)
          const endImages = imagesWithIndex.slice(-perCount.current - 1)
          setTotalSlides([...endImages, ...imagesWithIndex, ...startImages])
          //預設顯示中間的圖片
          setCurrentIndex(perCount.current + 1)
          handleNext(perCount.current + 1, startImages.length + images.length + endImages.length)
        } else {
          setTotalSlides(images)
          setCurrentIndex(0)
        }
      })

      observer.observe(carousel)
      return () => {
        observer.disconnect()
      }
    }
  }, [images, isLoop, imageWidth, gap])

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      style={{ opacity: imgReady ? 1 : 0 }}
      className={styles.carousel}
      ref={carouselRef}
      onMouseLeave={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div
        className={styles.carouselWrapper}
        onTransitionEnd={() => {
          if (isDragging.current) return
          handleNext(currentIndex, totalSlides.length)
        }}
        style={{
          gap: `${gap}px`,
          transform: `translateX(-${currentIndex * (imageWidth + gap) - dragDiff}px)`,
          transition: isCarouselTransition ? 'transform 0.5s ease' : 'none',
        }}
      >
        {totalSlides.map((image, index) => (
          <div
            key={index}
            className={styles.carouselImage}
            style={{
              width: `${imageWidth}px`,
            }}
          >
            <img onLoad={onReady} onError={onReady} src={image.src} alt={`公司照片${index}`} />
          </div>
        ))}
      </div>
      {imgReady && (
        <div className={styles.carouselDots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === totalSlides[currentIndex]?.activeIndex ? styles.active : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      )}
    </div>
  )
}
