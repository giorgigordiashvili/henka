"use client";
import { getDictionary } from "@/get-dictionary";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/effect-creative";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Desktop, Mobile, Tablet } from "./ui/Responsive";
import Typography from "./ui/Typography";

const StyledContainer = styled(motion.div)`
  padding: 140px 0 139px;
  padding-top: 229px;
  display: flex;
  justify-content: center;
  position: relative;
  transition: background-color 0.6s ease;

  @media (max-width: 1279px) {
    padding: 73px 0 84px;
  }
  @media (max-width: 768px) {
    padding: 73px 0 54px;
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
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 1279px) {
    gap: 16px;
  }
`;

const StyledTitle = styled.div`
  text-align: center;
  max-width: 656px;
  text-transform: uppercase;
  font-feature-settings: "case";

  @media (max-width: 1279px) {
    width: 100%;
    font-size: 24px;
    max-width: 343px;
  }
`;

const StyledProducts = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 1279px) {
    margin-bottom: 2px;
  }
`;

const StyledProduct = styled.div`
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  font-feature-settings: "case";
  cursor: pointer;
  position: relative;

  &.active::after {
    content: "";
    position: absolute;
    bottom: -2px; /* 2px padding below text */
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(92, 14, 21, 1);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SwiperWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;
  @media (max-width: 767px) {
    max-width: 150%;
    width: 150%;
  }
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

  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }

  svg {
    width: 12.14px;
    height: 24.28px;

    @media (max-width: 768px) {
      width: 6px;
      height: 12px;
    }
  }
`;

// Desktop offsets
const PrevButton = styled(NavButton)`
  left: 170px;

  @media (max-width: 768px) {
    left: calc((150vw - 160px - 48px) / 2);
  }
`;

const NextButton = styled(NavButton)`
  right: 150px;

  @media (max-width: 768px) {
    right: calc((150vw - 160px - 48px) / 2);
  }
`;

const CircleBackground = styled.div`
  width: 456px;
  height: 456px;
  position: absolute;
  top: 62%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
  filter: blur(85px);

  @media (max-width: 1279px) {
    top: 50%;
    width: calc(100% - 32px);
    height: 200px;
  }
`;

const StyledFruitsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  top: 107px;
  animation: bounceAnimation 3s ease-in-out infinite;
  @media (max-width: 768px) {
    z-index: 998;
    top: 20%;
    height: 70%;
    width: 90%;
  }
  @media (max-width: 1279px) {
    z-index: 998;
    top: 5%;
    height: 90%;
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
    object-fit: cover;
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

  @media (max-width: 1279px) {
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

    @media (max-width: 768px) {
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
  }
`;

const FlavorsDisplay = styled.div`
  text-align: center;
  font-weight: bold;
  position: relative;
  z-index: 1;
  font-feature-settings: "case";

  @media (max-width: 1279px) {
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

const StyledLeafLeftTop = styled.div`
  position: absolute;
  top: 21px;
  left: -12px;
  animation: bounceAnimation 3s ease-in-out infinite;
  @media (min-width: 768px) {
    display: none;
  }
`;
const StyledLeafRightTop = styled.div`
  position: absolute;
  top: 21px;
  animation: bounceAnimation 3s ease-in-out infinite;
  right: -16px;
  @media (min-width: 768px) {
    display: none;
  }
`;
const StyledLeafLeftBottom = styled.div`
  position: absolute;
  bottom: 2px;
  left: -12px;
  animation: bounceAnimation 3s ease-in-out infinite;
  @media (min-width: 768px) {
    display: none;
  }
`;
const StyledLeafRightBottom = styled.div`
  position: absolute;
  bottom: 3px;
  right: -16px;
  animation: bounceAnimation 3s ease-in-out infinite;
  @media (min-width: 768px) {
    display: none;
  }
