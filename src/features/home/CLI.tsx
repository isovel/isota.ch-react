import useTheme from 'hooks/useTheme'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  Commands,
  Line,
  useCommandHandler,
  useTypeableState,
} from '../../lib/cli'

const CLIText = (props: { onActivate: () => void }) => {
  const text = useTypeableState('isotach', {
    allowErasing: true,
    allowTyping: false,
  })

  useEffect(() => {
    text.length === 0 && props.onActivate()
  }, [props, text])

  return (
    <CLIHeader>
      &gt;&nbsp;{text}
      <Cursor />
    </CLIHeader>
  )
}

const CLILine = (props: { line: Line; active?: boolean }) => {
  const theme = useTheme()

  return (
    <CLILineContainer $color={props.line.error ? theme.colors.red9 : undefined}>
      {props.line.showUser && (
        <CLIUserText>root@{window.location.hostname}</CLIUserText>
      )}
      {props.line.content}
      {props.active && <Cursor />}
    </CLILineContainer>
  )
}

const CLI = (props: { onDeactivate: () => void }) => {
  const [history, setHistory] = useState<Line[]>([])
  const ref = useRef<HTMLDivElement>(null)
  const handleCommand = useCommandHandler(Commands, (line) => {
    if (line.triggerExit) props.onDeactivate()
    setHistory((history) => [...history, line])
  })
  const currentLine = useTypeableState('', {
    onSubmit: useCallback(
      (value: string) => {
        setHistory((history) => [
          ...history,
          { content: value, showUser: true },
        ])
        handleCommand(value)
      },
      [handleCommand]
    ),
  })

  // Prevent scrolling when spacebar is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == 'Space' && e.target == ref.current) {
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <CLIContainer ref={ref}>
      {history.map((line, i) => (
        <CLILine key={i} line={line} />
      ))}
      <CLILine line={{ content: currentLine, showUser: true }} active />
    </CLIContainer>
  )
}

export { CLI, CLIText }

const cursorAnimation = keyframes`
  0% {
    opacity: 0;
  }
  49% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Cursor = styled.span`
  margin-left: 1px;
  padding-right: calc(0.5rem - 1px);
  opacity: 0;
  border-left: 1px solid ${(props) => props.theme.colors.textLight};
  animation: ${cursorAnimation} 1s infinite;
  height: 1.2rem;
`

const CLIHeader = styled.h1`
  text-indent: -1rem;
`

const CLIContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
  padding: 8px;
  overflow: hidden auto;
`

const CLILineContainer = styled.div<{ $color?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0.2rem 0;
  color: ${(props) => props.$color || props.theme.colors.text};
  white-space: pre-wrap;
`

const CLIUserText = styled.span`
  color: ${(props) => props.theme.colors.text};

  &:after {
    content: ':~$';
    margin-right: 0.5rem;
  }
`
