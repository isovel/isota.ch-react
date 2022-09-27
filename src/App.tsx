import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import Layout from './components/core/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import RouteError, { HTTPError } from './features/error/RouteError'
import Landing from './features/home/Landing'

const Frame = () => {
  return (
    <Router>
      <FrameRoutes />
    </Router>
  )
}

const FrameRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={'/'} element={<Landing />} />
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
