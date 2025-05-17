"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Desktop, Mobile, Tablet } from "./Responsive";
import Typography from "./Typography";

const StyledItemsGrid = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: minmax(200px, 312px) 1fr minmax(200px, 312px);
  grid-gap: 32px;
  @media (max-width: 1279px) {
    padding-top: 50px;
    padding-bottom: 70px;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    grid-gap: 45px;
    padding-top: 45px;
  }
`;

// Apply animation conditionally based on props and only on desktop
const StyledReasons = styled.div<{ $fromLeft?: boolean; $scrollRatio?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 64px;
  position: relative;
  max-width: 259px;
  @media (min-width: 768px) {
    transform: translateX(
      ${(props) =>
        props.$fromLeft
          ? `calc(-100% 1${props.$scrollRatio || 0}%)`
          : `calc(100% 1${props.$scrollRatio || 0}%)`}
    );
    transition: transform 0.05s linear;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0 16px;
    gap: 32px;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    /* No transform on the container, just individual items */
    transform: none;
  }
`;

const StyledSecondAsterisk3 = styled.div`
  position: absolute;
  bottom: -15px;
  right: -14px;
  z-index: 999;
  @media (min-width: 768px) {
    display: none;
  }
`;

// Animation for individual items that will follow scroll
const StyledReason = styled.div<{
  $isVisible: boolean;
  $fromLeft?: boolean;
  $index: number;
  $scrollRatio?: number;
}>`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  align-items: center;
  gap: 12px;
  opacity: 1; /* Always visible, no fade effect */
  transform: ${(props) =>
    props.$fromLeft
      ? "translateX(calc(-100vw - 1114px / 2))"
      : "translateX(calc(100vw - 1114px / 2))"};
  @media (max-width: 1279px) {
    img {
      width: 40px;
      height: 40px;
    }
  }
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 20px;
    text-align: left;
    margin-left: 0px;
    justify-content: flex-start;
    transform: translateX(150%); /* All tags slide from right on mobile */
    img {
      width: 40px;
      height: 40px;
    }
    ${(props) => {
      // Different threshold calculation for left and right tags
      const threshold = props.$fromLeft
        ? 10 + props.$index * 7 // Top tags (appear earlier)
        : 15 + props.$index * 7; // Bottom tags (appear slightly later)

      return (
        props.$scrollRatio &&
        props.$scrollRatio > threshold &&
        css`
          transform: translateX(0);
          transition: transform 0.5s ease-out;
        `
      );
    }}
  }

  /* Only apply animations on desktop (screens > 1081px) */
  @media (min-width: 768px) {
    /* Only make visible and animate when the previous item is complete or it's the first item */
    ${(props) => {
      // The threshold percentage for when this tag should appear
      const threshold = props.$index === 0 ? 15 : props.$index * 25;

      return (
        props.$scrollRatio &&
        props.$scrollRatio > threshold &&
        css`
          visibility: visible;
          transform: translateX(0);
          transition: transform 0.6s ease-out;
        `
      );
    }}
  }
`;

const StyledImageContainer = styled.div`
  width: 426px;
  height: 610px;
  position: relative;

  @media (max-width: 1279px) {
    width: calc(100% - 32px);
    min-width: 286px;
    height: 469px;
    margin: auto;
    border-radius: 16px;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    width: calc(100% - 32px);
    min-width: 209px;
    height: 459px;
    margin: auto;
    border-radius: 16px;
    overflow: hidden;
    background: #e7dfee;
  }
`;

// Added styled component for the filled image without opacity transition
const FilledImage = styled(Image)<{ $opacity: number }>`
  opacity: ${(props) => props.$opacity};
`;

