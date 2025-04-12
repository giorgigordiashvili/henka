'use client'
import { getDictionary } from '@/get-dictionary'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Desktop, Mobile } from './ui/Responsive'
import Typography, { H2 } from './ui/Typography'

const StyledContainer = styled.div`
  padding: 134px 0;
  background: #fcfcfc;
  color: rgba(92, 14, 21, 1);
  text-align: center;
  max-width: 1114px;
  margin: auto;
  padding-bottom: 1000px;
`

const StyledItemsGrid = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: 312px 1fr 312px;
  grid-gap: 32px;
  @media (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    grid-gap: 45px;
  }
`

// Create animations for sliding in from left and right
const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

// Apply animation conditionally based on props and only on desktop
const StyledReasons = styled.div<{ isVisible: boolean; fromLeft?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 64px;
  opacity: 0;
  @media (max-width: 1080px) {
    gap: 32px;
  }

  /* Only apply animations on desktop (screens > 1080px) */
  @media (min-width: 1081px) {
    ${(props) =>
      props.isVisible &&
      css`
        animation: ${props.fromLeft ? slideInFromLeft : slideInFromRight} 0.8s
          ease-out forwards;
      `}
  }

  /* Make elements visible immediately on mobile without animation */
  @media (max-width: 1080px) {
    opacity: 1;
  }
`

const StyledReason = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  align-items: center;
  gap: 12px;
  @media (max-width: 1080px) {
    flex-direction: row;
    gap: 20px;
    text-align: left;
    margin-left: 16px;
  }
`

const StyledImageContainer = styled.div`
  width: 426px;
  height: 610px;

  position: relative;
  @media (max-width: 1080px) {
    width: 100vw;
    height: 459px;
  }
`

const StickyContainer = styled.div<{ y: number }>`
  width: 280px;
  height: 600px;
  top: 50%;
  position: fixed;
  left: 50%;
  transform: translate(-53%, -50%);
  transition: transform 0.05s linear;
`

const StyledWhite = styled.div`
  background: #fcfcfc;
