"use client";
import { getDictionary } from "@/get-dictionary";
import Image from "next/image";
import FastMarquee from "react-fast-marquee";
import styled from "styled-components";
import { Desktop, Mobile, Tablet } from "./ui/Responsive";

interface MarqueeItem {
  text: string;
  image: string;
  alt: string;
}

const StyledContainer = styled.div`
  background-color: rgba(231, 223, 238, 1);
  height: 818.5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1366px) {
    height: 475px;
  }
  @media (max-width: 768px) {
    height: 331px;
  }
`;

const StyledUnionContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 167px;
  top: -1px;
  @media (max-width: 1366px) {
    height: 42.98px;
  }
`;

const StyledBottomUnionContainer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 167px;
  @media (max-width: 1366px) {
    height: 42.98px;
  }
`;

const StyledText = styled.div`
  width: 100%;
  font-size: 90px;
  font-weight: 700;
  letter-spacing: 0;
  color: #5c0e15;
  font-feature-settings: "case";
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;
  @media (max-width: 1366px) {
    height: auto;
    font-size: 65.95px;
    line-height: 100%;
  }
  @media (max-width: 768px) {
    height: auto;
    font-size: 32.09px;
    line-height: 100%;
  }
`;

const MarqueeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: 40px; // Slightly reduced margin for more compact layout
  text-transform: uppercase;
  @media (max-width: 1366px) {
    margin-right: 20px;
    gap: 10px;
  }
`;

const StyledMobileGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33.66px;
  @media (max-width: 768px) {
    gap: 11.72px;
  }
`;

export default function Marquee({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["marquee"];
}) {
  const marqueeTexts = [
    dictionary.energy,
    dictionary.health,
    dictionary.ingredients,
    dictionary.probiotics,
    dictionary.vitamin,
  ];

  const marqueeImages = [
    "/assets/marquee/blueberry.png",
    "/assets/marquee/leaf.png",
    "/assets/marquee/ginger.png",
    "/assets/marquee/passion.png",
    "/assets/marquee/pineberry.png",
  ];

  // Create three different marquee arrays with carefully controlled patterns
  // to ensure fruits and words don't match simultaneously across the three lines
  const marqueeOne: MarqueeItem[] = marqueeTexts.map((text, index) => ({
    text,
    image: marqueeImages[index % marqueeImages.length],
    alt: text,
  }));

  const marqueeTwo: MarqueeItem[] = marqueeTexts.map((text, index) => ({
    text: marqueeTexts[(index + 2) % marqueeTexts.length], // Offset words by 2
    image: marqueeImages[index % marqueeImages.length],
    alt: text,
  }));

  const marqueeThree: MarqueeItem[] = marqueeTexts.map((text, index) => ({
    text: marqueeTexts[(index + 4) % marqueeTexts.length], // Offset words by 4
    image: marqueeImages[(index + 3) % marqueeImages.length], // Offset images by 3
    alt: text,
  }));

  // Duplicate items to fill any potential gaps
  const duplicateItems = (items: MarqueeItem[]) => {
    return [...items, ...items, ...items]; // Triple the items to ensure sufficient content
  };

  const duplicatedMarqueeOne = duplicateItems(marqueeOne);
  const duplicatedMarqueeTwo = duplicateItems(marqueeTwo);
  const duplicatedMarqueeThree = duplicateItems(marqueeThree);

  return (
    <StyledContainer>
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
      <StyledBottomUnionContainer>
        <Desktop>
          <Image src="/assets/union-1.png" alt="Union" fill />
        </Desktop>
        <Tablet>
          <Image src="/assets/union-1.png" alt="Union" fill />
        </Tablet>
        <Mobile>
          <Image src="/assets/union-1-mobile.png" alt="Union" fill />
        </Mobile>
      </StyledBottomUnionContainer>
      <StyledText>
        <Desktop>
          <FastMarquee speed={500} gradient={false} direction="left" pauseOnHover={false}>
            {duplicatedMarqueeOne.map((item, itemIndex) => (
              <MarqueeItem key={`row1-${itemIndex}`}>
                <span>{item.text}</span>
                <Image width={115} height={115} alt={item.alt} src={item.image} />
              </MarqueeItem>
            ))}
          </FastMarquee>

          <FastMarquee speed={500} gradient={false} direction="left" pauseOnHover={false}>
            {duplicatedMarqueeTwo.map((item, itemIndex) => (
              <MarqueeItem key={`row2-${itemIndex}`}>
                <Image width={115} height={115} alt={item.alt} src={item.image} />
                <span>{item.text}</span>
              </MarqueeItem>
            ))}
          </FastMarquee>

          <FastMarquee speed={500} gradient={false} direction="left" pauseOnHover={false}>
            {duplicatedMarqueeThree.map((item, itemIndex) => (
              <MarqueeItem key={`row3-${itemIndex}`}>
                <Image width={115} height={115} alt={item.alt} src={item.image} />
                <span>{item.text}</span>
              </MarqueeItem>
            ))}
          </FastMarquee>
        </Desktop>

        <Tablet>
          <FastMarquee speed={500} gradient={false} direction="left" pauseOnHover={false}>
            {duplicatedMarqueeOne.map((item, itemIndex) => (
              <MarqueeItem key={`row1-${itemIndex}`}>
                <span>{item.text}</span>
                <Image width={84.27} height={84.27} alt={item.alt} src={item.image} />
              </MarqueeItem>
            ))}
          </FastMarquee>

          <FastMarquee speed={500} gradient={false} direction="left" pauseOnHover={false}>
            {duplicatedMarqueeTwo.map((item, itemIndex) => (
              <MarqueeItem key={`row2-${itemIndex}`}>
                <Image width={84.27} height={84.27} alt={item.alt} src={item.image} />
                <span>{item.text}</span>
              </MarqueeItem>
            ))}
          </FastMarquee>

          <FastMarquee speed={500} gradient={false} direction="left" pauseOnHover={false}>
            {duplicatedMarqueeThree.map((item, itemIndex) => (
              <MarqueeItem key={`row3-${itemIndex}`}>
                <Image width={84.27} height={84.27} alt={item.alt} src={item.image} />
                <span>{item.text}</span>
              </MarqueeItem>
            ))}
          </FastMarquee>
        </Tablet>

        <Mobile>
          <StyledMobileGap>
            <FastMarquee speed={500} gradient={false} direction="left" pauseOnHover={false}>
              {duplicatedMarqueeOne.map((item, itemIndex) => (
                <MarqueeItem key={`mrow1-${itemIndex}`}>
                  <span>{item.text}</span>
                  <Image width={41} height={41} alt={item.alt} src={item.image} />
                </MarqueeItem>
              ))}
            </FastMarquee>

            <FastMarquee speed={500} gradient={false} direction="left" pauseOnHover={false}>
              {duplicatedMarqueeTwo.map((item, itemIndex) => (
                <MarqueeItem key={`mrow2-${itemIndex}`}>
                  <Image width={41} height={41} alt={item.alt} src={item.image} />
                  <span>{item.text}</span>
                </MarqueeItem>
              ))}
            </FastMarquee>

            <FastMarquee speed={500} gradient={false} direction="left" pauseOnHover={false}>
              {duplicatedMarqueeThree.map((item, itemIndex) => (
                <MarqueeItem key={`mrow3-${itemIndex}`}>
                  <span>{item.text}</span>
                  <Image width={41} height={41} alt={item.alt} src={item.image} />
                </MarqueeItem>
              ))}
            </FastMarquee>
          </StyledMobileGap>
        </Mobile>
      </StyledText>
    </StyledContainer>
  );
}
