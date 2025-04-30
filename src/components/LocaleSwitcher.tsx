"use client";

import { i18n, type Locale } from "@/i18n-config";
import ChevronIcon from "@/icons/ChevronIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Typography from "./ui/Typography";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  text-transform: uppercase;
  gap: 4px;
  &:hover {
    color: rgba(252, 252, 252, 0.7);
  }
`;

const DropdownContent = styled.ul<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: absolute;
  background-color: white;

  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 8px 0;
  z-index: 1;
  top: 100%;
  left: 0;
  margin-top: 8px;
  list-style: none;
`;

const LocaleItem = styled.li`
  padding: 0;

  a {
    color: black;
    padding: 8px 16px;
    text-decoration: none;
    display: block;
    text-transform: uppercase;
    font-family: Helvetica, Arial, sans-serif;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const StyledChevronContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;
export default function LocaleSwitcher({ tabIndex }: { tabIndex?: number }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get the current locale from the pathname
  const getCurrentLocale = (): Locale => {
    if (!pathname) return i18n.defaultLocale as Locale;
    const segments = pathname.split("/");
    return (segments[1] as Locale) || i18n.defaultLocale;
  };

  const currentLocale = getCurrentLocale();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  // Handle clicks outside of dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={() => setIsOpen(!isOpen)} tabIndex={tabIndex}>
        <Typography variant="mBodytext">{currentLocale}</Typography>

        <StyledChevronContainer $isOpen={isOpen}>
          <ChevronIcon />
        </StyledChevronContainer>
      </DropdownButton>
      <DropdownContent $isOpen={isOpen}>
        {i18n.locales
          ?.filter((locale) => locale !== currentLocale)
          .map((locale) => (
            <LocaleItem key={locale}>
              <Link
                href={redirectedPathname(locale)}
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? tabIndex : -1}
              >
                {locale}
              </Link>
            </LocaleItem>
          ))}
      </DropdownContent>
    </DropdownContainer>
  );
}
