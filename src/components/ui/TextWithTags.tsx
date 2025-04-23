"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Desktop, Mobile } from "./Responsive";
import Typography from "./Typography";

const StyledItemsGrid = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: 312px 1fr 312px;
  grid-gap: 32px;
  @media (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    grid-gap: 45px;
    padding-top: 45px;
  }
`;

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
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Apply animation conditionally based on props and only on desktop
const StyledReasons = styled.div<{ $fromLeft?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 64px;
  @media (max-width: 1080px) {
    gap: 32px;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
  }

  /* Make elements visible immediately on mobile without animation */
  @media (max-width: 1080px) {
    opacity: 1;
  }
`;

// Animation for individual items that will follow scroll
const StyledReason = styled.div<{ $isVisible: boolean; $fromLeft?: boolean; $index: number }>`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  align-items: center;
  gap: 12px;
  opacity: 0;

  @media (max-width: 1080px) {
    flex-direction: row;
    gap: 20px;
    text-align: left;
    margin-left: 16px;
    justify-content: flex-start;
    opacity: 1; /* Always visible on mobile */
    img {
      width: 40px;
      height: 40px;
    }
  }

  /* Only apply animations on desktop (screens > 1080px) */
  @media (min-width: 1081px) {
    ${(props) =>
      props.$isVisible &&
      css`
        animation: ${props.$fromLeft ? slideInFromLeft : slideInFromRight} 0.8s ease-out forwards;
        animation-delay: ${props.$index * 0.2}s; /* Stagger animations based on index */
      `}
  }
`;

const StyledImageContainer = styled.div`
  width: 426px;
  height: 610px;
  position: relative;
  @media (max-width: 1080px) {
    width: calc(100% - 32px);
    height: 459px;
    margin: auto;
    border-radius: 16px;
    overflow: hidden;
  }
`;

const StickyContainer = styled.div<{ y: number }>`
  width: 280px;
  height: 600px;
  top: calc((100vh - 600px) / 2 - 60px);
  position: fixed;
  left: 50%;
  z-index: 99;
  transform: translate(-53%, 0px);
  transition: transform 0.05s linear;
`;

export interface TagItem {
  text: string;
  iconSrc: string;
  iconAlt: string;
}

interface TextWithTagsProps {
  leftTags: TagItem[];
  rightTags: TagItem[];
  middleImageSrc: string;
  middleImageAlt: string;
  filledImageSrc: string;
  filledImageMobileSrc: string;
  stickyImageSrc?: string; // Optional sticky image
  enableStickyEffect?: boolean;
  className?: string;
}

