"use client";
import { getDictionary } from "@/get-dictionary";
import Image from "next/image";
import styled from "styled-components";
import Container from "./ui/Container";
import MenuItem from "./ui/MenuItem";
import { Desktop, Mobile, Tablet } from "./ui/Responsive";
import Typography from "./ui/Typography";

const StyledContainer = styled.div`
  height: 100vh;
  position: relative;
  margin-top: 142px;
  @media (max-width: 1279px) {
    margin-top: 64px;
    height: auto;
    padding-bottom: 105px;
  }
`;

const StyledUnionContainer = styled.div`
  position: absolute;
  bottom: -1px;
  width: 100%;
  height: 167px;
  @media (max-width: 1279px) {
    height: 42.98px;
  }
`;

const StyledFruitsContainer = styled.div`
  position: absolute;
  width: 1481px;
  left: -68.5px;
  height: calc(100vh - 78px - 167px);
  pointer-events: none;
  animation: bounceAnimation 3s ease-in-out infinite;

  @media (max-width: 768px) {
    z-index: 5;
    height: 100%;
    width: 100%;
    left: 0px;
  }
  @media (max-width: 1279px) {
    z-index: 5;
    height: 100%;
    width: 100%;
    left: 0px;
  }
  @media (max-height: 1000px) and (max-width: 1450px) {
    height: 150vh;
  }
`;

const StyledContentContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 427fr 425fr 427fr;
  height: 100%;
  align-items: center;
  gap: 20px;
  height: calc(100vh - 78px - 167px);
  @media (max-width: 1279px) {
    grid-template-columns: 352fr 352fr;
    height: auto;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 23px;
    height: auto;
  }
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 99;

  @media (max-width: 1366px) {
    h1 {
      font-size: 45px;
      line-height: 55px;
    }
  }
  @media (max-width: 1279px) {
    margin: 0 0 0 24px;
    min-width: 352px;
    gap: 10px;
  }

  @media (max-width: 700px) {
    h1 {
      font-size: 32px;
      line-height: 40px;
    }
  }
  @media (max-width: 415px) {
    h1 {
      font-size: 28px;
      line-height: 36px;
    }
  }
  @media (max-width: 768px) {
    margin: 0 16px;
    padding-top: 25px;
    min-width: 0;
  }
`;

const StyledTagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 44px;
`;

const StyledBlurWithBottles = styled.div`
  width: 456px;
  height: 456px;
  position: relative;

  @media (max-width: 1279px) {
    width: 352px;
    height: 433.32px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: calc((100vw - 32px) / 343 * 389.13);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;
const StyledBlur = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  z-index: 1;
  height: 200px;
  width: 200px;
  filter: blur(100px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 1279px) {
    width: 343px;
    height: 343px;
    filter: blur(100px);
  }
`;

const StyledTagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const StyledPercent = styled.div`
  background: rgba(239, 153, 161, 1);
  padding: 17px 8px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 0px;
  line-height: 36px;
  color: #fff;
  width: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTagText = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  max-width: 206px;
  text-transform: uppercase;
  font-feature-settings: "case";
`;
export default function Hero({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["hero"];
}) {
  return (
    <StyledContainer>
      <Container>
        <StyledContentContainer>
          <StyledTextContainer>
            <Desktop>
              <Typography variant="h1">{dictionary.title}</Typography>
            </Desktop>
            <Tablet>
              <Typography variant="h1">{dictionary.title}</Typography>
            </Tablet>
            <Mobile>
              <Typography variant="h1">{dictionary.title}</Typography>
            </Mobile>

            <Desktop>
              <Typography variant="mBodytext">{dictionary.subtitle}</Typography>
            </Desktop>

            <Tablet>
              <Typography variant="sBodytext">{dictionary.subtitle}</Typography>
            </Tablet>

            <Tablet>
              <MenuItem
                fullWidth={false}
                size="S"
                text={dictionary.button}
                onClick={() => {
                  const element = document.getElementById("aboutUs");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            </Tablet>

            <Desktop>
              <MenuItem
                fullWidth={false}
                size="M"
                text={dictionary.button}
                onClick={() => {
                  const element = document.getElementById("aboutUs");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            </Desktop>
          </StyledTextContainer>

          <StyledBlurWithBottles>
            <Desktop>
              <Image
                src="/assets/bottles-1.png"
                alt="Bottles"
                fill
                style={{
                  zIndex: 3,
                  objectFit: "contain",
                }}
              />
            </Desktop>
            <Mobile>
              <Image
                src="/assets/bottles-1-mobile.png"
                alt="Bottles"
                fill
                style={{
                  zIndex: 3,
                  objectFit: "contain",
                }}
              />
            </Mobile>
            <Tablet>
              <Image
                src="/assets/bottles-1-mobile.png"
                alt="Bottles"
                fill
                style={{
                  zIndex: 3,
                  objectFit: "contain",
                }}
              />
            </Tablet>

            <StyledFruitsContainer>
              <Mobile>
                <Image
                  priority={true}
                  src="/assets/fruits-1-mobile.png"
                  alt="Fruits"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Mobile>
            </StyledFruitsContainer>
            <StyledBlur />
          </StyledBlurWithBottles>
          <Mobile>
            <StyledTextContainer>
              <Mobile>
                <Typography variant="sBodytext">{dictionary.subtitle}</Typography>
              </Mobile>

              <Mobile>
                <MenuItem
                  fullWidth
                  size="M"
                  text={dictionary.button}
                  onClick={() => {
                    const element = document.getElementById("aboutUs");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                />
              </Mobile>
            </StyledTextContainer>
          </Mobile>
          <Desktop>
            <StyledTagsContainer>
              <StyledTagContainer>
                <StyledPercent>100%</StyledPercent>
                <StyledTagText>{dictionary.naturalIngredients}</StyledTagText>
              </StyledTagContainer>
              <StyledTagContainer>
                <StyledPercent>50%</StyledPercent>
                <StyledTagText>{dictionary.vitaminD}</StyledTagText>
              </StyledTagContainer>
              <StyledTagContainer>
                <StyledPercent>99%</StyledPercent>
                <StyledTagText>{dictionary.probiotics}</StyledTagText>
              </StyledTagContainer>
            </StyledTagsContainer>
          </Desktop>
          <StyledFruitsContainer>
            <Tablet>
              <Image
                priority={true}
                src="/assets/fruits-1-tablet.png"
                alt="Fruits"
                fill
                style={{ objectFit: "contain" }}
              />
            </Tablet>
            <Desktop>
              <Image
                priority={true}
                src="/assets/fruits-1.png"
                alt="Fruits"
                fill
                style={{ objectFit: "contain" }}
              />
            </Desktop>
          </StyledFruitsContainer>
        </StyledContentContainer>
      </Container>

      <StyledUnionContainer>
        <Desktop>
          <Image src="/assets/union-1.png" alt="Union" fill />
        </Desktop>
        <Tablet>
          <Image src="/assets/union-1.png" alt="Union" fill />
        </Tablet>
        <Mobile>
          <Image src="/assets/union-1-mobile.png" alt="Union" fill />
        </Mobile>
      </StyledUnionContainer>
    </StyledContainer>
  );
}
