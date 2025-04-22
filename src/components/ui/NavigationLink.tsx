"use client";
import Link from "next/link";
import styled from "styled-components";
import Typography from "./Typography";
import { Desktop, Mobile } from "./Responsive";

const StyledLi = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  transition: all 0.3s ease-in-out;

  a {
    text-decoration: none;
    color: #fcfcfc;
    text-transform: uppercase;
    font-feature-settings: "case";
  }

  &:hover {
    a {
      color: rgba(252, 252, 252, 0.7);
    }
  }
`;
type Props = {
  text: string;
  isSmallOnMobile?: boolean;
  href: string;
  tabIndex?: number;
  scrollTo?: string;
  onLinkClick?: () => void; // Added callback for mobile menu closing
};

function NavigationLink({ text, isSmallOnMobile, href, tabIndex, scrollTo, onLinkClick }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    if (scrollTo) {
      e.preventDefault();
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Call the onLinkClick callback if it exists
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <StyledLi>
      <Link href={href} passHref tabIndex={tabIndex} onClick={handleClick}>
        {isSmallOnMobile ? (
          <>
            <Desktop>
              <Typography variant="mBodytext">{text}</Typography>
            </Desktop>
            <Mobile>
              <Typography variant="xsBodytext">{text}</Typography>
            </Mobile>
          </>
        ) : (
          <Typography variant="mBodytext">{text}</Typography>
        )}
      </Link>
    </StyledLi>
  );
}

export default NavigationLink;
