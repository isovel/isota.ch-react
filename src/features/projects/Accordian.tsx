import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, PropsWithChildren, useState } from 'react'
import styled from 'styled-components'

const Accordian: FC<PropsWithChildren<{ title: string; open?: boolean }>> = (
  props
) => {
  const [isOpen, setIsOpen] = useState(props.open || false)

  return (
    <Container>
      <AccordianHeader onClick={() => setIsOpen(!isOpen)}>
        {props.title} <Icon icon={faChevronUp} $isOpen={isOpen} fixedWidth />
      </AccordianHeader>
      <AccordianContent $isOpen={isOpen}>
        <AccordianContentBar />
        {props.children}
      </AccordianContent>
    </Container>
  )
}

export default Accordian

const Icon = styled(FontAwesomeIcon)<{ $isOpen: boolean }>`
  font-size: 0.8rem;
  transform-origin: center;
  transform: rotate(${(props) => (props.$isOpen ? 0.5 : 0)}turn);
  transition: transform 150ms ease-in-out;
`

const AccordianHeader = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.colors.irisA1};
  border: 1px solid ${(props) => props.theme.colors.iris6};
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  user-select: none;
`

const AccordianContentBar = styled.div`
  position: absolute;
  top: 0;
  left: 22px;
  width: 4px;
  height: calc(100% - 57px);
  border-radius: 4px 4px 0 0;
  background-color: ${(props) => props.theme.colors.iris3};
  box-shadow: 1px 0 0 0 ${(props) => props.theme.colors.gray1};
  z-index: 1;
`

const AccordianContent = styled.div<{ $isOpen: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1rem;

  margin-top: ${(props) => (props.$isOpen ? '1rem' : 0)};
  max-height: ${(props) => (props.$isOpen ? '1000px' : 0)};
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transform: ${(props) =>
    props.$isOpen ? 'translateY(0)' : 'translateY(-1rem)'};
  pointer-events: ${(props) => (props.$isOpen ? 'auto' : 'none')};

  transition:
    margin-top 150ms ease-in-out,
    max-height 150ms ease-in-out,
    transform 150ms ease-in-out,
    opacity 150ms ease-in-out;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
