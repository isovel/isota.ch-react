import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/core/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import RouteError, { HTTPError } from './features/error/RouteError'
import Landing from './features/home/Landing'
import Projects from './features/projects/Projects'
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
        <Route path={'*'} element={<RouteError type={HTTPError.NotFound} />} />
      </Route>
    </Routes>
  )
}

const App = () => {
  return (
    <ErrorBoundary>
      <Frame />
    </ErrorBoundary>
  )
}

export default App
