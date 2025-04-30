"use client";
import { getDictionary } from "@/get-dictionary";
import Image from "next/image";
import styled, { keyframes } from "styled-components";
import { Desktop, Mobile } from "./ui/Responsive";

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const DesktopContainer = styled.div`
  @media (max-width: 1300px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;
  @media (max-width: 1300px) {
    display: block;
  }
`;

const StyledWhite = styled.div`
  background-color: #e7dfee;
  width: 100%;
  position: relative;
  font-feature-settings: "case";
`;

const StyledUnionContainer = styled.div`
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 167px;
  z-index: 2;

  @media (max-width: 1300px) {
    height: 42.98px;
  }
`;

const StyledContainer = styled.div`
  padding-top: 167px;
  background: #e7dfee;
  text-align: center;
  margin: 0 auto;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
  @media (max-width: 1300px) {
    padding: 61px 0 48px 0;
    height: auto;
  }
`;

const Paragraph = styled.p`
  font-family: Helvetica, sans-serif;
  font-weight: 700;
  font-size: 90px;
  line-height: 120px;
  text-transform: uppercase;
  color: #5c0e15;
  white-space: nowrap;
  margin: 0;

  @media (max-width: 1300px) {
    font-size: 30px;
    line-height: 30px;
    white-space: normal;
  }
`;

const ThreeRowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MobileLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const MobileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const GingerImage1 = styled(Image)`
  transform: rotate(25.05deg);
  animation: ${bounceAnimation} 3s ease-in-out infinite;
  animation-delay: 1s;
`;

const GingerImage2 = styled(Image)`
  transform: rotate(27.01deg);
  animation: ${bounceAnimation} 3s ease-in-out infinite;
  animation-delay: 1s;
`;

const PineberryImage1 = styled(Image)`
  transform: rotate(37.55deg);
  animation: ${bounceAnimation} 3s ease-in-out infinite;
  animation-delay: 1s;
`;

const PineberryImage2 = styled(Image)`
  transform: rotate(37.55deg);
  animation: ${bounceAnimation} 3s ease-in-out infinite;
  animation-delay: 1s;
`;

const LeafImage1 = styled(Image)`
  transform: rotate(265deg);
  animation: ${bounceAnimation} 3s ease-in-out infinite;
  animation-delay: 1s;
`;

const LeafImage2 = styled(Image)`
  transform: rotate(0deg);
  animation: ${bounceAnimation} 3s ease-in-out infinite;
  animation-delay: 1s;
`;

const StyledUnionContainerBottom = styled.div`
  position: absolute;
  bottom: -167px;
  left: 0px;
  width: 100%;
  height: 167px;
  z-index: 9;
  @media (max-width: 1080px) {
    height: 22.96px;
    bottom: -21.96px;
  }
`;

export default function Fruits({
  dictionary,
  enableStickyEffect = true,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["fruits"];
  enableStickyEffect?: boolean;
}) {
  // Define fruits1 dictionaries for each language
  const fruits1En = {
    paragraph: "Henka–",
    paragraph2: " Health with",
    paragraph3: "natural",
    paragraph4: "ingredients",
  };

  const fruits1Ge = {
    paragraph: "ჰენკა-",
    paragraph2: "ჯანმრთელობა",
    paragraph3: "ბუნებრივი",
    paragraph4: "ინგრედიენტებით",
  };

  const fruits1Ru = {
    paragraph: "Хенка – ",
    paragraph2: "Здоровье с",
    paragraph3: "натуральными",
    paragraph4: "ингредиентами",
  };

  const isGeorgian = dictionary.paragraph.includes("ჰენკა-ჯანმრთელობა");
  const isRussian = dictionary.paragraph.includes("Хенка – Здоровье с");

  const fruits1 = isGeorgian ? fruits1Ge : isRussian ? fruits1Ru : fruits1En;

  return (
    <StyledWhite>
      <StyledUnionContainer>
        <Desktop>
          <Image src="/assets/union-2.png" alt="Union" fill />
        </Desktop>
        <Mobile>
          <Image src="/assets/union-2-mobile.png" alt="Union" fill />
        </Mobile>
      </StyledUnionContainer>

      <StyledUnionContainerBottom>
        <Desktop>
          <Image src="/assets/union-3.png" alt="Union" fill />
        </Desktop>
        <Mobile>
          <Image src="/assets/union-3-mobile.png" alt="Union" fill />
        </Mobile>
      </StyledUnionContainerBottom>

      <StyledContainer
        style={{
          position: enableStickyEffect ? "sticky" : "static",
          top: enableStickyEffect ? "20px" : undefined,
        }}
      >
        <DesktopContainer>
          <ThreeRowsContainer>
            <Row>
              <GingerImage1 src="/assets/marquee/ginger.png" width={121} height={121} alt="" />
              <Paragraph>{dictionary.paragraph}</Paragraph>
              <PineberryImage1
                src="/assets/marquee/pineberry.png"
                width={121}
                height={121}
                alt=""
              />
            </Row>
            <Row>
              <LeafImage1 src="/assets/marquee/leaf.png" width={115} height={115} alt="" />
              <Paragraph>{dictionary.paragraph2}</Paragraph>
              <LeafImage2 src="/assets/marquee/leaf.png" width={115} height={115} alt="" />
            </Row>
            <Row>
              <PineberryImage2
                src="/assets/marquee/pineberry.png"
                width={121}
                height={121}
                alt=""
              />
              <Paragraph>{dictionary.paragraph3}</Paragraph>
              <GingerImage2 src="/assets/marquee/ginger.png" width={121} height={121} alt="" />
            </Row>
          </ThreeRowsContainer>
        </DesktopContainer>

        <MobileContainer>
          <MobileLayoutContainer>
            <MobileRow>
              <GingerImage1 src="/assets/marquee/ginger.png" width={45} height={45} alt="" />
              <Paragraph>{fruits1.paragraph}</Paragraph>
              <PineberryImage1 src="/assets/marquee/pineberry.png" width={45} height={45} alt="" />
            </MobileRow>
            <Paragraph>{fruits1.paragraph2}</Paragraph>
            <MobileRow>
              <LeafImage1 src="/assets/marquee/leaf.png" width={45} height={45} alt="" />
              <Paragraph>{fruits1.paragraph3}</Paragraph>
              <LeafImage2 src="/assets/marquee/leaf.png" width={45} height={45} alt="" />
            </MobileRow>
            <Paragraph>{fruits1.paragraph4}</Paragraph>
          </MobileLayoutContainer>
        </MobileContainer>
      </StyledContainer>
    </StyledWhite>
  );
}
