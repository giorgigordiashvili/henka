"use client";
import styled from "styled-components";
import Typography from "./Typography";

const StyledButton = styled.div<{ size: "S" | "M" }>`
  display: flex;
  box-sizing: border-box;
  width: ${({ size }) => (size === "S" ? "140px" : "159px")};
  height: ${({ size }) => (size === "S" ? "42px" : "50px")};
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => (size === "S" ? "12px 30px" : "10px 28px")};
  border-radius: 20px;
  width: fit-content;
  background-color: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  text-decoration: none;
  color: #5c0e15;
  font-feature-settings: "case";
  transition: all 0.3s ease-in-out;

  &:hover {
    background: transparent;
    color: #fff;
  }
`;
type Props = {
  size: "S" | "M";
  text: string;
  fullWidth?: boolean;
  onClick?: () => void;
};

function MenuItem({ size, text, fullWidth, onClick }: Props) {
  return (
    <StyledButton
      onClick={onClick}
      style={{ width: fullWidth ? "100%" : "fit-content" }}
      size={size}
    >
      <Typography variant={size === "S" ? "xsBodytext" : "mBodytext"}>{text}</Typography>
    </StyledButton>
  );
}

export default MenuItem;
