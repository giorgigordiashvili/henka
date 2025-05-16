"use client";

import { getDictionary } from "@/get-dictionary";
import Image from "next/image";
import styled from "styled-components";
import { Desktop, Mobile, Tablet } from "./ui/Responsive";
import Typography from "./ui/Typography";

type WhereToBuyProps = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["whereToBuy"];
};

const StyledMainContainer = styled.div`
  background-color: rgb(252 252 252);
  width: 100%;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 54px 0 0 0;
  background-color: rgb(252 252 252);
  width: 100%;
  max-width: 1344px;
  margin: auto;
  @media (max-width: 1366px) {
    max-width: 1200px;
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: minmax(300px, 1fr);
    padding: 52px 18px 42px 18px;
    gap: 64px;
  }
  @media (max-width: 1279px) {
    display: grid;
    grid-template-columns: minmax(300px, 1fr);
    padding: 60px 24px 28px 24px;
    gap: 32px;
  }
`;

const StyledBio = styled.div`
  display: flex;
  flex-direction: column;
  color: rgba(92, 14, 21, 1);
  gap: 64px;
  padding: 87px 0;

  @media (max-width: 1279px) {
    padding: 12px 0 0 0;
  }
`;

const StyledLocations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const StyledBranches = styled.div`
  display: flex;
  gap: 89px;

  @media (max-width: 1279px) {
    gap: 42px;
  }

  @media (max-width: 390px) {
    gap: 16px;
  }
`;

const StyledBranch1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media (max-width: 1279px) {
    gap: 24px;
  }
`;

const StyledBranch2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media (max-width: 1279px) {
    gap: 24px;
  }
`;

const StyledShop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 1279px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

const StyledContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const StyledContactInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 1279px) {
    gap: 24px;
  }
`;

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  a {
    color: rgba(92, 14, 21, 1);
    text-decoration: none;
  }
`;

const StyledHenka = styled.div`
  width: 656px;
  height: 650px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 1279px) {
    width: calc(100vw - 36px);
    height: 450px;
    display: flex;
    justify-content: center;
  }
  @media (max-width: 768px) {
    width: calc(100vw - 36px);
    height: 335px;
    display: flex;
    justify-content: center;
  }
`;

