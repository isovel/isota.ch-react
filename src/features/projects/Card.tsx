import { CSSProperties } from 'react'
import styled from 'styled-components'
import { Colors } from 'themes'
import { ProjectTag } from 'types'

const getTagColor = (tag: ProjectTag): Colors =>
  Colors[tag.color as keyof typeof Colors]

const Card = (props: {
  image?: string
  title: string
  description?: string
  href?: string
  tags?: ProjectTag[]
  style: CSSProperties
}) => {
  const linkProps = props.href
    ? { as: 'a' as never, href: props.href, target: '_blank', rel: 'noopener' }
    : {}
  return (
    <Container {...linkProps} style={props.style}>
      {props.image && <CardImage src={props.image} />}
      <CardTextContainer>
        <CardTitle>{props.title}</CardTitle>
        {props.description && <CardText>{props.description}</CardText>}
      </CardTextContainer>
      <CardTags>
        {props.tags &&
          props.tags.map((tag, idx) => (
            <CardTag key={idx} $color={getTagColor(tag)}>
              {tag.displayName}
            </CardTag>
          ))}
      </CardTags>
    </Container>
  )
}

const CardTag = styled.span<{ $color?: Colors }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: 0.25em 0.6em;
  background: ${(props) =>
    props.$color
      ? props.theme.colors[`${props.$color}1`]
      : props.theme.colors.iris1};
  border: 1px solid
    ${(props) =>
      props.$color
        ? props.theme.colors[`${props.$color}6`]
        : props.theme.colors.iris6};
  border-radius: 9999px;
  color: ${(props) =>
    props.$color
      ? props.theme.colors[`${props.$color}9`]
      : props.theme.colors.iris9};
  font-size: 0.8em;
  white-space: nowrap;
  user-select: none;

  a:hover & {
    text-decoration-style: none;
  }
`

const CardTags = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  height: 100%;
  margin-left: auto;
`

const CardImage = styled.div<{ src: string }>`
  background-image: url(${(props: { src: string }) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 64px;
  border-radius: 8px;
  aspect-ratio: 1;
`

const CardText = styled.div`
  color: ${(props) => props.theme.colors.textLight};
`

const CardTitle = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colors.text};
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
  padding: 1em;
  transform: scale(0.98);
  background-color: ${(props) => props.theme.colors.backgroundFloating};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  text-decoration: none;
  overflow: hidden;

  transition: transform 150ms ease-in-out;

  &:hover {
    transform: scale(1);
    text-decoration: none;
  }
`

export default Card
