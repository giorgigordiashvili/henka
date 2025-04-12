'use client'
import { getDictionary } from '@/get-dictionary'
import Image from 'next/image'
import styled from 'styled-components'
import Container from './ui/Container'
import MenuItem from './ui/MenuItem'
import Typography from './ui/Typography'

const StyledContainer = styled.div`
  height: calc(100dvh - 78px);
  position: relative;
`

const StyledUnionContainer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 167px;
`

const StyledFruitsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100dvh - 78px - 167px);
`

const StyledContentContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100%;
  align-items: center;
  gap: 32px;
  height: calc(100dvh - 78px - 167px);
  @media (max-width: 1080px) {
    display: flex;
    flex-direction: column;
  }
`

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StyledTagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 44px;
`

const StyledBlurWithBottles = styled.div`
  width: 456px;
  height: 456px;
  position: relative;
`
const StyledBlur = styled.div`
  background: #fff;
  border-radius: 50%;
  font-size: 250px;
  height: 456px;
  width: 456px;
  z-index: -1;
  filter: blur(165px);
`

const StyledTagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`

const StyledPercent = styled.div`
  background: rgba(239, 153, 161, 1);
  padding: 17px 8px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 0px;
  line-height: 36px;
  color: #fff;
  max-width: 88px;
`

const StyledTagText = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  max-width: 206px;
`
export default function Hero({
  dictionary
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['hero']
}) {
  return (
    <StyledContainer>
      <Container>
        <StyledContentContainer>
          <StyledTextContainer>
            <Typography variant="h1">{dictionary.title}</Typography>
            <Typography variant="mBodytext">{dictionary.subtitle}</Typography>
            <MenuItem size="M" text={dictionary.button} href="/" />
          </StyledTextContainer>

          <StyledBlurWithBottles>
            <Image
              style={{ zIndex: 999 }}
              src="/assets/bottles-1.png"
              alt="Bottles"
              fill
            />
            <StyledBlur />
          </StyledBlurWithBottles>
          <StyledTagsContainer>
            <StyledTagContainer>
              <StyledPercent>100%</StyledPercent>
              <StyledTagText>ნატურალური ინგრედიენტები</StyledTagText>
            </StyledTagContainer>
            <StyledTagContainer>
              <StyledPercent>50%</StyledPercent>
              <StyledTagText>დღიური D ვიტამინის დოზა</StyledTagText>
            </StyledTagContainer>
            <StyledTagContainer>
              <StyledPercent>99%</StyledPercent>
              <StyledTagText>პრობიოტიკებით მდიდარი</StyledTagText>
            </StyledTagContainer>
          </StyledTagsContainer>
          <StyledFruitsContainer>
            <Image
              src="/assets/fruits-1.png"
              alt="Fruits"
              fill
              objectFit="contain"
            />
          </StyledFruitsContainer>
        </StyledContentContainer>
      </Container>

      <StyledUnionContainer>
        <Image src="/assets/union-1.png" alt="Union" fill />
      </StyledUnionContainer>
    </StyledContainer>
  )
}
