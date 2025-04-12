'use client'
import { getDictionary } from '@/get-dictionary'
import BurgerIcon from '@/icons/BurgerIcon'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import LocaleSwitcher from './LocaleSwitcher'
import NavigationLink from './ui/NavigationLink'

const StyledContainer = styled.div`
  padding: 12px 48px;
  background: #dd2233;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  @media (max-width: 1080px) {
    display: flex;
    position: absolute;
    top: 0px;
    z-index: 15;
    padding: 12px 16px;
    width: 100%;
    justify-content: space-between;
  }
`

const StyledLinksContainer = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
  @media (max-width: 1080px) {
    display: none;
  }
`

const NavList = styled.ul`
  display: flex;
  gap: 32px;
  padding: 0;
  margin: 0;
  list-style: none;
`

const MobileNavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;
  margin: 0;
  list-style: none;
  align-items: center;
`

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 1080px) {
    display: none;
  }
`

const LogoContainerMobile = styled.div`
  display: none;
  justify-content: center;
  @media (max-width: 1080px) {
    display: flex;
  }
`

const LocaleSwitcherContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1080px) {
    display: none;
  }
`

const StyledBurgerContainer = styled.button`
  display: none;
  @media (max-width: 1080px) {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
  }
`

const MobileMenu = styled.nav<{ $isOpen: boolean }>`
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  background: #dd2233;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 24px;
  width: 100%;
  height: 100dvh;
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(0)' : 'translateY(-200%)'};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  z-index: 2;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 1081px) {
    display: none;
  }
`

export default function Header({
  dictionary
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['menu']
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <StyledContainer>
        <StyledLinksContainer aria-label="Main Navigation">
          <NavList>
            <NavigationLink text={dictionary.whereToBuy} href="/" />
            <NavigationLink text={dictionary.products} href="/" />
            <NavigationLink text={dictionary.aboutUs} href="/" />
          </NavList>
        </StyledLinksContainer>
        <LogoContainer>
          <Image width={54} height={54} src="/assets/logo.png" alt="logo" />
        </LogoContainer>
        <LogoContainerMobile>
          <Image width={40} height={40} src="/assets/logo.png" alt="logo" />
        </LogoContainerMobile>
        <StyledBurgerContainer
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <BurgerIcon />
        </StyledBurgerContainer>
        <LocaleSwitcherContainer>
          <LocaleSwitcher />
        </LocaleSwitcherContainer>
      </StyledContainer>

      <MobileMenu
        $isOpen={open}
        aria-hidden={!open}
        id="mobile-menu"
        inert={!open ? false : undefined}
      >
        <MobileNavList>
          <NavigationLink
            text={dictionary.whereToBuy}
            href="/"
            tabIndex={open ? 0 : -1}
          />
          <NavigationLink
            text={dictionary.products}
            href="/"
            tabIndex={open ? 0 : -1}
          />
          <NavigationLink
            text={dictionary.aboutUs}
            href="/"
            tabIndex={open ? 0 : -1}
          />
        </MobileNavList>
        <LocaleSwitcher tabIndex={open ? undefined : -1} />
      </MobileMenu>
    </>
  )
}