const StickyContainer = styled.div<{ y: number; $opacity: number }>`
  width: 280px;
  height: 600px;
  top: calc((100vh - 600px) / 2);
  position: fixed;
  left: 50%;
  z-index: 99;
  transform: translate(-53%, 0px);
  transition: transform 0.05s linear;
  opacity: ${(props) => props.$opacity};
  pointer-events: ${(props) => (props.$opacity > 0 ? "auto" : "none")};
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
  enableSlideAnimation?: boolean; // New prop to control slide animation independently
  className?: string;
  uniqueId?: string; // Unique ID for multiple instances
  filledImageTabletSrc?: string;
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
  enableSlideAnimation = true, // Default to true so slides work regardless of sticky effect
  className,
  uniqueId = "default",
  filledImageTabletSrc,
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

  // Add state for tag animation based on scroll position
  const [tagsScrollRatio, setTagsScrollRatio] = useState(0);
  // Add separate state for left and right tags on mobile
  const [leftTagsScrollRatio, setLeftTagsScrollRatio] = useState(0);
  const [rightTagsScrollRatio, setRightTagsScrollRatio] = useState(0);

  // Compute the filled image opacity based on threshold
  const [filledImageOpacity, setFilledImageOpacity] = useState(0);

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
    const calculatedThreshold = componentStart + 50 - (window.innerHeight - 600) / 2;

    setScrollThreshold(calculatedThreshold);
    return calculatedThreshold;
  }, [scrollThreshold]);

  // Function to preload the filled image
  const preloadFilledImage = useCallback(() => {
    if (preloadedRef.current || !isDesktop) return;

    // Mark as preloaded once loaded
    preloadedRef.current = true;
  }, [isDesktop]);

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
    // Check if we're on desktop when component mounts
    const checkIfDesktop = () => {
      const isDesktopView = window.innerWidth > 768;
      setIsDesktop(isDesktopView);

      // Preload the image if sticky effect is enabled
      if (isDesktopView && enableStickyEffect) {
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
      // Check if we've passed the threshold (for sticky effect)
      const scrollPosition = window.scrollY;
      const currentThreshold = scrollThreshold;

      // Calculate scroll ratio for tag animation (0-100%)
      if (reasonsRef.current && enableSlideAnimation) {
        // Get component position data
        const rect = reasonsRef.current.getBoundingClientRect();
        const componentTop = rect.top + window.scrollY;
        const componentBottom = componentTop + rect.height;

        // Calculate how far into the component we've scrolled (as a percentage)
        if (
          scrollPosition >= componentTop - window.innerHeight &&
          scrollPosition <= componentBottom
        ) {
          // Different calculation approach based on device type
          if (isDesktop) {
            // Desktop calculation - similar to before
            const startPosition = componentTop - window.innerHeight;
            const totalScrollDistance = rect.height + window.innerHeight;
            const currentProgress = scrollPosition - startPosition;

            const percentage = Math.min(
              100,
              Math.max(0, (currentProgress / totalScrollDistance) * 100)
            );
            setTagsScrollRatio(percentage);
          } else {
            // Mobile calculation with separate tracking for top and bottom sections
            // Calculate how far down the page we've scrolled relative to this component
            const componentViewportPosition = rect.top;
            const componentHeight = rect.height;

            // For desktop, keep using the same calculation for both sides
            setTagsScrollRatio(
              calculateScrollPercentage(componentViewportPosition, componentHeight)
            );

            // For mobile, calculate left (top) tags scroll ratio
            const leftPercentage = calculateScrollPercentage(
              componentViewportPosition,
              componentHeight
            );

            // For right (bottom) tags, we need a completely different approach
            // We want them to only start animating when they are visible on screen

            // First, find the bottom section's position in the DOM
            // To do this properly, we need to get the actual DOM element position
            const bottomSection = document.querySelectorAll(".StyledReasons")[1]; // Second StyledReasons element

            // Get position of the bottom section specifically
            let bottomTagsPosition;
            let rightPercentage = 0; // Default to 0 (no animation) until visible

            if (bottomSection) {
              const bottomRect = bottomSection.getBoundingClientRect();
              bottomTagsPosition = bottomRect.top;

              // Only start animating if the bottom section is actually in the viewport
              if (bottomTagsPosition < window.innerHeight * 0.8) {
                // Calculate how far the bottom section has entered the viewport
                const visibleAmount = Math.min(
                  100,
                  ((window.innerHeight * 0.8 - bottomTagsPosition) / (window.innerHeight * 0.5)) *
                    100
                );
                rightPercentage = Math.max(0, visibleAmount);
              }
            } else {
              // Fallback if we can't find the exact element - estimate based on component height
              const imageContainerHeight = componentHeight * 0.6; // Image takes about 60% of component height on mobile
              bottomTagsPosition = componentViewportPosition + imageContainerHeight;

              // Only calculate percentage if the bottom tags would be in view
              if (bottomTagsPosition < window.innerHeight * 0.8) {
                rightPercentage = calculateScrollPercentage(bottomTagsPosition, componentHeight);
              }
            }

            // Set both values
            setLeftTagsScrollRatio(leftPercentage);
            setRightTagsScrollRatio(rightPercentage);

            // Helper function to calculate percentage based on position
            function calculateScrollPercentage(position: number, height: number) {
              let percentage;

              if (position > window.innerHeight * 0.7) {
                // Component is mostly below the viewport - early stage
                percentage = Math.max(
                  0,
                  Math.min(30, ((window.innerHeight - position) / window.innerHeight) * 50)
                );
              } else if (position > window.innerHeight * 0.3) {
                // Component is in the middle of the viewport - middle stage
                percentage =
                  30 +
                  Math.max(
                    0,
                    Math.min(
                      40,
                      ((window.innerHeight * 0.7 - position) / (window.innerHeight * 0.4)) * 40
                    )
                  );
              } else if (position > -height * 0.6) {
                // Component is in the upper part of viewport - later stage
                percentage =
                  70 +
                  Math.max(
                    0,
                    Math.min(
                      30,
                      ((window.innerHeight * 0.3 - position) / (window.innerHeight * 0.3)) * 30
                    )
                  );
              } else {
                // Component is mostly scrolled out - final stage
                percentage = 100;
              }

              return percentage;
            }
          }
        }
      }

      // The following code is only for sticky effect
      if (enableStickyEffect) {
        // If we're getting close to the threshold, preload the image
        if (isDesktop && scrollPosition > currentThreshold - 300) {
          preloadFilledImage();
        }

        // Update target position for sticky with enhanced movement response
        if (scrollPosition < currentThreshold && isDesktop) {
          // Calculate distance to threshold for smooth transition
          const distanceToThreshold = currentThreshold - scrollPosition;

          // Set target position proportional to scroll but less than actual scroll
          const dragFactor = 0.7; // Controls how much it "drags its feet"

          // Apply an easing curve that creates more natural movement
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

        // Update filled image opacity based on scroll position
        if (isDesktop) {
          if (scrollPosition >= currentThreshold) {
            setFilledImageOpacity(1);
          } else {
            // Calculate opacity based on proximity to threshold
            // Start fading in 200px before threshold
            setFilledImageOpacity(0);
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
      }
    };

    // Use uniqueId in event listener to ensure each component has its own handler
    const scrollHandler = handleScroll; // Store reference for cleanup

    // Add new handler
    window.addEventListener("scroll", scrollHandler, { passive: true });

    // Start sticky animation if on desktop and sticky effect is enabled
    if (isDesktop && enableStickyEffect) {
      animationRef.current = requestAnimationFrame(animateSticky);
    }

    // Make sure slide animations are always visible if enabled
    if (enableSlideAnimation && !enableStickyEffect) {
      setIsInView(true);
    }

    // Initial check on mount
    handleScroll();

    // Clean up the event listeners and animation frame
    return () => {
      window.removeEventListener("scroll", scrollHandler);
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
    scrollThreshold,
    preloadFilledImage,
    enableStickyEffect,
    enableSlideAnimation,
    uniqueId,
  ]);

  // Set up Intersection Observer for animation on both mobile and desktop
  useEffect(() => {
    // Always set up the animation for both desktop and mobile
    setIsInView(true);

    const observerOptions = {
      threshold: isDesktop ? 0.2 : 0.02, // Very low threshold on mobile to detect earlier
      rootMargin: isDesktop ? "0px" : "0px 0px -50px 0px", // Start even earlier on mobile
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Manually trigger an initial scroll event to calculate positions immediately
        if (!isDesktop) {
          window.dispatchEvent(new Event("scroll"));
        }
        observer.unobserve(entry.target);
      }
    }, observerOptions);

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
    <div style={{ position: "relative" }} className={className} ref={reasonsRef}>
      <StyledSecondAsterisk3>
        <Mobile>
          <Image
            style={{ objectFit: "contain" }}
            width={60}
            height={60}
            src="/assets/asterisk-2.png"
            alt="Decoration"
          />
        </Mobile>
      </StyledSecondAsterisk3>
      <StyledItemsGrid>
        <StyledReasons $fromLeft={true} $scrollRatio={tagsScrollRatio}>
          {leftTags.map((tag, index) => (
            <StyledReason
              key={`left-tag-${index}`}
              $isVisible={isInView}
              $fromLeft={true}
              $index={index}
              $scrollRatio={isDesktop ? tagsScrollRatio : leftTagsScrollRatio}
              data-tag-position={index} // Add data attribute to help with debugging
            >
              <Image src={tag.iconSrc} width={62} height={62} alt={tag.iconAlt} />
              <Desktop>
                <Typography variant="sBodytext">{tag.text}</Typography>
              </Desktop>
              <Tablet>
                <Typography variant="xsBodytext">{tag.text}</Typography>
              </Tablet>
              <Mobile>
                <Typography variant="sBodytext">{tag.text}</Typography>
              </Mobile>
            </StyledReason>
          ))}
        </StyledReasons>
        <StyledImageContainer>
          <Desktop>
            {/* Base image that's always displayed */}
            <Image
              src={middleImageSrc}
              fill
              style={{ objectFit: "contain" }}
              alt={middleImageAlt}
            />
            {/* Filled image overlaid with dynamic opacity */}
            <FilledImage
              src={filledImageSrc}
              fill
              style={{ objectFit: "contain" }}
              alt={middleImageAlt}
              $opacity={filledImageOpacity}
            />
          </Desktop>
          <Tablet>
            <Image
              src={filledImageTabletSrc || filledImageSrc}
              fill
              style={{ objectFit: "contain" }}
              alt={`${middleImageAlt} Mobile`}
            />
          </Tablet>
          <Mobile>
            <Image
              src={filledImageMobileSrc}
              fill
              style={{ objectFit: "contain" }}
              alt={`${middleImageAlt} Mobile`}
            />
          </Mobile>
        </StyledImageContainer>
        <StyledReasons $fromLeft={false} $scrollRatio={tagsScrollRatio}>
          {rightTags.map((tag, index) => (
            <StyledReason
              key={`right-tag-${index}`}
              $isVisible={isInView}
              $fromLeft={false}
              $index={index}
              $scrollRatio={isDesktop ? tagsScrollRatio : rightTagsScrollRatio}
              data-tag-position={`right-${index}`} // Add data attribute to help with debugging
              style={{
                // Add a small delay to the CSS animation based on index
                transitionDelay: `${index * 0.05}s`,
              }}
            >
              <Image src={tag.iconSrc} width={62} height={62} alt={tag.iconAlt} />
              <Desktop>
                <Typography variant="sBodytext">{tag.text}</Typography>
              </Desktop>
              <Tablet>
                <Typography variant="xsBodytext">{tag.text}</Typography>
              </Tablet>
              <Mobile>
                <Typography variant="sBodytext">{tag.text}</Typography>
              </Mobile>
            </StyledReason>
          ))}
        </StyledReasons>
      </StyledItemsGrid>

      {/* Always render the sticky container but control its opacity */}
      {enableStickyEffect && stickyImageSrc && (
        <Desktop>
          <StickyContainer y={stickyPosition} $opacity={!passedThreshold ? 1 : 0}>
            <Image
              src={stickyImageSrc}
              fill
              style={{ objectFit: "contain" }}
              alt={`Sticky ${middleImageAlt}`}
            />
          </StickyContainer>
        </Desktop>
      )}
    </div>
  );
}
