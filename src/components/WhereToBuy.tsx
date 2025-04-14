"use client";
import { getDictionary } from "@/get-dictionary";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Typography from "./ui/Typography";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding: 54px 45px;
`;

const StyledLocations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const StyledBranches = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 89px;
`;

const StyledBranch1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const StyledBranch2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const StyledShop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledContact = styled.div``;

const StyledBio = styled.div`
  display: flex;
  flex-direction: column;
  color: rgba(92, 14, 21, 1);
  gap: 64px;
  padding: 87px 0;
`;

const StyledInfo = styled.div`
  display: flex;
  gap: 13px;
`;

export default function WhereToBuy({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["whereToBuy"];
}) {
  return (
    <StyledContainer>
      <StyledBio>
        <StyledLocations>
          <Typography variant="lBodytext">{dictionary.title}</Typography>
          <StyledBranches>
            <StyledBranch1>
              <StyledShop>
                <Image
                  src="/assets/whereToBuy/location.svg"
                  alt="henka"
                  width={24}
                  height={24}
                />
                <Typography variant="mBodytext">
                  {dictionary.goodwill}
                </Typography>
              </StyledShop>
              <StyledShop>
                <Image
                  src="/assets/whereToBuy/location.svg"
                  alt="henka"
                  width={24}
                  height={24}
                />
                <Typography variant="mBodytext">
                  {dictionary.agrohub}
                </Typography>
              </StyledShop>
              <StyledShop>
                <Image
                  src="/assets/whereToBuy/location.svg"
                  alt="henka"
                  width={24}
                  height={24}
                />
                <Typography variant="mBodytext">
                  {dictionary.europroduct}
                </Typography>
              </StyledShop>
              <StyledShop>
                <Image
                  src="/assets/whereToBuy/location.svg"
                  alt="henka"
                  width={24}
                  height={24}
                />{" "}
                <Typography variant="mBodytext">{dictionary.fresco}</Typography>
              </StyledShop>
            </StyledBranch1>
            <StyledBranch2>
              <StyledShop>
                <Image
                  src="/assets/whereToBuy/location.svg"
                  alt="henka"
                  width={24}
                  height={24}
                />
                <Typography variant="mBodytext">{dictionary.spar}</Typography>
              </StyledShop>
              <StyledShop>
                <Image
                  src="/assets/whereToBuy/location.svg"
                  alt="henka"
                  width={24}
                  height={24}
                />
                <Typography variant="mBodytext">
                  {dictionary.universam}
                </Typography>
              </StyledShop>
              <StyledShop>
                <Image
                  src="/assets/whereToBuy/location.svg"
                  alt="henka"
                  width={24}
                  height={24}
                />{" "}
                <Typography variant="mBodytext">
                  {dictionary.gulfstore}
                </Typography>
              </StyledShop>
              <StyledShop>
                <Image
                  src="/assets/whereToBuy/location.svg"
                  alt="henka"
                  width={24}
                  height={24}
                />
                <Typography variant="mBodytext">
                  {dictionary.oneprice}
                </Typography>
              </StyledShop>
            </StyledBranch2>
          </StyledBranches>
        </StyledLocations>
        <StyledContact>
          <Typography variant="lBodytext">{dictionary.contact}</Typography>

          <StyledInfo>
            <Image
              src="/assets/whereToBuy/mail.svg"
              alt="mail"
              width={24}
              height={24}
            />
            <Typography variant="mBodytext">{dictionary.mail}</Typography>
          </StyledInfo>

          <StyledInfo>
            <Image
              src="/assets/whereToBuy/location.svg"
              alt="mail"
              width={24}
              height={24}
            />
            <Typography variant="mBodytext">{dictionary.location}</Typography>
          </StyledInfo>

          <StyledInfo>
            <Image
              src="/assets/whereToBuy/phone.svg"
              alt="mail"
              width={24}
              height={24}
            />
            <Typography variant="mBodytext">{dictionary.number}</Typography>
          </StyledInfo>
        </StyledContact>
      </StyledBio>
      <Image
        src="/assets/whereToBuy/henkaImage.png"
        alt="henka"
        width={656}
        height={650}
      />
    </StyledContainer>
  );
}
