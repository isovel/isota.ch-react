import { CSSProperties, SVGProps } from 'react'
import styled from 'styled-components'
import { Colors } from 'themes'
import { ProjectTag } from 'types'

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
    <CardContainerContainer>
      <Indicator />
      <CardContainer {...linkProps} style={props.style}>
        {props.image && <CardImage src={props.image} />}
        <CardTextContainer>
          <CardTitle>{props.title}</CardTitle>
          {props.description && <CardText>{props.description}</CardText>}
        </CardTextContainer>
        <CardTags>
          {props.tags &&
            props.tags.map((tag, idx) => (
              <CardTag key={idx} $color={tag.color as Colors}>
                {tag.displayName}
              </CardTag>
            ))}
        </CardTags>
      </CardContainer>
    </CardContainerContainer>
  )
}

const Indicator = (props: SVGProps<SVGSVGElement>) => (
  <IndicatorSVG viewBox="0 0 24 94" {...props}>
    <path d="M 22 48 A 12 12 0 0 1 10 36" />
  </IndicatorSVG>
)

const IndicatorSVG = styled.svg`
  flex: 0 0 auto;
  margin-left: 1rem;
  width: 24px;
  height: -webkit-fill-available;
  pointer-events: none;
  stroke: ${(props) => props.theme.colors.iris3};
  stroke-width: 4px;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
`

const CardTag = styled.span<{ $color?: Colors }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: 0.25rem 0.6rem;
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
  font-size: 0.8rem;
  white-space: nowrap;
  user-select: none;

  a:hover & {
    text-decoration-style: none;
  }
`

const CardTags = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
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
  gap: 0.75rem;

  * {
    margin: 0;
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
  gap: 1rem;
  padding: 1rem;
  transform: scale(1);
  background-color: ${(props) => props.theme.colors.backgroundFloating};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  text-decoration: none;
  overflow: hidden;

  transition: all 150ms ease-in-out;

  &:hover,
  &:focus-visible {
    transform: scale(1.02);
    text-decoration: none;
  }
`

const CardContainerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
`

export default Card
