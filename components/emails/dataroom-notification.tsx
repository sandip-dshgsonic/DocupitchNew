import React from "react";

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function DataroomNotification({
  dataroomName,
  documentName,
  senderEmail,
  url,
}: {
  dataroomName: string;
  documentName: string | undefined;
  senderEmail: string;
  url: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>View dataroom on DocuPitch</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 w-[465px] p-5">
            <Text className="mx-0 mb-8 mt-4 p-0 text-center text-2xl font-normal">
              <span className="font-bold tracking-tighter">DocuPitch</span>
            </Text>
            <Text className="font-seminbold mx-0 mb-8 mt-4 p-0 text-center text-xl">
              {`New document available for ${dataroomName}`}
            </Text>
            <Text className="text-sm leading-6 text-black">Hey!</Text>
            <Text className="text-sm leading-6 text-black">
              A new document{" "}
              <span className="font-semibold">{documentName}</span> has been
              added to <span className="font-semibold">{dataroomName}</span>{" "}
              dataroom on DocuPitch.
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-black text-center text-xs font-semibold text-white no-underline"
                href={`${url}`}
                style={{ padding: "12px 20px" }}
              >
                View the dataroom
              </Button>
            </Section>
            <Text className="text-sm text-black">
              or copy and paste this URL into your browser: <br />
              {`${url}`}
            </Text>
            <Text className="text-sm text-gray-400">DocuPitch</Text>
            <Hr />
            <Section className="mt-8 text-gray-400">
              <Text className="text-xs">
                © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.docupitch.com" // by aniket
                  // href="https://www.papermark.io"
                  className="text-gray-400 no-underline visited:text-gray-400 hover:text-gray-400"
                  target="_blank"
                >
                  docupitch.io
                </a>
              </Text>
              <Text className="text-xs">
                If you have any feedback or questions about this email, simply
                reply to it.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
