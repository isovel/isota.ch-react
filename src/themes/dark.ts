import { grayDark, grayDarkA, irisDark, redDark } from '@radix-ui/colors'
import { Theme } from 'themes'

export const darkTheme: Theme = {
  colors: {
    ...grayDark,
    ...grayDarkA,
    ...irisDark,
    ...redDark,
    background: grayDark.gray1,
    backgroundFloating: grayDarkA.grayA2,
    text: grayDark.gray12,
    textLight: grayDark.gray11,
    border: grayDark.gray6,
    primary: irisDark.iris9,
    primaryLight: irisDark.iris11,
  },
  gradients: {
    landingDivider: `
      linear-gradient(
        90deg,
        transparent 0%,
        ${grayDark.gray11} 50%,
        transparent 100%
      )`,
  },
}
