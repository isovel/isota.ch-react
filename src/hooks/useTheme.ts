import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Theme } from 'themes'

const useTheme = () => useContext(ThemeContext) as Theme

export default useTheme
