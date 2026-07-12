import { useEffect, useState } from "react"

/**
 * Предзагружает список картинок и возвращает true, когда все они
 * загрузились (или отвалились по ошибке / таймауту). Нужно, чтобы
 * карточки показывались уже с готовыми изображениями, а не подгружали
 * их «на глазах» у пользователя.
 */
export const useImagesReady = (urls: string[]): boolean => {
  const key = urls.join("|")
  const [ready, setReady] = useState(urls.length === 0)

  useEffect(() => {
    if (urls.length === 0) {
      setReady(true)
      return
    }

    setReady(false)

    let cancelled = false
    let loaded = 0

    const markLoaded = () => {
      loaded += 1
      if (!cancelled && loaded >= urls.length) {
        setReady(true)
      }
    }

    const images = urls.map((url) => {
      const img = new Image()
      img.onload = markLoaded
      img.onerror = markLoaded
      img.src = url
      return img
    })

    // Подстраховка: не ждём вечно, если какая-то картинка зависла.
    const timeout = window.setTimeout(() => {
      if (!cancelled) setReady(true)
    }, 5000)

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
      images.forEach((img) => {
        img.onload = null
        img.onerror = null
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return ready
}
