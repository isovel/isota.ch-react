import { useState } from 'react'
import styled from 'styled-components'
import useTitle from '../../hooks/useTitle'
import { CLI, CLIText } from './CLI'

const randomBlurb = () => {
  const blurbList = [
    'Certified Idiot.',
    'Avid Procrastinator.',
    'Your Worst Nightmare.',
    'Superior Being.',
    'Not a Robot.',
    // 'Proud Owner of a 2008 Toyota Corolla.',
  ]
  return blurbList[Math.floor(Math.random() * blurbList.length)]
}

const Landing = () => {
  useTitle()
  const [isActivated, setIsActivated] = useState(false)

  return isActivated ? (
    <CLI />
  ) : (
    <Container>
      <CLIText onActivate={() => setIsActivated(true)} />
      <Divider />
      <BlurbList>
        <li>Software Developer.</li>
        <li>Web Designer.</li>
        <li>{randomBlurb()}</li>
      </BlurbList>
      <Divider />
    </Container>
  )
}

const BlurbList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 1em 0;
  }
`

const Divider = styled.span`
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #000000, #444444, #000000);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0 0 2em 0;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);

  width: 18%;
  min-width: fit-content;

  @media only screen and (max-width: 1200px) {
    width: 30%;
  }

  @media only screen and (max-width: 992px) {
    width: 40%;
  }
`

export default Landing
