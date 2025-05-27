import React from "react";
// import logo from '../../styles/logo.svg'
import logo from '../../public/logo.png'

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string | null | undefined;
}

const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  const previewText = `The pitch sharing infrastructure for the modern web`;

  return (
    <Html>
      <Head>
        <title>Welcome to DocuPitch</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded-xl overflow-hidden shadow-md">
            {/* Header Section */}
            <Section className="bg-orange-100 py-8 px-6 text-center">
              <div className="flex justify-center mb-4">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_626_1333)">
                    <path d="M36 36H0V0H36V36Z" stroke="#E5E7EB"/>
                    <path d="M18 0C18.3235 0 18.6469 0.0703125 18.9422 0.203906L32.1821 5.82188C33.7289 6.47578 34.8821 8.00156 34.875 9.84375C34.8399 16.8188 31.9711 29.5805 19.8563 35.3813C18.6821 35.9438 17.318 35.9438 16.1438 35.3813C4.02894 29.5805 1.16019 16.8188 1.12503 9.84375C1.118 8.00156 2.27113 6.47578 3.818 5.82188L17.0649 0.203906C17.3532 0.0703125 17.6766 0 18 0ZM18 4.69688V31.275C27.7032 26.5781 30.3118 16.1789 30.375 9.94219L18 4.69688Z" fill="#F97316"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_626_1333">
                      <rect width="36" height="36" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <Text className="text-2xl font-semibold mb-1">Welcome to DocuPitch</Text>
              <Text className="text-sm">Thanks for signing up{name && `, ${name}`}!</Text>
            </Section>

            {/* Content Section */}
            <Section className="bg-white px-8 py-10">
              <Text className="text-base mb-6">Here are a few things you can do to get started:</Text>
              
              {/* Card 1 */}
              <div className="bg-orange-100 rounded-lg mb-4 p-4 flex items-center">
                <div className="mr-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1.33334L1.33334 4.66668L8 8.00001L14.6667 4.66668L8 1.33334Z" stroke="#F97316" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.33334 11.3333L8 14.6667L14.6667 11.3333" stroke="#F97316" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.33334 8L8 11.3333L14.6667 8" stroke="#F97316" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-left">
                  <Text className="text-base font-medium m-0">Upload a pitch</Text>
                  <Text className="text-sm text-gray-600 m-0">Share your ideas with potential investors</Text>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-orange-100 rounded-lg mb-4 p-4 flex items-center">
                <div className="mr-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 2H2.66667C1.93029 2 1.33333 2.59695 1.33333 3.33333V12.6667C1.33333 13.403 1.93029 14 2.66667 14H13.3333C14.0697 14 14.6667 13.403 14.6667 12.6667V3.33333C14.6667 2.59695 14.0697 2 13.3333 2Z" stroke="#F97316" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.33333 1.33334V2.66668" stroke="#F97316" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.6667 1.33334V2.66668" stroke="#F97316" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.33333 6H14.6667" stroke="#F97316" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-left">
                  <Text className="text-base font-medium m-0">Create a virtual data room</Text>
                  <Text className="text-sm text-gray-600 m-0">Securely share your documents</Text>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-orange-100 rounded-lg mb-8 p-4 flex items-center">
                <div className="mr-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.66667 8.00001L7.33333 10.6667L11.3333 5.33334" stroke="#F97316" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00001C14.6667 4.31811 11.6819 1.33334 8 1.33334C4.3181 1.33334 1.33333 4.31811 1.33333 8.00001C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="#F97316" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-left">
                  <Text className="text-base font-medium m-0">Share a link with your custom domain<span className="italic">✨</span></Text>
                  <Text className="text-sm text-gray-600 m-0">Make your pitch look professional</Text>
                </div>
              </div>
              
              {/* Button */}
              <Section className="text-center">
                <Button
                  className="bg-orange-500 text-white font-medium py-3 px-6 rounded-full no-underline"
                  href="${process.env.NEXT_PUBLIC_BASE_URL}/welcome"
                >
                  Get Started
                </Button>
              </Section>
            </Section>

            {/* Footer Section */}
            <Section className="bg-white p-6 border-t border-gray-200">
              <Text className="text-xs text-gray-500 text-center">
                © {new Date().getFullYear()} DocuPitch. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;


{/* <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 w-[465px] p-5">
          <img src='https://github.com/Aniket-Shival/popup/blob/main/logo.png?raw=true' alt='.' style={{ height: '100px', width: '100px', display: 'block', margin: '0 auto' }}  />

            <Text className="mx-0 mb-8 mt-4 p-0 text-center text-2xl font-normal">
              Welcome to{" "}
              <span className="font-bold tracking-tighter">DocuPitch</span>
            </Text>
            <Text className="text-sm">
              Thanks for signing up{name && `, ${name}`}!
            </Text>
            <Text className="text-sm">
              Welcome to DocuPitch
            </Text>
            <Text className="text-sm">
              Here are a few things you can do to get started:
            </Text>
            <Text className="text-sm">
              <ul className="list-inside list-disc text-sm">
                <li>Upload a pitch</li>
                 <li>Create a virtual data room</li>
                <li>
                  Share a link{" "}
                  <span className="italic">(with your custom domain)✨</span>
                </li>
                <li>Watch the views come in real-time</li>
              </ul>
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-black text-center text-xs font-semibold text-white no-underline"
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/welcome`}
                style={{ padding: "12px 20px" }}
              >
                Get Started
              </Button>
            </Section>
          
            <Hr />
            
          </Container>
        </Body>
      </Tailwind>
    </Html> */}