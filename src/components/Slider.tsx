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
  padding: 140px 0 139px 0;
  padding-top: 229px;
  display: flex;
  justify-content: center;
  position: relative;
  transition: background-color 0.6s ease;
  @media (max-width: 1080px) {
    padding: 73px 0 54px 0;
  }
`;

const backgroundColors = [
  "rgb(232 106 118)", // Raspberry
  "rgb(239 153 161)", // Cherry
  "rgb(241 216 115)", // Ginger
  "rgb(191 217 246)", // Lime
  "rgb(185 191 115)", // Lime & lemon water
  "rgb(252 233 235)", // Cherry water
];

const StyledBox = styled.div`
  color: rgba(92, 14, 21, 1);
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  cursor: pointer;
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
    margin-bottom: 2px;
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

// Utility function to convert RGB to hue for filter
const getHueFromRGB = (rgb: string): number => {
  const [r, g, b] = rgb
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((val) => parseInt(val.trim()) / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;

  if (max === min) return 0;

  if (max === r) {
    hue = (g - b) / (max - min);
  } else if (max === g) {
    hue = 2 + (b - r) / (max - min);
  } else {
    hue = 4 + (r - g) / (max - min);
  }

  hue *= 60;
  return hue < 0 ? hue + 360 : hue;
};

export default function Slider({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["slider"];
}) {
  const [activeIndex, setActiveIndex] = useState(1);
  const swiperRef = useRef<SwiperRef | null>(null);
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[1]);
  const [animationDirection, setAnimationDirection] = useState("left");
  const [activeProductType, setActiveProductType] = useState("kombucha");

  const kombuchaBottles = [
    {
      src: "/assets/slider/raspKombucha.png",
      alt: "Raspberry Kombucha",
      flavor: dictionary.bottleTypeRasp,
      color: backgroundColors[0], // Raspberry
    },
    {
      src: "/assets/slider/cherryKombucha.png",
      alt: "Cherry Kombucha",
      flavor: dictionary.bottleTypeCherry,
      color: backgroundColors[1], // Cherry
    },
    {
      src: "/assets/slider/gingerKombucha.png",
      alt: "Ginger Kombucha",
      flavor: dictionary.bottleTypeGinger,
      color: backgroundColors[2], // Ginger
    },
    {
      src: "/assets/slider/limeKombucha.png",
      alt: "Blueberry Lime",
      flavor: dictionary.bottleTypeLime,
      color: backgroundColors[3], // Lime
    },
  ];

  const waterBottles = [
    {
      src: "/assets/slider/cherryWaterKombucha.png",
      alt: "Cherry Water Kombucha",
      flavor: dictionary.bottleTypeCherryWater,
      color: backgroundColors[5], // Cherry water
    },
    {
      src: "/assets/slider/limeWaterKombucha.png",
      alt: "Lime Water Kombucha",
      flavor: dictionary.bottleTypeLimeWater,
      color: backgroundColors[4], // Lime & lemon water
    },
  ];

  const currentBottles = activeProductType === "kombucha" ? kombuchaBottles : waterBottles;

  const slidesData =
    activeProductType === "kombucha"
      ? [...kombuchaBottles, ...kombuchaBottles, ...kombuchaBottles]
      : waterBottles;

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

  const switchProductType = (type: string) => {
    setActiveProductType(type);
    setTimeout(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideToLoop(0);
        setActiveIndex(0);
      }
    }, 0);
  };

  useEffect(() => {
    const colorIndex = activeIndex % currentBottles.length;
    setBackgroundColor(currentBottles[colorIndex].color);
  }, [activeIndex, activeProductType, currentBottles]);

  return (
    <StyledContainer id="products" style={{ backgroundColor: backgroundColor }}>
      <BackgroundLayer
        key={`${activeIndex}-${animationDirection}-${activeProductType}`}
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
          <StyledProduct
            onClick={() => switchProductType("kombucha")}
            style={{ textDecoration: activeProductType === "kombucha" ? "underline" : "none" }}
          >
            <Typography variant="mBodytext">{dictionary.kombucha}</Typography>
          </StyledProduct>
          <StyledProduct
            onClick={() => switchProductType("water")}
            style={{ textDecoration: activeProductType === "water" ? "underline" : "none" }}
          >
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
            slidesPerView={activeProductType === "kombucha" ? 3 : 1}
            centeredSlides={true}
            loop={true}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            initialSlide={activeProductType === "kombucha" ? 1 : 0}
            key={`swiper-${activeProductType}`}
          >
            {slidesData.map((bottle, index) => (
              <SwiperSlide key={`${activeProductType}-${index}`}>
                {({ isActive }) => (
                  <BottleImage
                    className={isActive || activeProductType === "water" ? "active" : "side"}
                  >
                    <Image
                      src={bottle.src}
                      alt={bottle.alt}
                      width={164}
                      height={450}
                      style={{
                        filter: `brightness(1.2) sepia(1) hue-rotate(${getHueFromRGB(
                          bottle.color
                        )}deg) saturate(1.5)`,
                      }}
                    />
                  </BottleImage>
                )}
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </SwiperWrapper>

        <FlavorsDisplay>
          <Typography variant="lBodytext">
            {activeIndex !== undefined &&
              currentBottles[activeIndex % currentBottles.length]?.flavor}
          </Typography>
        </FlavorsDisplay>
      </StyledBox>
    </StyledContainer>
  );
}
