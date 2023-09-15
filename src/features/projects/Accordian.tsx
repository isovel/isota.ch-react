import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, PropsWithChildren, useState } from 'react'
import styled from 'styled-components'

const Accordian: FC<PropsWithChildren<{ title: string; open?: boolean }>> = (
  props
) => {
  const [isOpen, setIsOpen] = useState(props.open || false)

  return (
    <Container>
      <h2 onClick={() => setIsOpen(!isOpen)}>
        {props.title}{' '}
        <Icon icon={isOpen ? faChevronUp : faChevronDown} fixedWidth />
      </h2>
      {isOpen && <AccordianContent>{props.children}</AccordianContent>}
    </Container>
  )
}

export default Accordian

const Icon = styled(FontAwesomeIcon)`
  font-size: 0.8em;
`

const AccordianContent = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1em;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  h2 {
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
  }
`
