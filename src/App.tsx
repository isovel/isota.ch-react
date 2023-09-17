import DebugPage from 'features/debug/DebugPage'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import {
  StyleSheetManager,
  ThemeProvider,
  createGlobalStyle,
} from 'styled-components'
import { themes } from 'themes'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/core/Layout'
import RouteError, { HTTPError } from './features/error/RouteErrorPage'
import Landing from './features/home/LandingPage'
import Projects from './features/projects/ProjectsPage'
import useTitle from './hooks/useTitle'

const Frame = () => {
  return (
    <Router>
      <FrameRoutes />
    </Router>
  )
}

const FrameRoutes = () => {
  useTitle()

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={'/'} element={<Landing />} />
        <Route path={'/projects'} element={<Projects />} />
        <Route path={'__debug'} element={<DebugPage />} />
        <Route path={'*'} element={<RouteError type={HTTPError.NotFound} />} />
      </Route>
    </Routes>
  )
}

const GlobalStyles = createGlobalStyle`
  :root,
  ::placeholder,
  body,
  button,
  input,
  select,
  textarea {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  :root {
    color-scheme: light dark;
    font-size: 14px;
  }

  :focus-visible {
    outline: 2px auto ${(props) => props.theme.colors.primary};
  }

  html, body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  button,
  input,
  select,
  textarea {
    background-color: ${(props) => props.theme.colors.gray3};

    &:hover:not(:disabled):not(:focus-visible) {
      border-color: ${(props) => props.theme.colors.primary};
    }
    
    &:focus-visible {
      border-color: ${(props) => props.theme.colors.primary};
      outline: 4px auto ${(props) => props.theme.colors.primary};
      outline-offset: 2px;
    }
  }

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;

    transition: border-color 150ms ease-in-out, outline-offset 150ms ease-in-out;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
      text-decoration: underline;
    }

    &:focus-visible {
      border-color: ${(props) => props.theme.colors.primary};
      outline: 2px auto ${(props) => props.theme.colors.primary};
      outline-offset: 2px;
    }
  }
`

const StyledWrapper = (props: PropsWithChildren) => {
  const [styledTheme, setStyledTheme] = useState(themes.light)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const setThemeToSystem = (mql: MediaQueryList | MediaQueryListEvent) => {
      setStyledTheme(mql.matches ? themes.dark : themes.light)
    }
    setThemeToSystem(mql)
    mql.addEventListener('change', setThemeToSystem)
    return () => mql.removeEventListener('change', setThemeToSystem)
  }, [])

  return (
    <StyleSheetManager enableVendorPrefixes>
      <ThemeProvider theme={styledTheme}>
        <GlobalStyles />
        {props.children}
      </ThemeProvider>
    </StyleSheetManager>
  )
}

const App = () => {
  return (
    <ErrorBoundary>
      <StyledWrapper>
        <Frame />
      </StyledWrapper>
    </ErrorBoundary>
  )
}

export default App
