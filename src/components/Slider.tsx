"use client";
import React, { useState, useRef } from "react";
import Typography from "./ui/Typography";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getDictionary } from "@/get-dictionary";

const StyledContainer = styled.div`
  background-color: rgb(239 153 161);
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledBox = styled.div`
  color: rgba(92, 14, 21, 1);
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const StyledTitle = styled.div`
  text-align: center;
  margin-bottom: 10px;
  width: 656px;
`;

const StyledProduct = styled.div`
  text-align: center;
  font-weight: 700;
  margin-bottom: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledProducts = styled.div`
  display: flex;
  gap: 20px;
`;

const SwiperWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48.56px;
  height: 48.56px;
  z-index: 10;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
  }

  svg {
    width: 15px;
    height: 28px;
  }
`;

const PrevButton = styled(NavButton)`
  left: 150px;
`;

const NextButton = styled(NavButton)`
  right: 150px;
`;

const BottleImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;
  transition: all 0.3s ease;

  img {
    transition: all 0.3s ease;
    object-fit: contain;
  }

  &.active img {
    width: 164px;
    height: 450px;
    object-fit: contain;
  }

  &.side img {
    width: 120px;
    height: 336px;
    opacity: 0.8;
    object-fit: contain;
  }
`;

const FlavorsDisplay = styled.div`
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
`;

export default function Slider({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["slider"];
}) {
  const [activeIndex, setActiveIndex] = useState(1);
  const swiperRef = useRef(null);

  const bottles = [
    {
      src: "/assets/slider/raspKombucha.png",
      alt: "Raspberry Kombucha",
      flavor: dictionary.bottleTypeRasp,
    },
    {
      src: "/assets/slider/cherryKombucha.png",
      alt: "Cherry Kombucha",
      flavor: dictionary.bottleTypeCherry,
    },
    {
      src: "/assets/slider/gingerKombucha.png",
      alt: "Ginger Kombucha",
      flavor: dictionary.bottleTypeGinger,
    },
    {
      src: "assets/slider/limeKombucha.png",
      alt: "Blueberry Lime",
      flavor: dictionary.bottleTypeLime,
    },
  ];

  const slidesData = [...bottles, ...bottles, ...bottles];

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <StyledContainer>
      <StyledBox>
        <StyledTitle>
          <Typography variant="h2">{dictionary.title}</Typography>
        </StyledTitle>
        <StyledProducts>
          <StyledProduct>
            <Typography variant="mBodytext">{dictionary.kombucha}</Typography>
          </StyledProduct>
          <StyledProduct>
            <Typography variant="mBodytext">{dictionary.water}</Typography>
          </StyledProduct>
        </StyledProducts>

        <SwiperWrapper>
          <PrevButton onClick={handlePrev}>
            <svg
              width="15"
              height="28"
              viewBox="0 0 15 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.867 26.1402L1.72656 13.9998L13.867 1.85938"
                stroke="#5C0E15"
                strokeWidth="1.82106"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </PrevButton>
          <NextButton onClick={handleNext}>
            <svg
              width="15"
              height="28"
              viewBox="0 0 15 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.14083 26.1402L13.2812 13.9998L1.14083 1.85938"
                stroke="#5C0E15"
                strokeWidth="1.82106"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NextButton>
          <StyledSwiper
            ref={swiperRef}
            spaceBetween={10}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            initialSlide={1}
          >
            {slidesData.map((bottle, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <BottleImage className={isActive ? "active" : "side"}>
                    <img src={bottle.src} alt={bottle.alt} />
                  </BottleImage>
                )}
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </SwiperWrapper>

        <FlavorsDisplay>
          <Typography variant="lBodytext">
            {activeIndex !== undefined &&
              bottles[activeIndex % bottles.length]?.flavor}
          </Typography>
        </FlavorsDisplay>
      </StyledBox>
    </StyledContainer>
  );
}
