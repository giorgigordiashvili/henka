// filepath: /Users/giorgigordiashvili/Telos/henka/src/components/ui/Responsive.tsx
"use client";
import { ReactNode } from "react";
import styled from "styled-components";

type ResponsiveProps = {
  children: ReactNode;
};

const DesktopContainer = styled.div`
  @media (max-width: 1366px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const TabletContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }

  @media (min-width: 1367px) {
    display: none;
  }
`;

export function Desktop({ children }: ResponsiveProps) {
  return <DesktopContainer>{children}</DesktopContainer>;
}

export function Tablet({ children }: ResponsiveProps) {
  return <TabletContainer>{children}</TabletContainer>;
}

export function Mobile({ children }: ResponsiveProps) {
  return <MobileContainer>{children}</MobileContainer>;
}
