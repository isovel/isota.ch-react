import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useTitle = (title?: string) => {
  const location = useLocation()

  useEffect(() => {
    document.title = title
      ? title
      : location.pathname === '/'
      ? 'isota.ch'
      : location.pathname.slice(1)
  }, [location, title])
}

export default useTitle
