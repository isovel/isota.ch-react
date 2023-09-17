import {
  amber,
  blue,
  brown,
  gray,
  grayA,
  green,
  iris,
  irisA,
  purple,
  red,
  yellow,
} from '@radix-ui/colors'
import { Theme } from 'themes'

export const lightTheme: Theme = {
  colors: {
    ...amber,
    ...blue,
    ...brown,
    ...gray,
    ...grayA,
    ...green,
    ...iris,
    ...irisA,
    ...purple,
    ...red,
    ...yellow,
    background: gray.gray1,
    backgroundFloating: grayA.grayA2,
    text: gray.gray12,
    textLight: gray.gray11,
    border: gray.gray6,
    primary: iris.iris9,
    primaryLight: iris.iris11,
  },
  gradients: {
    landingDivider: `
      linear-gradient(
        90deg,
        transparent 0%,
        ${gray.gray11} 50%,
        transparent 100%
      )`,
  },
}
