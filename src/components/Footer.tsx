"use client";

import { getDictionary } from "@/get-dictionary";
import Image from "next/image";
import styled from "styled-components";
import logoImage from "../../public/assets/logo.png";
import NavigationLink from "./ui/NavigationLink";
import { Desktop, Mobile } from "./ui/Responsive";
import Typography from "./ui/Typography";

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["footer"];
};

const FooterContainer = styled.div`
  height: 305px;
  background-color: #dc2132;

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

  @media (max-width: 1080px) {
    height: 42.98px;
  }
`;

const BottomFooter = styled.div`
  padding-top: 35px;
  padding-bottom: 41px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  @media (max-width: 1080px) {
    padding: 32px 0;
  }
`;

const NavSocialsWrapper = styled.div`
  max-width: 1344px;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 15px;

  @media (max-width: 1080px) {
    flex-direction: column;
    padding-top: 128px;
    position: relative;
    gap: 36px;
  }
`;

const NavigationWrapper = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 1080px) {
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

const LogoWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 1080px) {
    transform: translateX(-50%) translateY(-96px);
  }
`;

const WhiteLine = styled.div`
  width: 100%;
  margin-left: calc(-50vw + 50%);
  border: 1px solid #ffffff;
`;

const CopyrightWrapper = styled.div`
  text-align: center;
  color: #fcfcfc;
`;

const Footer = ({ dictionary }: Props) => {
  return (
    <FooterContainer>
      <StyledUnionContainer>
        <Desktop>
          <Image src="/assets/union-2.png" alt="Union" fill />
        </Desktop>
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
                text={dictionary.whereToBuy}
                href="/"
                scrollTo="whereToBuy"
              />
            </LinkWrapper>
            <LinkWrapper>
              <NavigationLink
                isSmallOnMobile
                text={dictionary.products}
                href="/"
                scrollTo="products"
              />
            </LinkWrapper>
            <LinkWrapper>
              <NavigationLink
                isSmallOnMobile
                text={dictionary.aboutUs}
                href="/"
                scrollTo="aboutUs"
              />
            </LinkWrapper>
          </NavigationWrapper>
          <LogoWrapper>
            <Image width={60} height={60} src={logoImage} alt="logo" placeholder="blur" />
          </LogoWrapper>
          <SocialsWrapper>
            <Image src="/assets/footer/instagram.png" width={28} height={28} alt="Instagram" />
            <Image src="/assets/footer/tiktok.png" width={28} height={28} alt="TikTok" />
            <Image src="/assets/footer/facebook.png" width={28} height={28} alt="Facebook" />
          </SocialsWrapper>
        </NavSocialsWrapper>
        <WhiteLine />
        <CopyrightWrapper>
          <Typography variant="sBodytext">{dictionary.copyright}</Typography>
        </CopyrightWrapper>
      </BottomFooter>
    </FooterContainer>
  );
};

export default Footer;