`
export default function Reason({
  dictionary
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['reason']
}) {
  // Add state to track if we've scrolled past the threshold
  const [passedThreshold, setPassedThreshold] = useState(false)

  // Use state for dynamic threshold calculation based on component position
  const [scrollThreshold, setScrollThreshold] = useState(1778)

  // Add state for animation visibility
  const [isInView, setIsInView] = useState(false)
  const reasonsRef = useRef<HTMLDivElement>(null)

  // Add state for sticky image position
  const [stickyPosition, setStickyPosition] = useState(0)
  const targetPosition = useRef(0)
  const currentPosition = useRef(0)
  const animationRef = useRef<number | null>(null)

  // Check if we're on a desktop device
  const [isDesktop, setIsDesktop] = useState(true)

  // Ref to track if image has been preloaded
  const preloadedRef = useRef(false)

  // Calculate threshold based on the start of Reason component with proper positioning
  const calculateThreshold = () => {
    if (!reasonsRef.current) return scrollThreshold

    // Get the component's absolute position from the top of the document
    const componentStart =
      reasonsRef.current.getBoundingClientRect().top + window.scrollY

    // Set threshold to component start plus adjustment for viewport height
    // This ensures consistent threshold calculation across different screen sizes
    const calculatedThreshold =
      componentStart + 225 - (window.innerHeight - 600) / 2

    setScrollThreshold(calculatedThreshold)
    return calculatedThreshold
  }

  // Function to preload the sticky-filled image
  const preloadStickyFilledImage = () => {
    if (preloadedRef.current || !isDesktop) return

    // Create a new image element to preload the image
    const img = new window.Image()
    img.src = '/assets/why/sticky-filled.png'

    // Mark as preloaded once loaded
    img.onload = () => {
      preloadedRef.current = true
    }

    img.onerror = () => {}
  }

  // Animation function for smooth following with "dragging feet" effect
  const animateSticky = () => {
    // Only animate on desktop devices
    if (!isDesktop) return

    // Calculate distance to target
    const distance = targetPosition.current - currentPosition.current

    // Vary the speed based on distance - creates the dragging effect
    // The further we are from target, the faster we'll move
    // The closer we are, the more we'll "drag our feet"
    const speed = Math.abs(distance) < 50 ? 0.05 : 0.15

    // Update position with easing
    if (Math.abs(distance) > 0.1) {
      currentPosition.current += distance * speed
      setStickyPosition(currentPosition.current)
    }

    // Continue animation loop
    animationRef.current = requestAnimationFrame(animateSticky)
  }

  // Initialize calculation after component is mounted
  useEffect(() => {
    // We need a short timeout to allow the DOM to be fully rendered
    const timer = setTimeout(() => {
      calculateThreshold()
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Check if we're on desktop when component mounts
    const checkIfDesktop = () => {
      const isDesktopView = window.innerWidth > 1080
      setIsDesktop(isDesktopView)

      // Preload the image if we're on desktop
      if (isDesktopView) {
        preloadStickyFilledImage()
      }
    }

    // Initial check
    checkIfDesktop()

    // Listen for resize events
    const handleResize = () => {
      checkIfDesktop()
      // Recalculate threshold when screen size changes
      calculateThreshold()
    }

    window.addEventListener('resize', handleResize)

    const handleScroll = () => {
      // Check if we've passed the threshold
      const scrollPosition = window.scrollY
      const currentThreshold = scrollThreshold

      console.log(
        `Scroll position: ${scrollPosition}, Threshold: ${currentThreshold}`
      )

      // If we're getting close to the threshold, preload the image
      if (isDesktop && scrollPosition > currentThreshold - 300) {
        preloadStickyFilledImage()
      }

      // Update target position for sticky with enhanced movement response
      if (scrollPosition < currentThreshold && isDesktop) {
        // Calculate distance to threshold for smooth transition
        const distanceToThreshold = currentThreshold - scrollPosition

        // Set target position proportional to scroll but less than actual scroll
        // This ensures the sticky follows the scroll but with a dragging effect
        // Using a factor less than 1 ensures it never moves more than the scroll
        const dragFactor = 0.7 // Controls how much it "drags its feet"

        // Apply an easing curve that creates more natural movement
        // Square root creates a curve that gives more movement early and slows down later
        targetPosition.current = Math.sqrt(scrollPosition) * dragFactor

        // For smooth transition near threshold, gradually reduce movement
        if (distanceToThreshold < 100) {
          // Scale down movement as we approach threshold (100px to 0px)
          const transitionFactor = distanceToThreshold / 100
          // Decrease the drag factor gradually as we approach threshold
          const adjustedFactor = dragFactor * (0.2 + transitionFactor * 0.8)
          targetPosition.current = Math.sqrt(scrollPosition) * adjustedFactor
        }

        // Start animation if not already running
        if (!animationRef.current) {
          animationRef.current = requestAnimationFrame(animateSticky)
        }
      }

      // Update state based on scroll position
      if (scrollPosition >= currentThreshold) {
        setPassedThreshold(true)
        // Cancel animation when past threshold
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
      } else {
        setPassedThreshold(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Start animation if on desktop
    if (isDesktop) {
      animationRef.current = requestAnimationFrame(animateSticky)
    }

    // Initial check on mount
    handleScroll()

    // Clean up the event listeners and animation frame
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isDesktop, scrollThreshold])

  // Set up Intersection Observer for animation
  useEffect(() => {
    if (!isDesktop) {
      // Skip animation setup on mobile
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.2 // Trigger when at least 20% of the element is visible
      }
    )

    if (reasonsRef.current) {
      observer.observe(reasonsRef.current)
    }

    return () => {
      if (reasonsRef.current) {
        observer.unobserve(reasonsRef.current)
      }
    }
  }, [isDesktop])

  return (
    <>
      {isDesktop && (
        <Head>
          <link
            rel="preload"
            href="/assets/why/sticky-filled.png"
            as="image"
            type="image/png"
          />
        </Head>
      )}
      <StyledWhite>
        <StyledContainer ref={reasonsRef}>
          <H2>{dictionary.whyUs}</H2>
          <StyledItemsGrid>
            <StyledReasons isVisible={isInView} fromLeft={true}>
              <StyledReason>
                <Image
                  src="/assets/why/1.png"
                  width={62}
                  height={62}
                  alt="Reason 1"
                />
                <Typography variant="sBodytext">
                  {dictionary.antiBacterial}
                </Typography>
              </StyledReason>
              <StyledReason>
                <Image
                  src="/assets/why/1.png"
                  width={62}
                  height={62}
                  alt="Reason 1"
                />
                <Typography variant="sBodytext">
                  {dictionary.antiBacterial}
                </Typography>
              </StyledReason>
              <StyledReason>
                <Image
                  src="/assets/why/1.png"
                  width={62}
                  height={62}
                  alt="Reason 1"
                />
                <Typography variant="sBodytext">
                  {dictionary.antiBacterial}
                </Typography>
              </StyledReason>
            </StyledReasons>
            <StyledImageContainer>
              <Desktop>
                <Image
                  src={
                    passedThreshold
                      ? '/assets/why/sticky-filled.png'
                      : '/assets/why/middle.png'
                  }
                  fill
                  objectFit="contain"
                  alt="Middle Image"
                />
              </Desktop>
              <Mobile>
                <Image
                  src="/assets/why/sticky-filled-mobile.png"
                  fill
                  objectFit="contain"
                  alt="Mobile Image"
                />
              </Mobile>
            </StyledImageContainer>
            <StyledReasons isVisible={isInView} fromLeft={false}>
              <StyledReason>
                <Image
                  src="/assets/why/1.png"
                  width={62}
                  height={62}
                  alt="Reason 1"
                />
                <Typography variant="sBodytext">
                  {dictionary.antiBacterial}
                </Typography>
              </StyledReason>
              <StyledReason>
                <Image
                  src="/assets/why/1.png"
                  width={62}
                  height={62}
                  alt="Reason 1"
                />
                <Typography variant="sBodytext">
                  {dictionary.antiBacterial}
                </Typography>
              </StyledReason>
              <StyledReason>
                <Image
                  src="/assets/why/1.png"
                  width={62}
                  height={62}
                  alt="Reason 1"
                />
                <Typography variant="sBodytext">
                  {dictionary.antiBacterial}
                </Typography>
              </StyledReason>
            </StyledReasons>
          </StyledItemsGrid>
        </StyledContainer>
      </StyledWhite>
      {/* Hide the sticky container when we've reached the threshold */}
      {!passedThreshold && (
        <Desktop>
          <StickyContainer y={stickyPosition}>
            <Image
              src="/assets/why/sticky.png"
              fill
              objectFit="contain"
              alt="Sticky Image"
            />
          </StickyContainer>
        </Desktop>
      )}
    </>
  )
}
