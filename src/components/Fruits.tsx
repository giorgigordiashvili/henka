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

const ImageWrapper = styled.div`
  position: relative;
  width: 1339px;
  height: 385px;
  margin: 0 auto;
  aspect-ratio: 1338.7412109375 / 385.3496398925781;
`;

const TextOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Paragraph = styled.p`
  font-family: Helvetica, sans-serif;
  font-weight: 700;
  font-size: 90px;
  line-height: 120px;
  text-transform: uppercase;
  color: #5c0e15;
  white-space: pre-line;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

// --- Component ---
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
        <ImageWrapper>
          <Image
            src="/assets/marquee/Fruits.png"
            alt="Fruits background"
            fill
            style={{ objectFit: "contain" }}
            priority={enableStickyEffect}
          />
          <TextOverlay>
            <Paragraph>{dictionary.paragraph}</Paragraph>
          </TextOverlay>
        </ImageWrapper>
      </StyledContainer>
    </StyledWhite>
  );
}