export default function TextWithTags({
  leftTags,
  rightTags,
  middleImageSrc,
  middleImageAlt,
  filledImageSrc,
  filledImageMobileSrc,
  stickyImageSrc,
  enableStickyEffect = false,
  className,
}: TextWithTagsProps) {
  // Add state to track if we've scrolled past the threshold
  const [passedThreshold, setPassedThreshold] = useState(false);

  // Use state for dynamic threshold calculation based on component position
  const [scrollThreshold, setScrollThreshold] = useState(1778);

  // Add state for animation visibility
  const [isInView, setIsInView] = useState(false);
  const reasonsRef = useRef<HTMLDivElement>(null);

  // Add state for sticky image position
  const [stickyPosition, setStickyPosition] = useState(0);
  const targetPosition = useRef(0);
  const currentPosition = useRef(0);
  const animationRef = useRef<number | null>(null);

  // Check if we're on a desktop device
  const [isDesktop, setIsDesktop] = useState(true);

  // Ref to track if image has been preloaded
  const preloadedRef = useRef(false);

  // Calculate threshold based on the start of component with proper positioning
  const calculateThreshold = useCallback(() => {
    if (!reasonsRef.current) return scrollThreshold;

    // Get the component's absolute position from the top of the document
    const componentStart = reasonsRef.current.getBoundingClientRect().top + window.scrollY;

    // Set threshold to component start plus adjustment for viewport height
    // This ensures consistent threshold calculation across different screen sizes
    const calculatedThreshold = componentStart + 150 - (window.innerHeight - 600) / 2;
    console.log(calculatedThreshold);

    setScrollThreshold(calculatedThreshold);
    return calculatedThreshold;
  }, [scrollThreshold]);

  // Function to preload the filled image
  const preloadFilledImage = useCallback(() => {
    if (preloadedRef.current || !isDesktop || !filledImageSrc) return;

    // Create a new image element to preload the image
    const img = new window.Image();
    img.src = filledImageSrc;

    // Mark as preloaded once loaded
    img.onload = () => {
      preloadedRef.current = true;
    };

    img.onerror = () => {};
  }, [isDesktop, filledImageSrc]);

  // Animation function for smooth following with "dragging feet" effect
  const animateSticky = useCallback(() => {
    // Only animate on desktop devices and if sticky effect is enabled
    if (!isDesktop || !enableStickyEffect) return;

    // Calculate distance to target
    const distance = targetPosition.current - currentPosition.current;

    // Vary the speed based on distance - creates the dragging effect
    // The further we are from target, the faster we'll move
    // The closer we are, the more we'll "drag our feet"
    const speed = Math.abs(distance) < 50 ? 0.05 : 0.15;

    // Update position with easing
    if (Math.abs(distance) > 0.1) {
      currentPosition.current += distance * speed;
      setStickyPosition(currentPosition.current);
    }

    // Continue animation loop
    animationRef.current = requestAnimationFrame(animateSticky);
  }, [isDesktop, enableStickyEffect]);

  // Initialize calculation after component is mounted
  useEffect(() => {
    // We need a short timeout to allow the DOM to be fully rendered
    const timer = setTimeout(() => {
      calculateThreshold();
    }, 300);

    return () => clearTimeout(timer);
  }, [calculateThreshold]);

  useEffect(() => {
    // Skip all sticky effects if not enabled
    if (!enableStickyEffect) {
      setIsInView(true);
      return;
    }

    // Check if we're on desktop when component mounts
    const checkIfDesktop = () => {
      const isDesktopView = window.innerWidth > 1080;
      setIsDesktop(isDesktopView);

      // Preload the image if we're on desktop
      if (isDesktopView) {
        preloadFilledImage();
      }
    };

    // Initial check
    checkIfDesktop();

    // Listen for resize events
    const handleResize = () => {
      checkIfDesktop();
      // Recalculate threshold when screen size changes
      calculateThreshold();
    };

    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      // Check if we've passed the threshold
      const scrollPosition = window.scrollY;
      const currentThreshold = scrollThreshold;

      // If we're getting close to the threshold, preload the image
      if (isDesktop && scrollPosition > currentThreshold - 300) {
        preloadFilledImage();
      }

      // Update target position for sticky with enhanced movement response
      if (scrollPosition < currentThreshold && isDesktop) {
        // Calculate distance to threshold for smooth transition
        const distanceToThreshold = currentThreshold - scrollPosition;

        // Set target position proportional to scroll but less than actual scroll
        // This ensures the sticky follows the scroll but with a dragging effect
        // Using a factor less than 1 ensures it never moves more than the scroll
        const dragFactor = 0.7; // Controls how much it "drags its feet"

        // Apply an easing curve that creates more natural movement
        // Square root creates a curve that gives more movement early and slows down later
        targetPosition.current = Math.sqrt(scrollPosition) * dragFactor;

        // For smooth transition near threshold, gradually reduce movement
        if (distanceToThreshold < 100) {
          // Scale down movement as we approach threshold (100px to 0px)
          const transitionFactor = distanceToThreshold / 100;
          // Decrease the drag factor gradually as we approach threshold
          const adjustedFactor = dragFactor * (0.2 + transitionFactor * 0.8);
          targetPosition.current = Math.sqrt(scrollPosition) * adjustedFactor;
        }

        // Start animation if not already running
        if (!animationRef.current) {
          animationRef.current = requestAnimationFrame(animateSticky);
        }
      }

      // Update state based on scroll position
      if (scrollPosition >= currentThreshold) {
        setPassedThreshold(true);
        // Cancel animation when past threshold
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      } else {
        setPassedThreshold(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Start animation if on desktop
    if (isDesktop && enableStickyEffect) {
      animationRef.current = requestAnimationFrame(animateSticky);
    }

    // Initial check on mount
    handleScroll();

    // Clean up the event listeners and animation frame
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [
    animateSticky,
    calculateThreshold,
    isDesktop,
    preloadFilledImage,
    scrollThreshold,
    enableStickyEffect,
  ]);

  // Set up Intersection Observer for animation
  useEffect(() => {
    if (!isDesktop) {
      // Skip animation setup on mobile
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // Trigger when at least 20% of the element is visible
      }
    );

    const currentRef = reasonsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isDesktop]);

  return (
    <div className={className} ref={reasonsRef}>
      <StyledItemsGrid>
        <StyledReasons $fromLeft={true}>
          {leftTags.map((tag, index) => (
            <StyledReason
              key={`left-tag-${index}`}
              $isVisible={isInView}
              $fromLeft={true}
              $index={index}
            >
              <Image src={tag.iconSrc} width={62} height={62} alt={tag.iconAlt} />
              <Typography variant="sBodytext">{tag.text}</Typography>
            </StyledReason>
          ))}
        </StyledReasons>
        <StyledImageContainer>
          <Desktop>
            <Image
              src={passedThreshold ? filledImageSrc : middleImageSrc || filledImageSrc}
              fill
              objectFit="contain"
              alt={middleImageAlt}
            />
          </Desktop>
          <Mobile>
            <Image
              src={filledImageMobileSrc}
              fill
              objectFit="cover"
              alt={`${middleImageAlt} Mobile`}
            />
          </Mobile>
        </StyledImageContainer>
        <StyledReasons $fromLeft={false}>
          {rightTags.map((tag, index) => (
            <StyledReason
              key={`right-tag-${index}`}
              $isVisible={isInView}
              $fromLeft={false}
              $index={index}
            >
              <Image src={tag.iconSrc} width={62} height={62} alt={tag.iconAlt} />
              <Typography variant="sBodytext">{tag.text}</Typography>
            </StyledReason>
          ))}
        </StyledReasons>
      </StyledItemsGrid>

      {/* Hide the sticky container when we've reached the threshold or if sticky is disabled */}
      {!passedThreshold && enableStickyEffect && stickyImageSrc && (
        <Desktop>
          <StickyContainer y={stickyPosition}>
            <Image src={stickyImageSrc} fill objectFit="contain" alt={`Sticky ${middleImageAlt}`} />
          </StickyContainer>
        </Desktop>
      )}
    </div>
  );
}
