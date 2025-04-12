'use client'
import { getDictionary } from '@/get-dictionary'
import Image from 'next/image'
import styled from 'styled-components'
import Container from './ui/Container'
import { Desktop, Mobile } from './ui/Responsive'
import Typography, { H2 } from './ui/Typography'

const StyledContainer = styled.div`
  background-color: #fcfcfc;
  height: 650px;

  @media (max-width: 1080px) {
    height: auto;
  }
`

const StyledTextContainer = styled.div`
  color: rgba(92, 14, 21, 1);
  max-width: 541px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1080px) {
    max-width: calc(100vw - 32px);
  }
`

const StyledFlex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1080px) {
    flex-direction: column;
    gap: 28px;
  }
`

const StyledImageContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 1080px) {
    position: relative;
    width: calc(100vw - 32px);
    height: 343px;
    margin: auto;
  }
`
export default function AboutUs({
  dictionary
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['about']
}) {
  return (
    <StyledContainer>
      <Container>
        <StyledFlex>
          <StyledTextContainer>
            <H2>{dictionary.title}</H2>
            <Typography variant="mBodytext">{dictionary.subtitle}</Typography>
          </StyledTextContainer>
          <StyledImageContainer>
            <Desktop>
              <Image
                src="/assets/about-us.png"
                alt="About Us"
                width={656}
                height={650}
              />
            </Desktop>
            <Mobile>
              <Image src="/assets/about-us.png" alt="About Us" fill />
            </Mobile>
          </StyledImageContainer>
        </StyledFlex>
      </Container>
    </StyledContainer>
  )
}
