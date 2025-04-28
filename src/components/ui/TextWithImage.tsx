"use client";
import Image from "next/image";
import styled from "styled-components";
import Container from "./Container";
import { Desktop, Mobile } from "./Responsive";
import Typography, { H2 } from "./Typography";

const StyledContainer = styled.div<{ $backgroundColor?: string }>`
  position: relative;
  background-color: ${(props) => props.$backgroundColor || "#fcfcfc"};
  height: 650px;

  @media (max-width: 1080px) {
    height: auto;
  }
`;

const StyledTextContainer = styled.div`
  color: rgba(92, 14, 21, 1);
  max-width: 656px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  h2 {
    text-align: left;
    font-feature-settings: "case";
  }
  @media (max-width: 1080px) {
    gap: 24px;
    h2 {
      font-feature-settings: "case";
      text-align: center;
    }
    max-width: calc(100vw - 32px);
  }
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.li`
  display: flex;
  gap: 20px;
  align-items: center;
  color: rgba(92, 14, 21, 1);
`;

const CheckmarkContainer = styled.div`
  object-fit: cover;
`;

const ListItemText = styled.div`
  flex: 1;
`;

const StyledFlex = styled.div<{ $imagePosition?: "left" | "right" }>`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.$imagePosition === "left" ? "row-reverse" : "row")};
  justify-content: space-between;
  gap: 32px;
  align-items: center;
  @media (max-width: 1080px) {
    flex-direction: column;
    gap: 28px;
    padding-top: 22.88px;
  }
`;

const StyledImageContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 1080px) {
    position: relative;
    width: calc(100vw - 32px);
    height: 335px;
    margin: auto;
  }
`;

const StyledFirstAsterisk = styled.div`
  position: absolute;
  top: -134px;
  left: -156px;
  z-index: 2;
  @media (max-width: 1080px) {
    display: none;
  }
`;

const StyledSecondAsterisk = styled.div`
  position: absolute;
  bottom: -134px;
  left: -156px;
  z-index: 2;
  @media (max-width: 1080px) {
    display: none;
  }
`;

const StyledThirdAsterisk = styled.div`
  position: absolute;
  bottom: -265px;
  right: -156px;
  z-index: 2;
  @media (max-width: 1080px) {
    display: none;
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
  listItems?: string[];
  withAsterisks?: boolean;
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
  listItems,
  withAsterisks,
}: TextWithImageProps) {
  return (
    <StyledContainer id={id} $backgroundColor={backgroundColor} className={className}>
      <Container>
        <StyledFlex $imagePosition={imagePosition}>
          {withAsterisks && (
            <>
              <StyledFirstAsterisk>
                <Image
                  objectFit="contain"
                  width={216}
                  height={216}
                  src="/assets/asterisk-1.png"
                  alt="Decoration"
                />
              </StyledFirstAsterisk>
              <StyledSecondAsterisk>
                <Image
                  objectFit="contain"
                  width={216}
                  height={216}
                  src="/assets/asterisk-2.png"
                  alt="Decoration"
                />
              </StyledSecondAsterisk>
              <StyledThirdAsterisk>
                <Image
                  objectFit="contain"
                  width={216}
                  height={216}
                  src="/assets/asterisk-3.png"
                  alt="Decoration"
                />
              </StyledThirdAsterisk>
            </>
          )}
          <StyledTextContainer>
            <H2>{title}</H2>
            <Typography variant="mBodytext">{subtitle}</Typography>
            {listItems && listItems.length > 0 && (
              <StyledList>
                {listItems.map((item, index) => (
                  <ListItem key={index}>
                    <CheckmarkContainer>
                      <Image src="/assets/checkmark.svg" alt="Checkmark" width={28} height={28} />
                    </CheckmarkContainer>
                    <ListItemText>
                      <Typography variant="mBodytext">{item}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </StyledList>
            )}
          </StyledTextContainer>
          <StyledImageContainer>
            <Desktop>
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                objectFit="cover"
              />
            </Desktop>
            <Mobile>
              <Image src={imageSrc} alt={imageAlt} fill objectFit="cover" />
            </Mobile>
          </StyledImageContainer>
        </StyledFlex>
      </Container>
    </StyledContainer>
  );
}
