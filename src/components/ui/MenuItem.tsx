'use client'
import Link from 'next/link'
import styled from 'styled-components'
import Typography from './Typography'

const StyledButton = styled.div<{ size: 'S' | 'M' }>`
  display: flex;
  box-sizing: border-box;
  width: ${({ size }) => (size === 'S' ? '140px' : '159px')};
  height: ${({ size }) => (size === 'S' ? '42px' : '50px')};
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => (size === 'S' ? '12px 30px' : '10px 28px')};
  border-radius: 20px;
  width: fit-content;
  background-color: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  a {
    text-decoration: none;
    color: #5c0e15;
    font-feature-settings: 'case';
  }
  &:hover {
    background: transparent;
    a {
      color: #fff;
    }
  }
`
type Props = {
  size: 'S' | 'M'
  text: string
  href: string
}

function MenuItem({ size, text, href }: Props) {
  return (
    <StyledButton size={size}>
      <Link href={href} passHref>
        <Typography variant={size === 'S' ? 'xsBodytext' : 'mBodytext'}>
          {text}
        </Typography>
      </Link>
    </StyledButton>
  )
}

export default MenuItem
