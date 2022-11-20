import { useEffect, useState } from 'react'

type UseKeyPressOptions = {
  onKeyDown?: (...args: unknown[]) => unknown
  onKeyUp?: (...args: unknown[]) => unknown
}

const useKeyPress = (
  targetKey: string,
  options?: UseKeyPressOptions,
): boolean => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false)
  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(true)
      options?.onKeyDown?.(key)
    }
  }
  const handleKeyUp = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(false)
      options?.onKeyUp?.(key)
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  })
  return keyPressed
}

export default useKeyPress
