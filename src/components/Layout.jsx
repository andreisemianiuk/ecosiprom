import * as React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { devices } from '../common/MediaQuery/media-query'
import { useMediaQueryHook } from '../common/MediaQuery/useMediaQueryHook'
import { ContactHeader } from './ContactHeader'
import Footer from './Footer'
import { Navbar } from './Navbar'

const Container = styled.div``
const MainContent = styled.div`
  // @media ${devices.mobileL} {
  // }
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  @media ${devices.tablet} {
    flex-direction: column;
  }
`
const StyledLink = styled(Link)``
const LogoItem = styled.div`
  width: ${({ width }) => `${width}px`};
`

export default function Layout({ children }) {
  return (
    <Container>
      <Header>
        <StyledLink to={'/'}>
          <Logo />
        </StyledLink>
        <ContactHeader />
        <Navbar />
      </Header>
      <MainContent>{children}</MainContent>
      <Footer />
    </Container>
  )
}

function Logo() {
  const device = useMediaQueryHook()
  const deviceWidth =
    (device === 'mobileS' && 250) ||
    (device === 'mobileM' && 300) ||
    (device === 'mobileL' && 350) ||
    (device === 'tablet' && 300) ||
    (device === 'laptop' && 200) ||
    (device === 'laptopL' && 250) ||
    (device === 'desktop' && 350)
  return (
    <LogoItem width={deviceWidth}>
      <StaticImage
        src='../images/logo-ecosiprom.png'
        alt='Logo for site'
        placeholder='blurred'
        layout='constrained'
      />
    </LogoItem>
  )
}
