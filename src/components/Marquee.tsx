'use client'
import { getDictionary } from '@/get-dictionary'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Desktop, Mobile } from './ui/Responsive'

interface MarqueeItem {
  text: string
  image: string
  alt: string
}

const StyledContainer = styled.div`
  background-color: rgba(231, 223, 238, 1);
  height: 818.5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media (max-width: 1080px) {
    height: 373.98px;
  }
`

const StyledUnionContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 167px;
  top: -1px;
  @media (max-width: 1080px) {
    height: 42.98px;
  }
`

const StyledBottomUnionContainer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 167px;
  @media (max-width: 1080px) {
    height: 42.98px;
  }
`

const marqueeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`

const StyledText = styled.div`
  height: 479px;
  width: 100%;
  font-size: 90px;
  font-weight: 700;
  letter-spacing: 0;
  color: #5c0e15;
  font-feature-settings: 'case';
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  gap: 10px;
  @media (max-width: 1080px) {
    height: auto;
    font-size: 32.09px;
    line-height: 37px;
  }
`

const MarqueeContent = styled.div`
  display: flex;
  align-items: center;
  animation: ${marqueeAnimation} 30s linear infinite;
  padding-right: 50px;
`

const MarqueeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 135px;
  @media (max-width: 1080px) {
    margin-right: 48.12px;
  }
`

export default function Marquee({
  dictionary
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['marquee']
}) {
  const marqueeTexts = [
    dictionary.energy,
    dictionary.health,
    dictionary.ingredients,
    dictionary.probiotics,
    dictionary.vitamin
  ]

  const marqueeImages = [
    '/assets/marquee/blueberry.png',
    '/assets/marquee/leaf.png',
    '/assets/marquee/ginger.png',
    '/assets/marquee/passion.png',
    '/assets/marquee/pineberry.png'
  ]
  const [duplicated, setDuplicated] = useState(1)
  const contentRef = useRef<HTMLDivElement>(null)

  // Create three different marquee arrays with different patterns
  const marqueeOne: MarqueeItem[] = marqueeTexts.map((text, index) => ({
    text,
    image: marqueeImages[index % marqueeImages.length],
    alt: text
  }))

  const marqueeTwo: MarqueeItem[] = marqueeTexts.map((text, index) => ({
    text,
    image: marqueeImages[(index + 2) % marqueeImages.length],
    alt: text
  }))

  const marqueeThree: MarqueeItem[] = marqueeTexts.map((text, index) => ({
    text,
    image: marqueeImages[(index + 4) % marqueeImages.length],
    alt: text
  }))

  // Calculate how many copies we need based on screen width
  useEffect(() => {
    const calculateDuplication = () => {
      const screenWidth = window.innerWidth
      // We need at least 2 copies for the infinite effect to work smoothly
      // For wider screens, we might need more copies
      const copies = Math.max(2, Math.ceil(screenWidth / 1200) + 1)
      setDuplicated(copies)
    }

    calculateDuplication()
    window.addEventListener('resize', calculateDuplication)

    return () => {
      window.removeEventListener('resize', calculateDuplication)
    }
  }, [])

  return (
    <StyledContainer>
      <StyledUnionContainer>
        <Desktop>
          <Image src="/assets/union-2.png" alt="Union" fill />
        </Desktop>
        <Mobile>
          <Image src="/assets/union-2-mobile.png" alt="Union" fill />
        </Mobile>
      </StyledUnionContainer>
      <StyledBottomUnionContainer>
        <Desktop>
          <Image src="/assets/union-1.png" alt="Union" fill />
        </Desktop>
        <Mobile>
          <Image src="/assets/union-1-mobile.png" alt="Union" fill />
        </Mobile>
      </StyledBottomUnionContainer>
      <StyledText>
        <Desktop>
          <MarqueeContent ref={contentRef}>
            {[...Array(duplicated)].map((_, index) => (
              <React.Fragment key={index}>
                {marqueeOne.map((item, itemIndex) => (
                  <MarqueeItem key={`${index}-${itemIndex}`}>
                    <span>{item.text}</span>
                    <Image
                      width={115}
                      height={115}
                      alt={item.alt}
                      src={item.image}
                    />
                  </MarqueeItem>
                ))}
              </React.Fragment>
            ))}
          </MarqueeContent>

          <MarqueeContent ref={contentRef}>
            {[...Array(duplicated)].map((_, index) => (
              <React.Fragment key={index}>
                {marqueeTwo.map((item, itemIndex) => (
                  <MarqueeItem key={`${index}-${itemIndex}`}>
                    <Image
                      width={115}
                      height={115}
                      alt={item.alt}
                      src={item.image}
                    />
                    <span>{item.text}</span>
                  </MarqueeItem>
                ))}
              </React.Fragment>
            ))}
          </MarqueeContent>
          <MarqueeContent ref={contentRef}>
            {[...Array(duplicated)].map((_, index) => (
              <React.Fragment key={index}>
                {marqueeThree.map((item, itemIndex) => (
                  <MarqueeItem key={`${index}-${itemIndex}`}>
                    <Image
                      width={115}
                      height={115}
                      alt={item.alt}
                      src={item.image}
                    />
                    <span>{item.text}</span>
                  </MarqueeItem>
                ))}
              </React.Fragment>
            ))}
          </MarqueeContent>
        </Desktop>
        <Mobile>
          <MarqueeContent ref={contentRef}>
            {[...Array(duplicated)].map((_, index) => (
              <React.Fragment key={index}>
                {marqueeOne.map((item, itemIndex) => (
                  <MarqueeItem key={`${index}-${itemIndex}`}>
                    <span>{item.text}</span>
                    <Image
                      width={41}
                      height={41}
                      alt={item.alt}
                      src={item.image}
                    />
                  </MarqueeItem>
                ))}
              </React.Fragment>
            ))}
          </MarqueeContent>

          <MarqueeContent ref={contentRef}>
            {[...Array(duplicated)].map((_, index) => (
              <React.Fragment key={index}>
                {marqueeTwo.map((item, itemIndex) => (
                  <MarqueeItem key={`${index}-${itemIndex}`}>
                    <Image
                      width={41}
                      height={41}
                      alt={item.alt}
                      src={item.image}
                    />
                    <span>{item.text}</span>
                  </MarqueeItem>
                ))}
              </React.Fragment>
            ))}
          </MarqueeContent>
          <MarqueeContent ref={contentRef}>
            {[...Array(duplicated)].map((_, index) => (
              <React.Fragment key={index}>
                {marqueeThree.map((item, itemIndex) => (
                  <MarqueeItem key={`${index}-${itemIndex}`}>
                    <span>{item.text}</span>

                    <Image
                      width={41}
                      height={41}
                      alt={item.alt}
                      src={item.image}
                    />
                  </MarqueeItem>
                ))}
              </React.Fragment>
            ))}
          </MarqueeContent>
        </Mobile>
      </StyledText>
    </StyledContainer>
  )
}
