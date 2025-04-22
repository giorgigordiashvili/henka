"use client";
import { getDictionary } from "@/get-dictionary";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/effect-creative";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import Typography from "./ui/Typography";

const StyledContainer = styled(motion.div)`
  padding: 140px 20px;
  padding-top: 229px;
  display: flex;
  justify-content: center;
  position: relative;
  transition: background-color 0.6s ease;
  @media (max-width: 1080px) {
    padding: 50px 0 54px 0;
  }
`;

const backgroundColors = [
  "rgb(232 106 118)", // Raspberry
  "rgb(239 153 161)", // Cherry
  "rgb(241 216 115)", // Ginger
];

const StyledBox = styled.div`
  color: rgba(92, 14, 21, 1);
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  position: relative;
  z-index: 1;
  @media (max-width: 1080px) {
    gap: 16px;
  }
`;

const StyledTitle = styled.div`
  text-align: center;
  width: 656px;
  text-transform: uppercase;
  @media (max-width: 1080px) {
    text-wrap: wrap;
    width: 343px;
    font-size: 24px;
  }
`;

const StyledProduct = styled.div`
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const StyledProducts = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 1080px) {
  }
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
    width: 12.14px;
    height: 24.28px;
    @media (max-width: 1080px) {
      width: 6px;
      height: 12px;
    }
  }
`;

const PrevButton = styled(NavButton)`
  left: 150px;
  @media (max-width: 1080px) {
    left: calc((100% - 160px) / 2);
  }
`;

const NextButton = styled(NavButton)`
  right: 150px;
  @media (max-width: 1080px) {
    right: calc((100% - 160px) / 2);
  }
`;

const CircleBackground = styled.div`
  width: 456px;
  height: 456px;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
  filter: blur(85px);
  @media (max-width: 1080px) {
    top: 50%;
    width: calc(100% - 32px);
    height: 200px;
  }
`;

const BottleImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  img {
    transition: all 0.3s ease;
    object-fit: contain;
  }

  &.active img,
  &.active span {
    width: 164px !important;
    height: 450px !important;
  }

  &.side img,
  &.side span {
    width: 120px !important;
    height: 336px !important;
  }

  @media (max-width: 1080px) {
    &.active img,
    &.active span {
      width: 160px !important;
      height: 443px !important;
    }
    &.side img,
    &.side span {
      width: 86px !important;
      height: 242px !important;
    }
  }
`;

const FlavorsDisplay = styled.div`
  text-align: center;
  font-weight: bold;
  position: relative;
  z-index: 1;

  @media (max-width: 1080px) {
    font-size: 14px;
  }
`;

const BackgroundLayer = styled(motion.div)<{ animationDirection: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  transform-origin: ${(props) => props.animationDirection};
  pointer-events: none;
  backface-visibility: hidden;
`;

export default function Slider({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["slider"];
}) {
  const [activeIndex, setActiveIndex] = useState(1);
  const swiperRef = useRef<SwiperRef | null>(null);
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[1]);
  const [animationDirection, setAnimationDirection] = useState("left"); // Default direction

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
  ];

  const slidesData = [...bottles, ...bottles, ...bottles];

  const handlePrev = () => {
    setAnimationDirection("left");
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    setAnimationDirection("right");
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  useEffect(() => {
    setBackgroundColor(backgroundColors[activeIndex % backgroundColors.length]);
  }, [activeIndex]);

  return (
    <StyledContainer id="products" style={{ backgroundColor: backgroundColor }}>
      <BackgroundLayer
        key={`${activeIndex}-${animationDirection}`} // Key changes when direction changes
        initial={{
          rotateY: animationDirection === "right" ? -90 : 90,
        }}
        animate={{
          rotateY: 0,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ backgroundColor: backgroundColor }}
        animationDirection={animationDirection}
      />
      <CircleBackground />

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
              width="12.14"
              height="24.28"
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
              width="12.14"
              height="24.28"
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
                    <Image src={bottle.src} alt={bottle.alt} width={164} height={450} />
                  </BottleImage>
                )}
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </SwiperWrapper>

        <FlavorsDisplay>
          <Typography variant="lBodytext">
            {activeIndex !== undefined && bottles[activeIndex % bottles.length]?.flavor}
          </Typography>
        </FlavorsDisplay>
      </StyledBox>
    </StyledContainer>
  );
}
