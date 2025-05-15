"use client";
import Image from "next/image";
import styled from "styled-components";
import Container from "./Container";
import { Desktop, Mobile, Tablet } from "./Responsive";
import Typography, { H2 } from "./Typography";

const StyledContainer = styled.div<{ $backgroundColor?: string }>`
  position: relative;
  background-color: ${(props) => props.$backgroundColor || "#fcfcfc"};
  height: 650px;

  @media (max-width: 1366px) {
    height: auto;
  }
`;

const StyledTextContainer = styled.div<{ $imagePosition?: "left" | "right" }>`
  color: rgba(92, 14, 21, 1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: ${(props) => (props.$imagePosition === "left" ? "656px" : "541px")};
  h2 {
    text-align: left;
    font-feature-settings: "case";
    max-width: ${(props) => (props.$imagePosition === "left" ? "656px" : "541px")};
  }
  @media (max-width: 1366px) {
    h2 {
      font-feature-settings: "case";
      max-width: 720px;
    }
    gap: ${(props) => (props.$imagePosition === "left" ? "20px" : "11.56px")};
    max-width: calc(100vw - 48px);
  }
  @media (max-width: 768px) {
    gap: 24px;
    max-width: calc(100vw - 32px);
    h2 {
      margin: auto;
      text-align: center;
    }
  }
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1366px) {
    margin-top: 12px;
  }
`;

const ListItem = styled.li`
  display: flex;
  gap: 20px;
  color: rgba(92, 14, 21, 1);
`;

const CheckmarkContainer = styled.div`
  margin-top: 4px;
`;

const ListItemText = styled.div`
  flex: 1;
`;

const StyledFlex = styled.div<{ $imagePosition?: "left" | "right" }>`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.$imagePosition === "left" ? "row-reverse" : "row")};
  gap: ${(props) => (props.$imagePosition === "left" ? "32px" : "147px")};
  align-items: center;
  @media (max-width: 1366px) {
    flex-direction: column;
    padding-top: 53.18px;
    gap: 32px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 30px;
    gap: 28px;
  }
`;

const StyledImageContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  object-fit: contain;
  @media (max-width: 1366px) {
    position: relative;
    width: calc(100vw - 48px);
    margin: auto;
    height: 450px;
  }
  @media (max-width: 768px) {
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
  @media (max-width: 1366px) {
    left: 94%;
    top: 0;
  }
`;

const StyledSecondAsterisk = styled.div`
  position: absolute;
  bottom: -134px;
  left: -156px;
  z-index: 2;
  @media (max-width: 1366px) {
    left: -50px;
  }
  @media (max-width: 768px) {
    left: 94%;
    bottom: -1250px;
  }
`;

const StyledSecondAsterisk2 = styled.div`
  position: absolute;
  display: none;
  @media (max-width: 768px) {
    display: block;
    right: -12px;
    top: 0px;
  }
`;

const StyledThirdAsterisk = styled.div`
  position: absolute;
  bottom: -265px;
  right: -156px;
  z-index: 2;
  @media (max-width: 1366px) {
    right: -30px;
    bottom: -200px;
  }
  @media (max-width: 768px) {
    left: -30px;
    bottom: -80px;
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
                <Desktop>
                  <Image
                    objectFit="contain"
                    width={216}
                    height={216}
                    src="/assets/asterisk-1.png"
                    alt="Decoration"
                  />
                </Desktop>
                <Tablet>
                  <Image
                    objectFit="contain"
                    width={100}
                    height={100}
                    src="/assets/asterisk-1.png"
                    alt="Decoration"
                  />
                </Tablet>
                <Mobile>
                  <Image
                    objectFit="contain"
                    width={60}
                    height={60}
                    src="/assets/asterisk-1.png"
                    alt="Decoration"
                  />
                </Mobile>
              </StyledFirstAsterisk>
              <StyledSecondAsterisk>
                <Desktop>
                  <Image
                    objectFit="contain"
                    width={216}
                    height={216}
                    src="/assets/asterisk-2.png"
                    alt="Decoration"
                  />
                </Desktop>
                <Tablet>
                  <Image
                    objectFit="contain"
                    width={100}
                    height={100}
                    src="/assets/asterisk-2.png"
                    alt="Decoration"
                  />
                </Tablet>
                <Mobile>
                  <Image
                    objectFit="contain"
                    width={60}
                    height={60}
                    src="/assets/asterisk-2.png"
                    alt="Decoration"
                  />
                </Mobile>
              </StyledSecondAsterisk>
              <StyledThirdAsterisk>
                <Desktop>
                  <Image
                    objectFit="contain"
                    width={216}
                    height={216}
                    src="/assets/asterisk-3.png"
                    alt="Decoration"
                  />
                </Desktop>
                <Tablet>
                  <Image
                    objectFit="contain"
                    width={100}
                    height={90.76}
                    src="/assets/asterisk-3.png"
                    alt="Decoration"
                  />
                </Tablet>
                <Mobile>
                  <Image
                    objectFit="contain"
                    width={60}
                    height={60}
                    src="/assets/asterisk-3.png"
                    alt="Decoration"
                  />
                </Mobile>
              </StyledThirdAsterisk>
            </>
          )}
          <StyledTextContainer $imagePosition={imagePosition}>
            <H2>{title}</H2>
            <Desktop>
              <Typography variant="mBodytext">{subtitle}</Typography>
            </Desktop>
            <Tablet>
              <Typography variant="mBodytext">{subtitle}</Typography>
            </Tablet>
            <Mobile>
              <Typography variant="sBodytext">{subtitle}</Typography>
            </Mobile>

            <StyledSecondAsterisk2>
              <Mobile>
                <Image
                  objectFit="contain"
                  width={60}
                  height={60}
                  src="/assets/asterisk-2.png"
                  alt="Decoration"
                />
              </Mobile>
            </StyledSecondAsterisk2>

            {listItems && listItems.length > 0 && (
              <StyledList>
                {listItems.map((item, index) => (
                  <ListItem key={index}>
                    <CheckmarkContainer>
                      <Desktop>
                        <Image src="/assets/checkmark.svg" alt="Checkmark" width={28} height={28} />
                      </Desktop>
                      <Tablet>
                        <Image src="/assets/checkmark.svg" alt="Checkmark" width={28} height={28} />
                      </Tablet>
                      <Mobile>
                        <Image src="/assets/checkmark.svg" alt="Checkmark" width={20} height={20} />
                      </Mobile>
                    </CheckmarkContainer>
                    <Desktop>
                      <ListItemText>
                        <Typography variant="mBodytext">{item}</Typography>
                      </ListItemText>
                    </Desktop>
                    <Tablet>
                      <ListItemText>
                        <Typography variant="mBodytext">{item}</Typography>
                      </ListItemText>
                    </Tablet>
                    <Mobile>
                      <ListItemText>
                        <Typography variant="sBodytext">{item}</Typography>
                      </ListItemText>
                    </Mobile>
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
            <Tablet>
              <Image src={imageSrc} alt={imageAlt} fill objectFit="cover" />
            </Tablet>
            <Mobile>
              <Image src={imageSrc} alt={imageAlt} fill objectFit="cover" />
            </Mobile>
          </StyledImageContainer>
        </StyledFlex>
      </Container>
    </StyledContainer>
  );
}
