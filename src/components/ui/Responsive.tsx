// filepath: /Users/giorgigordiashvili/Telos/henka/src/components/ui/Responsive.tsx
"use client";
import { ReactNode } from "react";
import styled from "styled-components";

type ResponsiveProps = {
  children: ReactNode;
};

const DesktopContainer = styled.div`
  @media (max-width: 1080px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;
  @media (max-width: 1080px) {
    display: block;
  }
`;

export function Desktop({ children }: ResponsiveProps) {
  return <DesktopContainer>{children}</DesktopContainer>;
}

export function Mobile({ children }: ResponsiveProps) {
  return <MobileContainer>{children}</MobileContainer>;
}
