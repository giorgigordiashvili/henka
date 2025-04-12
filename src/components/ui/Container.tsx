import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  max-width: 1334px;
  margin: auto;
  @media (max-width: 1080px) {
    max-width: 100%;
  }
`
type Props = {
  children: React.ReactNode
}

function Container({ children }: Props) {
  return <StyledContainer>{children}</StyledContainer>
}

export default Container
