import { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
  style?: React.CSSProperties
  children?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    return this.state.hasError ? (
      <ErrorFallback style={{ ...this.props.style }} />
    ) : (
      <>{this.props.children}</>
    )
  }
}

// TODO: Add proper error fallback
const ErrorFallback = (props: ErrorBoundaryProps) => {
  return <button onClick={() => window.location.reload()}>Reload</button>
}