`;

const getHueFromRGB = (rgb: string): number => {
  const [r, g, b] = rgb
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((val) => parseInt(val.trim()) / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;

  if (max !== min) {
    if (max === r) hue = (g - b) / (max - min);
    else if (max === g) hue = 2 + (b - r) / (max - min);
    else hue = 4 + (r - g) / (max - min);

    hue = hue * 60;
    if (hue < 0) hue += 360;
  }
  return hue;
};

interface Bottle {
  src: string;
  alt: string;
  flavor: string;
  color: string;
  fruitImage: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
}

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

  const kombuchaBottles: Bottle[] = [
    {
      src: "/assets/slider/raspKombucha.png",
      alt: "Raspberry Kombucha",
      flavor: dictionary.bottleTypeRasp,
      color: backgroundColors[0],
      fruitImage: {
        desktop: "/assets/fruits/placeholder-raspberry-desktop.png", // User will set correct path
        tablet: "/assets/fruits/placeholder-raspberry-tablet.png", // User will set correct path
        mobile: "/assets/fruits/placeholder-raspberry-mobile.png", // User will set correct path
      },
    },
    {
      src: "/assets/slider/cherryKombucha.png",
      alt: "Cherry Kombucha",
      flavor: dictionary.bottleTypeCherry,
      color: backgroundColors[1],
      fruitImage: {
        desktop: "/assets/fruits/placeholder-cherry-desktop.png", // User will set correct path
        tablet: "/assets/fruits/placeholder-cherry-tablet.png", // User will set correct path
        mobile: "/assets/fruits/placeholder-cherry-mobile.png", // User will set correct path
      },
    },
    {
      src: "/assets/slider/gingerKombucha.png",
      alt: "Ginger Kombucha",
      flavor: dictionary.bottleTypeGinger,
      color: backgroundColors[2],
      fruitImage: {
        desktop: "/assets/fruits/placeholder-ginger-desktop.png", // User will set correct path
        tablet: "/assets/fruits/placeholder-ginger-tablet.png", // User will set correct path
        mobile: "/assets/fruits/placeholder-ginger-mobile.png", // User will set correct path
      },
    },
    {
      src: "/assets/slider/limeKombucha.png",
      alt: "Blueberry Lime",
      flavor: dictionary.bottleTypeLime,
      color: backgroundColors[3],
      fruitImage: {
        desktop: "/assets/fruits/placeholder-lime-desktop.png", // User will set correct path
        tablet: "/assets/fruits/placeholder-lime-tablet.png", // User will set correct path
        mobile: "/assets/fruits/placeholder-lime-mobile.png", // User will set correct path
      },
    },
  ];

  const waterBottles: Bottle[] = [
    {
      src: "/assets/slider/cherryWaterKombucha.png",
      alt: "Cherry Water",
      flavor: dictionary.bottleTypeCherryWater,
      color: backgroundColors[5],
      fruitImage: {
        desktop: "/assets/fruits/placeholder-cherry-water-desktop.png", // User will set correct path
        tablet: "/assets/fruits/placeholder-cherry-water-tablet.png", // User will set correct path
        mobile: "/assets/fruits/placeholder-cherry-water-mobile.png", // User will set correct path
      },
    },
    {
      src: "/assets/slider/limeWaterKombucha.png",
      alt: "Lime Water",
      flavor: dictionary.bottleTypeLimeWater,
      color: backgroundColors[4],
      fruitImage: {
        desktop: "/assets/fruits/placeholder-lime-water-desktop.png", // User will set correct path
        tablet: "/assets/fruits/placeholder-lime-water-tablet.png", // User will set correct path
        mobile: "/assets/fruits/placeholder-lime-water-mobile.png", // User will set correct path
      },
    },
  ];

  const currentBottles = activeProductType === "kombucha" ? kombuchaBottles : waterBottles;
  const slidesData =
    activeProductType === "kombucha"
      ? [...kombuchaBottles, ...kombuchaBottles, ...kombuchaBottles]
      : waterBottles;

  const handlePrev = () => {
    setAnimationDirection("left");
    swiperRef.current?.swiper.slidePrev();
  };
  const handleNext = () => {
    setAnimationDirection("right");
    swiperRef.current?.swiper.slideNext();
  };

  const switchProductType = (type: "kombucha" | "water") => {
    setActiveProductType(type);
    setTimeout(() => {
      swiperRef.current?.swiper.slideToLoop(0);
      setActiveIndex(0);
    }, 0);
  };

  useEffect(() => {
    const idx = activeIndex % currentBottles.length;
    setBackgroundColor(currentBottles[idx].color);
  }, [activeIndex, activeProductType, currentBottles]);

  const currentBottleData = currentBottles[activeIndex % currentBottles.length];
  const fruitImageKey = `${currentBottleData?.alt}-${activeProductType}-${activeIndex}`;

  return (
    <StyledContainer id="products" style={{ backgroundColor }}>
      <BackgroundLayer
        key={`${activeIndex}-${animationDirection}-${activeProductType}`}
        initial={{ rotateY: animationDirection === "right" ? -90 : 90 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ backgroundColor }}
        animationDirection={animationDirection}
      />

      <StyledLeafLeftTop>
        <Image src="/assets/fruits/leaf-left.png" width={62.69} height={62.69} alt="Leaf" />
      </StyledLeafLeftTop>
      <StyledLeafLeftBottom>
        <Image src="/assets/fruits/leaf-left.png" width={62.69} height={62.69} alt="Leaf" />
      </StyledLeafLeftBottom>

      <StyledLeafRightTop>
        <Image src="/assets/fruits/leaf-right.png" width={62.69} height={62.69} alt="Leaf" />
      </StyledLeafRightTop>

      <StyledLeafRightBottom>
        <Image src="/assets/fruits/leaf-right.png" width={62.69} height={62.69} alt="Leaf" />
      </StyledLeafRightBottom>

      <StyledFruitsContainer>
        {currentBottleData && (
          <>
            <Desktop>
              <Image
                src={currentBottleData.fruitImage.desktop}
                alt="Fruits"
                fill
                style={{ objectFit: "contain" }}
                key={`${fruitImageKey}-desktop`}
              />
            </Desktop>
            <Tablet>
              <Image
                src={currentBottleData.fruitImage.tablet}
                alt="Fruits"
                fill
                style={{ objectFit: "contain" }}
                key={`${fruitImageKey}-tablet`}
              />
            </Tablet>
            <Mobile>
              <Image
                src={currentBottleData.fruitImage.mobile}
                alt="Fruits"
                fill
                style={{ objectFit: "contain" }}
                key={`${fruitImageKey}-mobile`}
              />
            </Mobile>
          </>
        )}
      </StyledFruitsContainer>
      <CircleBackground />

      <StyledBox>
        <StyledTitle>
          <Typography variant="h2">{dictionary.title}</Typography>
        </StyledTitle>

        <StyledProducts>
          <StyledProduct
            onClick={() => switchProductType("kombucha")}
            className={activeProductType === "kombucha" ? "active" : ""}
          >
            <Desktop>
              <Typography variant="mBodytext">{dictionary.kombucha}</Typography>
            </Desktop>
            <Tablet>
              <Typography variant="xsBodytext">{dictionary.kombucha}</Typography>
            </Tablet>
            <Mobile>
              <Typography variant="xsBodytext">{dictionary.kombucha}</Typography>
            </Mobile>
          </StyledProduct>
          <StyledProduct
            onClick={() => switchProductType("water")}
            className={activeProductType === "water" ? "active" : ""}
          >
            <Desktop>
              <Typography variant="mBodytext">{dictionary.water}</Typography>
            </Desktop>
            <Tablet>
              <Typography variant="xsBodytext">{dictionary.water}</Typography>
            </Tablet>
            <Mobile>
              <Typography variant="xsBodytext">{dictionary.water}</Typography>
            </Mobile>
          </StyledProduct>
        </StyledProducts>

        <SwiperWrapper>
          <PrevButton onClick={handlePrev}>
            <svg viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.867 26.14L1.7266 13.9998L13.867 1.85938"
                stroke="#5C0E15"
                strokeWidth="1.82"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </PrevButton>

          <NextButton onClick={handleNext}>
            <svg viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.1408 26.14L13.2812 13.9998L1.1408 1.85938"
                stroke="#5C0E15"
                strokeWidth="1.82"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NextButton>

          <StyledSwiper
            ref={swiperRef}
            spaceBetween={10}
            slidesPerView={activeProductType === "kombucha" ? 3 : 1}
            centeredSlides
            loop
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
            initialSlide={activeProductType === "kombucha" ? 1 : 0}
            key={`swiper-${activeProductType}`}
          >
            {slidesData.map((bottle, i) => (
              <SwiperSlide key={i}>
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
                        filter: `brightness(1.2) sepia(1) hue-rotate(${getHueFromRGB(bottle.color)}deg) saturate(1.5)`,
                      }}
                    />
                  </BottleImage>
                )}
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </SwiperWrapper>

        <FlavorsDisplay>
          <Desktop>
            <Typography variant="lBodytext">
              {currentBottles[activeIndex % currentBottles.length]?.flavor}
            </Typography>
          </Desktop>
          <Tablet>
            <Typography variant="mBodytext">
              {currentBottles[activeIndex % currentBottles.length]?.flavor}
            </Typography>
          </Tablet>
          <Mobile>
            <Typography variant="xsBodytext">
              {currentBottles[activeIndex % currentBottles.length]?.flavor}
            </Typography>
          </Mobile>
        </FlavorsDisplay>
      </StyledBox>
    </StyledContainer>
  );
}
