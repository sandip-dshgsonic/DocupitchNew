import React from "react";
// import logo from '../../styles/logo.svg'
import logo from '../../public/logo.png'
import Image from "next/image";

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

console.log('logo.src ',logo.src)

const VerificationLinkEmail = ({
  url = "https://docupitch.com",
}: {
  url: string;
}) => {
  return (
    <Html>
      <Head />
      <Preview>DocuPitch Login Link</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
          <img src='https://github.com/Aniket-Shival/popup/blob/main/logo.png?raw=true' alt='.' style={{ height: '100px', width: '100px', display: 'block', margin: '0 auto' }}  />
            <Text className="mx-0 mb-8 mt-4 p-0 text-center text-2xl font-normal">
              <span className="font-bold tracking-tighter">DocuPitch</span>
            </Text>
            <Text className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Your DocuPitch Login Link
            </Text>

            <Text className="text-sm leading-6 text-black">
              Welcome to DocuPitch!
            </Text>
            <Text className="text-sm leading-6 text-black">
              Please click the magic link below to sign in to your account.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded bg-black text-center text-xs font-semibold text-white no-underline"
                href={url}
                style={{ padding: "12px 20px" }}
              >
                Sign in
              </Button>
            </Section>
            <Text className="text-sm leading-6 text-black">
              or copy and paste this URL into your browser:
            </Text>
            <Text className="max-w-sm flex-wrap break-words font-medium text-purple-600 no-underline">
              {url.replace(/^https?:\/\//, "")}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationLinkEmail;
