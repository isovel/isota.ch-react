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

export enum Colors {
  Amber = 'amber',
  Blue = 'blue',
  Brown = 'brown',
  Gray = 'gray',
  Green = 'green',
  Iris = 'iris',
  Purple = 'purple',
  Red = 'red',
  Yellow = 'yellow',
}

export const themes = {
  dark: darkTheme,
  light: lightTheme,
}
