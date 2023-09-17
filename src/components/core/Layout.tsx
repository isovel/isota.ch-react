import { useMemo } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useUIStore } from '../../store/UIStore'
import ErrorBoundary from '../ErrorBoundary'

const Layout = () => {
  const location = useLocation()
  const { showFooter } = useUIStore()
  const showDebugLink = useMemo(
    () =>
      ['localhost', '127.0.0.1'].includes(window.location.hostname) &&
      location.pathname !== '__debug',
    [location.pathname]
  )

  return (
    <>
      <Section $showFooter={showFooter}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Section>
      {showFooter && (
        <Footer>
          &copy; isota.ch {new Date().getFullYear()}
          <VerticalDivider />
          {location.pathname === '/' ? (
            <FooterLink to={'/projects'}>projects</FooterLink>
          ) : (
            <FooterLink to={'/'}>home</FooterLink>
          )}
          {showDebugLink && (
            <>
              <VerticalDivider />
              <FooterLink to={'__debug'} $debug>
                debug
              </FooterLink>
            </>
          )}
        </Footer>
      )}
    </>
  )
}

const Section = styled.div<{ $showFooter: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background-image: linear-gradient(
    to right,
    transparent 25%,
    ${(props) => props.theme.colors.backgroundFloating} 50%,
    transparent 75%
  );
  backdrop-filter: blur(5px);
  color: ${(props) => props.theme.colors.textLight};
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

const VerticalDivider = styled.div`
  display: inline-block;
  width: 1px;
  height: 1.6rem;
  margin: 0 0.65rem;
  background-color: ${(props) => props.theme.colors.textLight};
`

const FooterLink = styled(Link)<{ $debug: boolean }>`
  color: ${(props) =>
    props.$debug ? props.theme.colors.red10 : props.theme.colors.textLight};

  &:hover {
    color: ${(props) =>
      props.$debug ? props.theme.colors.red11 : props.theme.colors.text};
  }
`

export default Layout
