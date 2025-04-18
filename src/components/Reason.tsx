"use client";
import { getDictionary } from "@/get-dictionary";
import Head from "next/head";
import styled from "styled-components";
import TextWithTags, { TagItem } from "./ui/TextWithTags";
import { H2 } from "./ui/Typography";

const StyledContainer = styled.div`
  padding: 134px 0;
  background: #fcfcfc;
  color: rgba(92, 14, 21, 1);
  text-align: center;
  max-width: 1114px;
  margin: auto;
  @media (max-width: 1080px) {
    h2 {
      font-feature-settings: "case";
      text-align: center;
    }
  }
`;

const StyledWhite = styled.div`
  background: #fcfcfc;
`;

export default function Reason({
  dictionary,
  enableStickyEffect = true,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["reason"];
  enableStickyEffect?: boolean;
}) {
  // Create left and right tag arrays
  const leftTags: TagItem[] = [
    {
      text: dictionary.antiBacterial,
      iconSrc: "/assets/why/1.png",
      iconAlt: "Anti-Bacterial",
    },
    {
      text: dictionary.mentalHealth,
      iconSrc: "/assets/why/2.png",
      iconAlt: "Mental Health",
    },
    {
      text: dictionary.liverFunction,
      iconSrc: "/assets/why/3.png",
      iconAlt: "Liver Function",
    },
  ];

  const rightTags: TagItem[] = [
    {
      text: dictionary.betterBreath,
      iconSrc: "/assets/why/4.png",
      iconAlt: "Better Breath",
    },
    {
      text: dictionary.sugar,
      iconSrc: "/assets/why/5.png",
      iconAlt: "Sugar",
    },
    {
      text: dictionary.heart,
      iconSrc: "/assets/why/6.png",
      iconAlt: "Heart",
    },
  ];

  return (
    <>
      {enableStickyEffect && (
        <Head>
          <link rel="preload" href="/assets/why/sticky-filled.png" as="image" type="image/png" />
        </Head>
      )}
      <StyledWhite>
        <StyledContainer>
          <H2>{dictionary.whyUs}</H2>
          <TextWithTags
            leftTags={leftTags}
            rightTags={rightTags}
            middleImageSrc="/assets/why/middle.png"
            middleImageAlt="Middle Image"
            filledImageSrc="/assets/why/sticky-filled.png"
            filledImageMobileSrc="/assets/why/sticky-filled-mobile.png"
            stickyImageSrc="/assets/why/sticky.png"
            enableStickyEffect={enableStickyEffect}
          />
        </StyledContainer>
      </StyledWhite>
    </>
  );
}
