"use client";
import { getDictionary } from "@/get-dictionary";
import Image from "next/image";
import styled, { keyframes } from "styled-components";
import Container from "./ui/Container";
import MenuItem from "./ui/MenuItem";
import { Desktop, Mobile } from "./ui/Responsive";
import Typography from "./ui/Typography";

const StyledContainer = styled.div`
  height: 100vh;
  position: relative;
  margin-top: 142px;
  @media (max-width: 1080px) {
    height: 125vh;
    margin-top: 64px;
  }
`;

const StyledUnionContainer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 167px;
  @media (max-width: 1080px) {
    height: 42.98px;
  }
`;

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const StyledFruitsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 78px - 167px);
  pointer-events: none;
  animation: ${bounceAnimation} 3s ease-in-out infinite;
  @media (max-width: 1080px) {
    z-index: 5;
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

  @media (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    gap: 23px;
  }
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 99;

  @media (max-width: 1080px) {
    margin: 0 16px;
    padding-top: 15px;
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
  @media (max-width: 1080px) {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
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
  @media (max-width: 1080px) {
    width: 343px;
    height: 343px;

    position: relative;
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
            <Typography variant="h1">{dictionary.title}</Typography>
            <Desktop>
              <Typography variant="mBodytext">{dictionary.subtitle}</Typography>
            </Desktop>

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
                style={{ zIndex: 3 }}
                src="/assets/bottles-1.png"
                alt="Bottles"
                fill
                objectFit="contain"
              />
            </Desktop>
            <Mobile>
              <Image
                style={{ zIndex: 3 }}
                src="/assets/bottles-1-mobile.png"
                alt="Bottles"
                fill
                objectFit="contain"
              />
            </Mobile>
            <StyledBlur />
          </StyledBlurWithBottles>
          <Mobile>
            <StyledTextContainer>
              <Mobile>
                <Typography variant="mBodytext">{dictionary.subtitle}</Typography>
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
            <Desktop>
              <Image src="/assets/fruits-1.png" alt="Fruits" fill objectFit="contain" />
            </Desktop>
            <Mobile>
              <Image src="/assets/fruits-1-mobile.png" alt="Fruits" fill objectFit="contain" />
            </Mobile>
          </StyledFruitsContainer>
        </StyledContentContainer>
      </Container>

      <StyledUnionContainer>
        <Desktop>
          <Image src="/assets/union-1.png" alt="Union" fill />
        </Desktop>
        <Mobile>
          <Image src="/assets/union-1-mobile.png" alt="Union" fill />
        </Mobile>
      </StyledUnionContainer>
    </StyledContainer>
  );
}
