"use client";

import { getDictionary } from "@/get-dictionary";
import Image from "next/image";
import { useCallback } from "react";
import styled from "styled-components";
import logoImage from "../../public/assets/logo.png";
import NavigationLink from "./ui/NavigationLink";
import { Desktop, Mobile, Tablet } from "./ui/Responsive";
import Typography from "./ui/Typography";

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["footer"];
};

const FooterContainer = styled.div`
  height: 372px;
  background-color: #dc2132;
  @media (max-width: 1279px) {
    height: auto;
  }
  @media (max-width: 768px) {
    height: 445px;
  }
`;

const StyledUnionContainer = styled.div`
  position: relative;
  top: -2px;
  left: 0px;
  width: 100%;
  height: 167px;

  @media (max-width: 1279px) {
    height: 42.98px;
  }
`;

const BottomFooter = styled.div`
  padding-top: 35px;
  padding-bottom: 41px;
  display: flex;
  flex-direction: column;
  gap: 36px;

  @media (max-width: 1279px) {
    padding: 52px 0 32px 0;
  }
`;

const NavSocialsWrapper = styled.div`
  max-width: 1344px;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 1366px) {
    max-width: 1200px;
  }
  @media (max-width: 1279px) {
    flex-direction: column;
    padding-top: 76px;
    gap: 36px;
  }
`;

const NavigationWrapper = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 1279px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const LinkWrapper = styled.div`
  a {
    color: #fcfcfc;
    text-decoration: none;
  }
`;

const SocialsWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

// Fixed position for the logo in the center
const LogoWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  @media (max-width: 1279px) {
    top: 0;
    transform: translate(-50%, -50%);
  }
`;

const WhiteLine = styled.div`
  width: 100%;
  border-top: 1px solid #ffffff;
`;

const CopyrightWrapper = styled.div`
  text-align: center;
  color: #fcfcfc;
`;

const Footer = ({ dictionary }: Props) => {
  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <FooterContainer>
      <StyledUnionContainer>
        <Desktop>
          <Image src="/assets/union-2.png" alt="Union" fill />
        </Desktop>
        <Tablet>
          <Image src="/assets/union-2.png" alt="Union" fill />
        </Tablet>
        <Mobile>
          <Image src="/assets/union-2-mobile.png" alt="Union" fill />
        </Mobile>
      </StyledUnionContainer>
      <BottomFooter>
        <NavSocialsWrapper>
          <NavigationWrapper>
            <LinkWrapper>
              <NavigationLink
                isSmallOnMobile
                isSmallOnTablet
                text={dictionary.whereToBuy}
                href="/"
                scrollTo="whereToBuy"
              />
            </LinkWrapper>
            <LinkWrapper>
              <NavigationLink
                isSmallOnMobile
                isSmallOnTablet
                text={dictionary.products}
                href="/"
                scrollTo="products"
              />
            </LinkWrapper>
            <LinkWrapper>
              <NavigationLink
                isSmallOnMobile
                isSmallOnTablet
                text={dictionary.aboutUs}
                href="/"
                scrollTo="aboutUs"
              />
            </LinkWrapper>
          </NavigationWrapper>
          <LogoWrapper onClick={scrollToTop}>
            <Image width={60} height={60} src={logoImage} alt="logo" placeholder="blur" />
          </LogoWrapper>
          <SocialsWrapper>
            <Image src="/assets/footer/tiktok.png" width={28} height={28} alt="TikTok" />
            <Image src="/assets/footer/instagram.png" width={28} height={28} alt="Instagram" />
            <Image src="/assets/footer/facebook.png" width={28} height={28} alt="Facebook" />
          </SocialsWrapper>
        </NavSocialsWrapper>
        <WhiteLine />
        <CopyrightWrapper>
          <Desktop>
            <Typography variant="sBodytext">{dictionary?.copyright}</Typography>
          </Desktop>
          <Tablet>
            <Typography variant="xsBodytext">{dictionary?.copyright}</Typography>
          </Tablet>
          <Mobile>
            <Typography variant="xsBodytext">{dictionary?.copyright}</Typography>
          </Mobile>
        </CopyrightWrapper>
      </BottomFooter>
    </FooterContainer>
  );
};

export default Footer;
