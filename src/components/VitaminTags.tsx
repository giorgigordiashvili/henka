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
    padding: 62px 0 60px 0;
  }
`;

const StyledWhite = styled.div`
  background: #fcfcfc;
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
      {enableStickyEffect && (
        <Head>
          <link rel="preload" href="/assets/why/sticky-filled.png" as="image" type="image/png" />
        </Head>
      )}
      <StyledWhite>
        <StyledContainer>
          <H2>{dictionary.title}</H2>
          <TextWithTags
            filledImageSrc="/assets/vitamin-filled.png"
            filledImageMobileSrc="/assets/vitamin-filled-mobile.png"
            leftTags={leftTags}
            rightTags={rightTags}
            middleImageSrc="/assets/vitamin-filled.png"
            middleImageAlt="Middle Image"
          />
        </StyledContainer>
      </StyledWhite>
    </>
  );
}
