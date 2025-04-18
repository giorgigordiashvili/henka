"use client";
import Image from "next/image";
import styled from "styled-components";
import Container from "./Container";
import { Desktop, Mobile } from "./Responsive";
import Typography, { H2 } from "./Typography";

const StyledContainer = styled.div<{ $backgroundColor?: string }>`
  background-color: ${(props) => props.$backgroundColor || "#fcfcfc"};
  height: 650px;

  @media (max-width: 1080px) {
    height: auto;
  }
`;

const StyledTextContainer = styled.div`
  color: rgba(92, 14, 21, 1);
  max-width: 541px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1080px) {
    max-width: calc(100vw - 32px);
  }
`;

const StyledFlex = styled.div<{ $imagePosition?: "left" | "right" }>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.$imagePosition === "left" ? "row-reverse" : "row")};
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1080px) {
    flex-direction: column;
    gap: 28px;
  }
`;

const StyledImageContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 1080px) {
    position: relative;
    width: calc(100vw - 32px);
    height: 343px;
    margin: auto;
  }
`;

interface TextWithImageProps {
  id?: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  backgroundColor?: string;
  imagePosition?: "left" | "right";
  className?: string;
}

export default function TextWithImage({
  id,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  imageWidth = 656,
  imageHeight = 650,
  backgroundColor,
  imagePosition = "right",
  className,
}: TextWithImageProps) {
  return (
    <StyledContainer id={id} $backgroundColor={backgroundColor} className={className}>
      <Container>
        <StyledFlex $imagePosition={imagePosition}>
          <StyledTextContainer>
            <H2>{title}</H2>
            <Typography variant="mBodytext">{subtitle}</Typography>
          </StyledTextContainer>
          <StyledImageContainer>
            <Desktop>
              <Image src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} />
            </Desktop>
            <Mobile>
              <Image src={imageSrc} alt={imageAlt} fill />
            </Mobile>
          </StyledImageContainer>
        </StyledFlex>
      </Container>
    </StyledContainer>
  );
}
