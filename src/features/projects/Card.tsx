import { CSSProperties } from 'react'
import styled, { keyframes } from 'styled-components'

const Card = (props: {
  image?: string
  title: string
  description?: string
  href?: string
  tags?: string[]
  style: CSSProperties
}) => {
  const linkProps = props.href
    ? { as: 'a' as never, href: props.href, target: '_blank', rel: 'noopener' }
    : {}
  return (
    <Container {...linkProps} style={props.style}>
      {props.image && <Image src={props.image} />}
      <CardTextContainer>
        <h3>{props.title}</h3>
        {props.description && <p>{props.description}</p>}
      </CardTextContainer>
      <Tags>
        {props.tags && props.tags.map((tag, idx) => <Tag key={idx}>{tag}</Tag>)}
      </Tags>
    </Container>
  )
}

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const Tag = styled.div`
  background: rgba(100, 100, 255, 0.1);
  border: 1px solid rgba(100, 100, 255, 0.5);
  border-radius: 9999px;
  color: rgba(100, 100, 255, 1);
  font-size: 0.8em;
  padding: 0.25em 0.6em;
  user-select: none;
  height: fit-content;
  white-space: nowrap;
`

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  margin-left: auto;
  height: 100%;
`

const Image = styled.div<{ src: string }>`
  background-image: url(${(props: { src: string }) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 64px;
  border-radius: 8px;
  aspect-ratio: 1;
`

const CardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75em;

  * {
    margin: 0;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1em;
  backdrop-filter: blur(25px);
  opacity: 0;
  transform: translateX(-50px);
  overflow: hidden;

  animation: ${slideIn} 250ms forwards;
  animation-timing-function: cubic-bezier(0.7, 0, 0.7, 1.5);

  transition: transform 250ms ease-in-out;

  &:hover {
    transform: translateX(10px);
  }
`

export default Card
