import { darkTheme } from 'themes/dark'
import { lightTheme } from 'themes/light'

export type Theme = {
  colors: Record<string, string> & {
    background: string
    backgroundFloating: string
    text: string
    textLight: string
    border: string
    primary: string
    primaryLight: string
  }
  gradients: Record<string, string>
}

export const themes = {
  dark: darkTheme,
  light: lightTheme,
}
