"use client";
import { getDictionary } from "@/get-dictionary";
import Image from "next/image";
import styled from "styled-components";
import TextWithTags, { TagItem } from "./ui/TextWithTags";
import { H2 } from "./ui/Typography";
import { Desktop, Tablet } from "./ui/Responsive";

const StyledContainer = styled.div`
  position: relative;
  padding: 134px 0 20px 0;
  background: #fcfcfc;
  color: rgba(92, 14, 21, 1);
  text-align: center;
  max-width: 1114px;
  margin: auto;
  h2 {
    font-feature-settings: "case";
    text-align: center;
    max-width: 656px;
    margin: auto;
    @media (max-width: 1366px) {
      max-width: 343px;
    }
  }
  @media (max-width: 1366px) {
    padding: 62px 0 14px 0;
  }
`;

const StyledWhite = styled.div`
  background: #fcfcfc;
  width: 100%;
  overflow: hidden;
`;

const StyledFirstAsterisk = styled.div`
  position: absolute;
  top: -11px;
  right: -216px;
  z-index: 2;
  @media (max-width: 1366px) {
    right: -32px;
    top: 35px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledSecondAsterisk = styled.div`
  position: absolute;
  bottom: 0px;
  left: -271px;
  z-index: 2;
  @media (max-width: 1366px) {
    left: -30px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export default function VitaminTags({
  dictionary,
  enableStickyEffect = true,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["vitaminTags"];
  enableStickyEffect?: boolean;
}) {
  // Create left and right tag arrays
  const leftTags: TagItem[] = [
    {
      text: dictionary.contains,
      iconSrc: "/assets/vitamin/1.png",
      iconAlt: "Anti-Bacterial",
    },
    {
      text: dictionary.helps,
      iconSrc: "/assets/vitamin/2.png",
      iconAlt: "Mental Health",
    },
    {
      text: dictionary.recovers,
      iconSrc: "/assets/vitamin/3.png",
      iconAlt: "Liver Function",
    },
  ];

  const rightTags: TagItem[] = [
    {
      text: dictionary.healthy,
      iconSrc: "/assets/vitamin/4.png",
      iconAlt: "Better Breath",
    },
    {
      text: dictionary.bio,
      iconSrc: "/assets/vitamin/5.png",
      iconAlt: "Sugar",
    },
    {
      text: dictionary.balance,
      iconSrc: "/assets/vitamin/6.png",
      iconAlt: "Heart",
    },
  ];

  return (
    <>
      <StyledWhite>
        <StyledContainer>
          <StyledFirstAsterisk>
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
          </StyledFirstAsterisk>
          <StyledSecondAsterisk>
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
          </StyledSecondAsterisk>

          <H2>{dictionary.title}</H2>

          <TextWithTags
            filledImageSrc="/assets/vitamin-filled.png"
            filledImageMobileSrc="/assets/vitamin-filled-mobile.png"
            leftTags={leftTags}
            middleImageSrc="/assets/vitamin-filled.png"
            rightTags={rightTags}
            middleImageAlt="Middle Image"
            enableStickyEffect={enableStickyEffect}
            enableSlideAnimation={true}
            uniqueId="vitamin-component"
          />
        </StyledContainer>
      </StyledWhite>
    </>
  );
}
