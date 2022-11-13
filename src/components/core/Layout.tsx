import { Link, Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import ErrorBoundary from '../ErrorBoundary'

const Layout = () => {
  const location = useLocation()

  return (
    <>
      <Section>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Section>
      <Footer>
        &copy; isota.ch {new Date().getFullYear()}
        <Divider />
        {location.pathname === '/' ? (
          <FooterLink to={'/projects'}>projects</FooterLink>
        ) : (
          <FooterLink to={'/'}>home</FooterLink>
        )}
      </Footer>
    </>
  )
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 20px;
`

const FooterLink = styled(Link)`
  color: #777;
  text-decoration: none;

  &:hover {
    color: #999;
  }
`

const Divider = styled.div`
  display: inline-block;
  height: 0;
  width: 1.2em;
  margin: 0 0.65em;
  border-top: #777 1px solid;
`

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  color: #777;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

export default Layout
