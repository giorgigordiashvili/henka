import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 1344px;
  margin: auto;
  @media (max-width: 1366px) {
    max-width: 1200px;
  }
  @media (max-width: 1279px) {
    max-width: 100%;
  }
`;
type Props = {
  children: React.ReactNode;
};

function Container({ children }: Props) {
  return <StyledContainer>{children}</StyledContainer>;
}

export default Container;
