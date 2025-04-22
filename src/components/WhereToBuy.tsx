"use client";
import { getDictionary } from "@/get-dictionary";
import Image from "next/image";
import styled from "styled-components";
import Typography from "./ui/Typography";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  padding: 54px 45px;
  background-color: rgb(252 252 252);
  width: 100%;
  max-width: 1334px;
  margin: auto;
  @media (max-width: 1080px) {
    display: grid;
    grid-template-columns: minmax(350px, 1fr);
    padding: 52px 18px;
    gap: 64px;
  }
`;

const StyledLocations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const StyledContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const StyledBranches = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 89px;
  @media (max-width: 1080px) {
    gap: 42px;
  }
  @media (max-width: 390px) {
    gap: 16px;
  }
`;

const StyledContactInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledBranch1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 1080px) {
    width: auto;
  }
`;

const StyledBranch2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledShop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledBio = styled.div`
  display: flex;
  flex-direction: column;
  color: rgba(92, 14, 21, 1);
  gap: 64px;
  padding: 87px 0;
  @media (max-width: 1080px) {
    padding: 12px 0;
    width: calc(100% - 36px);
  }
`;

const StyledInfo = styled.div`
  align-items: center;
  display: flex;
  gap: 13px;
`;

const StyledHenka = styled.div`
  width: 656px;
  height: 650px;
  position: relative;
  @media (max-width: 1080px) {
    width: fit-content;
    width: calc(100% - 36px);
    height: 335px;
    display: flex;
    justify-content: center;
    img {
      width: 100%;
      height: 335px;
      object-fit: contain;
    }
  }
`;

const StyledMainContainer = styled.div`
  background-color: rgb(252 252 252);
  width: 100%;
`;

export default function WhereToBuy({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["whereToBuy"];
}) {
  return (
    <StyledMainContainer id="whereToBuy">
      <StyledContainer>
        <StyledBio>
          <StyledLocations>
            <Typography variant="lBodytext">{dictionary.title}</Typography>
            <StyledBranches>
              <StyledBranch1>
                <StyledShop>
                  <Image src="/assets/whereToBuy/location.svg" alt="henka" width={24} height={24} />
                  <Typography variant="mBodytext">{dictionary.goodwill}</Typography>
                </StyledShop>
                <StyledShop>
                  <Image src="/assets/whereToBuy/location.svg" alt="henka" width={24} height={24} />
                  <Typography variant="mBodytext">{dictionary.agrohub}</Typography>
                </StyledShop>
                <StyledShop>
                  <Image src="/assets/whereToBuy/location.svg" alt="henka" width={24} height={24} />
                  <Typography variant="mBodytext">{dictionary.europroduct}</Typography>
                </StyledShop>
                <StyledShop>
                  <Image src="/assets/whereToBuy/location.svg" alt="henka" width={24} height={24} />{" "}
                  <Typography variant="mBodytext">{dictionary.fresco}</Typography>
                </StyledShop>
              </StyledBranch1>
              <StyledBranch2>
                <StyledShop>
                  <Image src="/assets/whereToBuy/location.svg" alt="henka" width={24} height={24} />
                  <Typography variant="mBodytext">{dictionary.spar}</Typography>
                </StyledShop>
                <StyledShop>
                  <Image src="/assets/whereToBuy/location.svg" alt="henka" width={24} height={24} />
                  <Typography variant="mBodytext">{dictionary.universam}</Typography>
                </StyledShop>
                <StyledShop>
                  <Image src="/assets/whereToBuy/location.svg" alt="henka" width={24} height={24} />{" "}
                  <Typography variant="mBodytext">{dictionary.gulfstore}</Typography>
                </StyledShop>
                <StyledShop>
                  <Image src="/assets/whereToBuy/location.svg" alt="henka" width={24} height={24} />
                  <Typography variant="mBodytext">{dictionary.oneprice}</Typography>
                </StyledShop>
              </StyledBranch2>
            </StyledBranches>
          </StyledLocations>
          <StyledContact>
            <Typography variant="lBodytext">{dictionary.contact}</Typography>
            <StyledContactInfos>
              <StyledInfo>
                <Image src="/assets/whereToBuy/mail.svg" alt="mail" width={24} height={24} />
                <Typography variant="mBodytext">{dictionary.mail}</Typography>
              </StyledInfo>

              <StyledInfo>
                <Image src="/assets/whereToBuy/location.svg" alt="mail" width={24} height={24} />
                <Typography variant="mBodytext">{dictionary.location}</Typography>
              </StyledInfo>

              <StyledInfo>
                <Image src="/assets/whereToBuy/phone.svg" alt="mail" width={24} height={24} />
                <Typography variant="mBodytext">{dictionary.number}</Typography>
              </StyledInfo>
            </StyledContactInfos>
          </StyledContact>
        </StyledBio>
        <StyledHenka>
          <Image
            src="/assets/whereToBuy/henkaImage.png"
            alt="henka"
            fill
            style={{ objectFit: "contain" }}
          />
        </StyledHenka>
      </StyledContainer>
    </StyledMainContainer>
  );
}
