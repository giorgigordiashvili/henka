'use client'
import Link from 'next/link'
import styled from 'styled-components'
import Typography from './Typography'

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
    font-feature-settings: 'case';
  }

  &:hover {
    a {
      color: rgba(252, 252, 252, 0.7);
    }
  }
`
type Props = {
  text: string
  href: string
}

function NavigationLink({ text, href }: Props) {
  return (
    <StyledLi>
      <Link href={href} passHref>
        <Typography variant="mBodytext">{text}</Typography>
      </Link>
    </StyledLi>
  )
}

export default NavigationLink
