"use client";
import styled from "styled-components";
import Image from "next/image";
import { getDictionary } from "@/get-dictionary";
import { Desktop, Mobile } from "./ui/Responsive";

const StyledWhite = styled.div`
  background-color: #e7dfee;
  width: 100%;
  position: relative;
`;

const StyledUnionContainer = styled.div`
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 167px;
  z-index: 2;

  @media (max-width: 1080px) {
    height: 42.98px;
  }
`;

const StyledContainer = styled.div`
  padding: 188px 0;
  padding-bottom: 59px;
  background: #e7dfee;
  text-align: center;
  margin: 0 auto;
  overflow: visible;
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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

const GingerImage1 = styled(Image)`
  width: 121px;
  height: 121px;
  transform: rotate(25.05deg);
`;

const PineberryImage1 = styled(Image)`
  width: 121px;
  height: 121px;
  transform: rotate(37.55deg);
`;

const LeafImage1 = styled(Image)`
  width: 115px;
  height: 115px;
  transform: rotate(265deg);
`;

const LeafImage2 = styled(Image)`
  width: 115px;
  height: 115px;
  transform: rotate(0deg);
`;

const PineberryImage2 = styled(Image)`
  width: 121px;
  height: 121px;
  transform: rotate(37.55deg);
`;

const GingerImage2 = styled(Image)`
  width: 121px;
  height: 121px;
  transform: rotate(27.01deg);
`;

// Fruits component
export default function Fruits({
  dictionary,
  enableStickyEffect = true,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["fruits"];
  enableStickyEffect?: boolean;
}) {
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

      <StyledContainer
        style={{
          position: enableStickyEffect ? "sticky" : "static",
          top: enableStickyEffect ? "20px" : undefined,
        }}
      >
        <ThreeRowsContainer>
          <Row>
            <GingerImage1
              src="/assets/marquee/ginger.png"
              width={121}
              height={121}
              alt=""
            />
            <Paragraph>{dictionary.paragraph}</Paragraph>
            <PineberryImage1
              src="/assets/marquee/pineberry.png"
              width={121}
              height={121}
              alt=""
            />
          </Row>

          <Row>
            <LeafImage1
              src="/assets/marquee/leaf.png"
              width={115}
              height={115}
              alt=""
            />
            <Paragraph>{dictionary.paragraph2}</Paragraph>
            <LeafImage2
              src="/assets/marquee/leaf.png"
              width={115}
              height={115}
              alt=""
            />
          </Row>

          <Row>
            <PineberryImage2
              src="/assets/marquee/pineberry.png"
              width={121}
              height={121}
              alt=""
            />
            <Paragraph>{dictionary.paragraph3}</Paragraph>
            <GingerImage2
              src="/assets/marquee/ginger.png"
              width={121}
              height={121}
              alt=""
            />
          </Row>
        </ThreeRowsContainer>
      </StyledContainer>
    </StyledWhite>
  );
}
