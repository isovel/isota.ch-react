import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import useKeyPress from '../../hooks/useKeyPress'

const CLIText = (props: { onActivate: () => void }) => {
  const backspace = useKeyPress('Backspace')
  const [text, setText] = useState('toast')

  useEffect(() => {
    if (backspace) {
      if (text.length > 1) {
        setText(text.slice(0, -1))
      } else {
        setText('')
        props.onActivate()
      }
    }
  }, [backspace])

  return (
    <CLIHeader>
      &gt;&nbsp;{text}
      <Cursor />
    </CLIHeader>
  )
}

const CLI = () => {
  const [currentLine, setCurrentLine] = useState('')
  const [history, setHistory] = useState<string[]>([])
  useKeyPress('', {
    onKeyDown: (key) => {
      console.log(key, 'pressed')
    },
  })

  return (
    <CLIContainer>
      {history.map((line, i) => (
        <CLILine key={i}>{line}</CLILine>
      ))}
      <CLILine>
        {'root@isota.ch:~$'}
        {currentLine}
        <Cursor />
      </CLILine>
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
  padding-right: calc(0.5em - 1px);
  opacity: 0;
  border-left: #777 solid 1px;
  animation: ${cursorAnimation} 1s infinite;
`

const CLIHeader = styled.h1`
  text-indent: -1em;
`

const CLIContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const CLILine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
