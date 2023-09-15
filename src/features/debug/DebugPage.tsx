import useTitle from 'hooks/useTitle'
import { styled } from 'styled-components'

const DebugPage = () => {
  useTitle('isota.ch | debug')
  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`

  return (
    <Container>
      <h1>{lorem}</h1>
      <h2>{lorem}</h2>
      <h3>{lorem}</h3>
      <h4>{lorem}</h4>
      <h5>{lorem}</h5>
      <h6>{lorem}</h6>
      <p>{lorem}</p>
      <span>{lorem}</span>
      <a>{lorem}</a>
      <button>{lorem}</button>
      <input type="text" />
      <select>
        <option>Lorem</option>
        <option>Ipsum</option>
        <option>Dolor</option>
      </select>
      <textarea>{lorem}</textarea>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
`

export default DebugPage
