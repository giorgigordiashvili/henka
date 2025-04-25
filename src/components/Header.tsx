"use client";
import { getDictionary } from "@/get-dictionary";
import BurgerIcon from "@/icons/BurgerIcon";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LocaleSwitcher from "./LocaleSwitcher";
import NavigationLink from "./ui/NavigationLink";

// Static image import
import CloseIcon from "@/icons/CloseIcon";
import logoImage from "../../public/assets/logo.png";

const StyledColor = styled.div<{ $visible: boolean; $sticky: boolean }>`
  padding: 12px 0px;
  z-index: 99999;
  position: ${(props) => (props.$sticky ? "fixed" : "fixed")};
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  background-color: #dc2233;
  width: 100%;
  transform: translateY(${(props) => (props.$sticky && !props.$visible ? "-100%" : "0")});
  transition: transform 0.3s ease-in-out;
  @media (max-width: 1080px) {
    display: flex;
    padding: 12px 16px;
    width: 100%;
    max-width: 100%;

    justify-content: space-between;
  }
`;
const StyledContainer = styled.div<{ $visible: boolean; $sticky: boolean }>`
  max-width: 1344px;
  margin: auto;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  @media (max-width: 1080px) {
    display: flex;
    width: 100%;
    max-width: 100%;

    justify-content: space-between;
  }
`;

const StyledLinksContainer = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
  @media (max-width: 1080px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 32px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const MobileNavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;
  margin: 0;
  list-style: none;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 1080px) {
    display: none;
  }
`;

const LogoContainerMobile = styled.div`
  display: none;
  justify-content: center;
  @media (max-width: 1080px) {
    display: flex;
  }
`;

const LocaleSwitcherContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1080px) {
    display: none;
  }
`;

const StyledBurgerContainer = styled.button`
  display: none;
  @media (max-width: 1080px) {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
  }
`;

const StyledCloseButton = styled.button`
  display: none;
  @media (max-width: 1080px) {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
    position: absolute;
    right: 16px;
    top: 19px;
  }
`;

const MobileMenu = styled.nav<{ $isOpen: boolean }>`
  position: fixed;
  top: ${({ $isOpen }) => ($isOpen ? "0px" : "-100vh")};
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
  z-index: 9999;
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 1080px) {
    gap: 35px;
  }

  @media (min-width: 1081px) {
    display: none;
  }
`;

export default function Header({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["menu"];
}) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [sticky, setSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handler to close mobile menu
  const closeMobileMenu = () => {
    setOpen(false);
  };

  // Handle scroll events
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        // Set sticky state when scrolled beyond a threshold (e.g., 50px)
        const shouldBeSticky = window.scrollY > 78;
        setSticky(shouldBeSticky);

        // Hide header on scroll down, show on scroll up
        if (shouldBeSticky) {
          if (window.scrollY > lastScrollY) {
            // Scrolling down
            setVisible(false);
          } else {
            // Scrolling up
            setVisible(true);
          }
        } else {
          setVisible(true);
        }

        // Update last scroll position
        setLastScrollY(window.scrollY);
      }
    };

    // Add event listener
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // Cleanup
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <StyledColor $visible={visible} $sticky={sticky}>
      <StyledContainer $visible={visible} $sticky={sticky}>
        <StyledLinksContainer aria-label="Main Navigation">
          <NavList>
            <NavigationLink text={dictionary.whereToBuy} href="/" scrollTo="whereToBuy" />
            <NavigationLink text={dictionary.products} href="/" scrollTo="products" />
            <NavigationLink text={dictionary.aboutUs} href="/" scrollTo="aboutUs" />
          </NavList>
        </StyledLinksContainer>
        <LogoContainer>
          <Image width={54} height={54} src={logoImage} alt="logo" placeholder="blur" />
        </LogoContainer>
        <LogoContainerMobile>
          <Image width={40} height={40} src={logoImage} alt="logo" placeholder="blur" />
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
        <StyledCloseButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </StyledCloseButton>
        <MobileNavList>
          <NavigationLink
            text={dictionary.whereToBuy}
            href="/"
            scrollTo="whereToBuy"
            tabIndex={open ? 0 : -1}
            onLinkClick={closeMobileMenu}
          />
          <NavigationLink
            text={dictionary.products}
            href="/"
            scrollTo="products"
            tabIndex={open ? 0 : -1}
            onLinkClick={closeMobileMenu}
          />
          <NavigationLink
            text={dictionary.aboutUs}
            href="/"
            scrollTo="aboutUs"
            tabIndex={open ? 0 : -1}
            onLinkClick={closeMobileMenu}
          />
        </MobileNavList>
        <LocaleSwitcher tabIndex={open ? undefined : -1} />
      </MobileMenu>
    </StyledColor>
  );
}
