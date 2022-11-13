import { Component, ReactNode } from 'react'
import styled from 'styled-components'

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
  return (
    <Container>
      <h1>&gt; System Error &lt;</h1>
      <ReloadButton onClick={() => window.location.reload()}>
        Reload
      </ReloadButton>
    </Container>
  )
}

const ReloadButton = styled.button`
  background: rgba(255, 100, 100, 0.1);
  color: rgba(255, 100, 100, 1);
  box-shadow: 0 0 5px 1px rgba(255, 100, 100, 0.5);
  overflow: hidden;

  &:hover {
    background: rgba(255, 100, 100, 0.2);
    border: 1px solid rgba(255, 100, 100, 0.6);
    box-shadow: 0 0 10px 1px rgba(255, 100, 100, 0.6);
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  h1 {
    font-size: 3em;
    font-weight: 600;
    color: rgba(255, 100, 100, 1);
    text-shadow: 0 0 5px rgba(255, 100, 100, 0.5);
    user-select: none;
  }
`