export default function WhereToBuy({ dictionary }: WhereToBuyProps) {
  return (
    <StyledMainContainer id="whereToBuy">
      <StyledContainer>
        <StyledBio>
          <StyledLocations>
            <Typography variant="lBodytext">{dictionary.title}</Typography>
            <StyledBranches>
              <StyledBranch1>
                <StyledShop>
                  <Image
                    src="/assets/whereToBuy/location.svg"
                    alt="location"
                    width={24}
                    height={24}
                  />
                  <Desktop>
                    <Typography variant="mBodytext">{dictionary.goodwill}</Typography>
                  </Desktop>
                  <Tablet>
                    <Typography variant="mBodytext">{dictionary.goodwill}</Typography>
                  </Tablet>
                  <Mobile>
                    <Typography variant="xsBodytext">{dictionary.goodwill}</Typography>
                  </Mobile>
                </StyledShop>
                <StyledShop>
                  <Image
                    src="/assets/whereToBuy/location.svg"
                    alt="location"
                    width={24}
                    height={24}
                  />
                  <Desktop>
                    <Typography variant="mBodytext">{dictionary.agrohub}</Typography>
                  </Desktop>
                  <Tablet>
                    <Typography variant="mBodytext">{dictionary.agrohub}</Typography>
                  </Tablet>
                  <Mobile>
                    <Typography variant="xsBodytext">{dictionary.agrohub}</Typography>
                  </Mobile>
                </StyledShop>
                <StyledShop>
                  <Image
                    src="/assets/whereToBuy/location.svg"
                    alt="location"
                    width={24}
                    height={24}
                  />
                  <Desktop>
                    <Typography variant="mBodytext">{dictionary.europroduct}</Typography>
                  </Desktop>
                  <Tablet>
                    <Typography variant="mBodytext">{dictionary.europroduct}</Typography>
                  </Tablet>
                  <Mobile>
                    <Typography variant="xsBodytext">{dictionary.europroduct}</Typography>
                  </Mobile>
                </StyledShop>
                <StyledShop>
                  <Image
                    src="/assets/whereToBuy/location.svg"
                    alt="location"
                    width={24}
                    height={24}
                  />
                  <Desktop>
                    <Typography variant="mBodytext">{dictionary.fresco}</Typography>
                  </Desktop>
                  <Tablet>
                    <Typography variant="mBodytext">{dictionary.fresco}</Typography>
                  </Tablet>
                  <Mobile>
                    <Typography variant="xsBodytext">{dictionary.fresco}</Typography>
                  </Mobile>
                </StyledShop>
              </StyledBranch1>
              <StyledBranch2>
                <StyledShop>
                  <Image
                    src="/assets/whereToBuy/location.svg"
                    alt="location"
                    width={24}
                    height={24}
                  />
                  <Desktop>
                    <Typography variant="mBodytext">{dictionary.spar}</Typography>
                  </Desktop>
                  <Tablet>
                    <Typography variant="mBodytext">{dictionary.spar}</Typography>
                  </Tablet>
                  <Mobile>
                    <Typography variant="xsBodytext">{dictionary.spar}</Typography>
                  </Mobile>
                </StyledShop>
                <StyledShop>
                  <Image
                    src="/assets/whereToBuy/location.svg"
                    alt="location"
                    width={24}
                    height={24}
                  />
                  <Desktop>
                    <Typography variant="mBodytext">{dictionary.universam}</Typography>
                  </Desktop>
                  <Tablet>
                    <Typography variant="mBodytext">{dictionary.universam}</Typography>
                  </Tablet>
                  <Mobile>
                    <Typography variant="xsBodytext">{dictionary.universam}</Typography>
                  </Mobile>
                </StyledShop>
                <StyledShop>
                  <Image
                    src="/assets/whereToBuy/location.svg"
                    alt="location"
                    width={24}
                    height={24}
                  />
                  <Desktop>
                    <Typography variant="mBodytext">{dictionary.gulfstore}</Typography>
                  </Desktop>
                  <Tablet>
                    <Typography variant="mBodytext">{dictionary.gulfstore}</Typography>
                  </Tablet>
                  <Mobile>
                    <Typography variant="xsBodytext">{dictionary.gulfstore}</Typography>
                  </Mobile>
                </StyledShop>
                <StyledShop>
                  <Image
                    src="/assets/whereToBuy/location.svg"
                    alt="location"
                    width={24}
                    height={24}
                  />
                  <Desktop>
                    <Typography variant="mBodytext">{dictionary.oneprice}</Typography>
                  </Desktop>
                  <Tablet>
                    <Typography variant="mBodytext">{dictionary.oneprice}</Typography>
                  </Tablet>
                  <Mobile>
                    <Typography variant="xsBodytext">{dictionary.oneprice}</Typography>
                  </Mobile>
                </StyledShop>
              </StyledBranch2>
            </StyledBranches>
          </StyledLocations>
          <StyledContact>
            <Typography variant="lBodytext">{dictionary.contact}</Typography>
            <StyledContactInfos>
              <StyledInfo>
                <Image src="/assets/whereToBuy/mail.svg" alt="mail" width={24} height={24} />
                <Desktop>
                  <Typography variant="mBodytext">{dictionary.mail}</Typography>
                </Desktop>
                <Tablet>
                  <Typography variant="mBodytext">{dictionary.mail}</Typography>
                </Tablet>
                <Mobile>
                  <Typography variant="xsBodytext">{dictionary.mail}</Typography>
                </Mobile>
              </StyledInfo>
              <StyledInfo>
                <Image src="/assets/whereToBuy/location.svg" alt="address" width={24} height={24} />
                <Desktop>
                  <Typography variant="mBodytext">{dictionary.location}</Typography>
                </Desktop>
                <Tablet>
                  <Typography variant="mBodytext">{dictionary.location}</Typography>
                </Tablet>
                <Mobile>
                  <Typography variant="xsBodytext">{dictionary.location}</Typography>
                </Mobile>
              </StyledInfo>
              <StyledInfo>
                <Image src="/assets/whereToBuy/phone.svg" alt="phone" width={24} height={24} />
                <a href="tel:+995577154501">
                  <Desktop>
                    <Typography variant="mBodytext">{dictionary.number}</Typography>
                  </Desktop>
                  <Tablet>
                    <Typography variant="mBodytext">{dictionary.number}</Typography>
                  </Tablet>
                  <Mobile>
                    <Typography variant="xsBodytext">{dictionary.number}</Typography>
                  </Mobile>
                </a>
              </StyledInfo>
            </StyledContactInfos>
          </StyledContact>
        </StyledBio>
        <StyledHenka>
          <Image
            style={{ objectFit: "cover" }}
            src="/assets/whereToBuy/henkaImage.png"
            alt="henka"
            fill
          />
        </StyledHenka>
      </StyledContainer>
    </StyledMainContainer>
  );
}
