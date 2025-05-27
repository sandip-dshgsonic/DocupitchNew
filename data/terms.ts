interface TermsSubsection {
  title: string;
  content: string;
  eSignatureTerms?: string[];
  terminationReasons?: string[];
  terminationEffects?: string[];
  restrictions?: string[];
}

interface TermsItem {
  section?: string;
  title?: string;
  content?: string;
  introduction?: string;
  agreementStatement?: string;
  organizationRepresentation?: string;
  effectiveDate?: string;
  lastUpdated?: string;
  restrictions?: string[];
  enforcementPolicy?: string;
  subsections?: TermsSubsection[];
  disclaimer?: string;
}
export const termsOfService: TermsItem[] = [
  {
    title: "Terms of Service",
    effectiveDate: "Oct 23, 2024",
    lastUpdated: "May 18, 2025",
    introduction: "Welcome to DocuPitch! These Terms of Service (\"Terms\") constitute a legally binding agreement between you (\"you,\" \"your,\" or \"User\") and DocuPitch (\"DocuPitch,\" \"we,\" \"our,\" or \"us\") governing your access to and use of the DocuPitch platform, located at https://www.docupitch.com, including all related websites, services, features, mobile applications, APIs, tools, software, and content (collectively, the \"Services\").",
    agreementStatement: "BY CREATING AN ACCOUNT, ACCESSING, OR USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS, INCLUDING OUR PRIVACY POLICY (AVAILABLE AT [LINK TO PRIVACY POLICY]), WHICH IS INCORPORATED HEREIN BY REFERENCE. IF YOU DO NOT AGREE WITH ANY PART OF THESE TERMS, YOU ARE PROHIBITED FROM USING OR ACCESSING OUR SERVICES.",
    organizationRepresentation: "If you are using the Services on behalf of an organization, company, or other legal entity (\"Organization\"), you represent and warrant that you have the authority to bind that Organization to these Terms, and in such event, \"you\" and \"your\" will refer to that Organization."
  },
  {
    section: "1. Description of Service",
    content: "DocuPitch provides a secure, cloud-based Software-as-a-Service (SaaS) platform that enables Users to create, upload, manage, share, track, and obtain electronic signatures on investor pitch decks, business documents, and other legally binding agreements (\"User Content\"). Our Services include, but are not limited to, document creation and collaboration tools, e-signature functionality, analytics regarding User Content interactions, and document storage. The Services are accessible via supported web browsers and potentially mobile devices. We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time, with or without notice, though we will endeavor to provide notice for material changes."
  },
  {
    section: "2. Eligibility and Account Registration",
    subsections: [
      {
        title: "2.1. Eligibility",
        content: "You must be at least 18 years old (or the age of legal majority in your jurisdiction) and capable of forming a binding contract to use our Services. By using DocuPitch, you represent and warrant that you meet these eligibility requirements and will comply with all applicable laws and regulations. If you are accessing or using the Services on behalf of an Organization, you represent that the Organization is duly organized and in good standing under the laws of its jurisdiction. The Services are not intended for use by individuals or entities in jurisdictions where such use would be contrary to law or regulation."
      },
      {
        title: "2.2. Account Creation",
        content: "To access most features of the Services, you must register for an account (\"Account\"). You agree to provide accurate, current, and complete information during the registration process and to update such information promptly to keep it accurate, current, and complete."
      },
      {
        title: "2.3. Account Security",
        content: "You are solely responsible for safeguarding your Account credentials (username and password) and for all activities that occur under your Account, whether or not you have authorized such activities. You agree not to disclose your password to any third party. You must notify us immediately at support@docupitch.com of any unauthorized use of your Account or any other suspected breach of security. DocuPitch is not liable for any loss or damage arising from your failure to comply with these security obligations."
      },
      {
        title: "2.4. Account Types",
        content: "We may offer different types of accounts or subscription plans with varying features, limitations, and fees. Your specific plan details will be provided at the time of registration or upgrade."
      }
    ]
  },
  {
    section: "3. Acceptable Use and User Conduct",
    content: "You agree to use the Services only for lawful purposes and in accordance with these Terms and all applicable local, state, national, and international laws, rules, and regulations. You are solely responsible for your conduct and your User Content on the Services.",
    restrictions: [
      "Upload, transmit, store, or distribute any User Content that is unlawful, fraudulent, defamatory, libelous, obscene, pornographic, abusive, threatening, harassing, hateful, racially or ethnically offensive, or otherwise objectionable or harmful.",
      "Infringe, misappropriate, or violate the intellectual property rights (including copyrights, patents, trademarks, trade secrets), privacy rights, publicity rights, or other legal rights of any third party.",
      "Use the Services to send unsolicited commercial communications (spam), phishing schemes, or engage in any deceptive practices.",
      "Attempt to reverse-engineer, decompile, disassemble, or otherwise attempt to discover the source code, object code, or underlying structure, ideas, or algorithms of the Services or any software, documentation, or data related to the Services.",
      "Modify, translate, or create derivative works based on the Services.",
      "Upload or transmit viruses, worms, Trojan horses, malware, or any other malicious software or code designed to interrupt, destroy, or limit the functionality of any computer software, hardware, or telecommunications equipment.",
      "Interfere with or disrupt the integrity or performance of the Services, our servers, or networks connected to the Services, or disobey any requirements, procedures, policies, or regulations of networks connected to the Services.",
      "Attempt to gain unauthorized access to the Services, other Users' Accounts, or computer systems or networks connected to the Services.",
      "Use any robot, spider, scraper, or other automated means to access the Services for any purpose without our express written permission.",
      "Use the Services for any illegal or unauthorized purpose, or engage in, promote, or encourage illegal activity.",
      "Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.",
      "Collect or store personal data about other Users without their express permission.",
      "Violate any export control or economic sanctions laws of the United States or any other applicable jurisdiction."
    ],
    enforcementPolicy: "We reserve the right, but are not obligated, to investigate and take appropriate action, including removing User Content, suspending or terminating your Account, and/or reporting you to law enforcement authorities, if we believe, in our sole discretion, that you have violated these Terms or engaged in activities that could harm us, other Users, or third parties."
  },
  {
    section: "4. User Content and Document Handling",
    subsections: [
      {
        title: "4.1. Your Responsibility for User Content",
        content: "You are solely responsible for all User Content that you upload, create, submit, send, receive, or store through the Services. This includes ensuring the accuracy, legality, and appropriateness of your User Content, and that you have all necessary rights, licenses, consents, and permissions to use and share your User Content via the Services. DocuPitch does not claim ownership of your User Content."
      },
      {
        title: "4.2. E-Signature Services",
        content: "DocuPitch provides e-signature functionality intended to comply with applicable electronic signature laws, such as the U.S. Electronic Signatures in Global and National Commerce Act (ESIGN Act) and the EU eIDAS Regulation.",
        eSignatureTerms: [
          "Electronic signatures executed through the Services can be valid and legally binding, subject to applicable law and the specific circumstances of the transaction.",
          "You are responsible for determining whether an e-signature is appropriate and legally valid for your specific documents and jurisdictions involved.",
          "You have obtained all necessary consents from all parties involved before initiating any e-signature process or sharing documents for signature.",
          "DocuPitch provides a platform for executing e-signatures but is not a party to any agreement signed using the Services."
        ]
      },
      {
        title: "4.3. No Legal Advice",
        content: "DocuPitch does not review or validate the content of documents. We are not a law firm and do not provide legal, financial, or any other professional advice. Any information or tools provided by the Services (e.g., templates) are for informational purposes only and should not be construed as legal advice. You should consult with a qualified professional for advice tailored to your specific situation."
      },
      {
        title: "4.4. Audit Trails",
        content: "The Services may create and maintain audit trails for documents processed, including information such as IP addresses, timestamps, and actions taken by Users. You consent to the creation of these audit trails."
      }
    ]
  },
  {
    section: "5. Fees, Payments, and Subscriptions",
    subsections: [
      {
        title: "5.1. Fees",
        content: "Certain features or usage tiers of the Services may require payment of fees (\"Fees\"). All applicable Fees are disclosed on our pricing page or as otherwise communicated to you before you incur them. We reserve the right to change our Fees or billing methods upon reasonable prior notice to you, which may be sent by email or posted on the Services."
      },
      {
        title: "5.2. Payment Authorization",
        content: "By subscribing to a paid plan or purchasing Services, you authorize us (or our third-party payment processor) to charge your chosen payment method (e.g., credit card) for the Fees on a recurring basis (e.g., monthly or annually) as specified in your plan, until your subscription is canceled or terminated."
      },
      {
        title: "5.3. Subscription Renewal",
        content: "Unless you cancel your subscription before the end of the current subscription period, your subscription will automatically renew for an equivalent period, and you authorize us to collect the then-applicable subscription Fee using any payment method we have on record for you."
      },
      {
        title: "5.4. Cancellations",
        content: "You may cancel your subscription at any time through your Account settings or by contacting us. Cancellations will take effect at the end of your current billing cycle."
      },
      {
        title: "5.5. No Refunds",
        content: "Fees paid are non-refundable, except as expressly stated in these Terms, as required by applicable law, or at our sole discretion."
      },
      {
        title: "5.6. Taxes",
        content: "All Fees are exclusive of applicable taxes (e.g., sales tax, VAT), duties, or levies, which you are responsible for paying, unless otherwise stated. We may charge you such taxes if required by law."
      },
      {
        title: "5.7. Late Payments",
        content: "If any amounts owed by you are not received by the due date, we may, without limiting our other rights and remedies: (a) charge late fees and/or interest on the overdue amount at the rate of 1.5% per month or the highest rate permitted by law, whichever is lower; and/or (b) suspend or terminate your access to the paid features of the Services until such amounts are paid in full."
      },
      {
        title: "5.8. Free Trials",
        content: "We may offer free trials or promotional access to certain Services. Such access is subject to these Terms and any additional terms specified during the trial offer. We reserve the right to modify or terminate free trials at any time without notice."
      }
    ]
  },
  {
    section: "6. Data Security and Privacy",
    content: "We are committed to protecting your privacy and securing your data. Our collection, use, and storage of your Personal Information and User Content are governed by our Privacy Policy [LINK TO PRIVACY POLICY]. DocuPitch implements industry-standard security measures, such as TLS encryption for data in transit, AES-256 encryption for data at rest, role-based access controls, and audit trails. However, you acknowledge that no security system is impenetrable, and we cannot guarantee the absolute security of your information. You are also responsible for maintaining the security of your own systems and devices used to access the Services."
  },
  {
    section: "7. Intellectual Property Rights",
    subsections: [
      {
        title: "7.1. DocuPitch IP",
        content: "All right, title, and interest in and to the Services, including all content (excluding User Content), branding, logos, visual interfaces, graphics, design, compilation, information, data, computer code (including source code and object code), features, and underlying technology, and all intellectual property rights therein (\"DocuPitch IP\"), are and will remain the exclusive property of DocuPitch LLC and its licensors. These Terms do not grant you any right, title, or interest in or to the DocuPitch IP, except for the limited license to use the Services as expressly permitted herein. You may not copy, modify, distribute, sell, lease, create derivative works from, or reverse engineer any part of the DocuPitch IP without our prior written consent. All rights not expressly granted are reserved by DocuPitch."
      },
      {
        title: "7.2. User Content IP",
        content: "You retain all ownership rights to your User Content. By uploading, creating, or otherwise providing User Content to or through the Services, you grant DocuPitch a limited, non-exclusive, worldwide, royalty-free, sublicensable (through multiple tiers, e.g., to our hosting providers) license to use, host, store, reproduce, modify (e.g., for formatting or display purposes), transmit, distribute, and display your User Content solely to the extent necessary to provide, maintain, and improve the Services for you and as permitted by our Privacy Policy. This license terminates when you delete your User Content or your Account, subject to our data retention policies and legal obligations."
      },
      {
        title: "7.3. User Representations for User Content",
        content: "You represent and warrant that: (i) you own or have all necessary licenses, rights, consents, and permissions to your User Content and to grant the licenses set forth in these Terms; and (ii.) your User Content, and its use by DocuPitch as contemplated by these Terms, will not infringe, misappropriate, or violate any third party's intellectual property rights, or rights of publicity or privacy, or result in the violation of any applicable law or regulation."
      },
      {
        title: "7.4. Feedback",
        content: "If you provide us with any suggestions, comments, ideas, improvements, or other feedback regarding the Services (\"Feedback\"), you hereby grant DocuPitch a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, fully paid-up, sublicensable right and license to use, reproduce, perform, display, distribute, adapt, modify, re-format, create derivative works of, and otherwise commercially or non-commercially exploit in any manner, any and all Feedback, without any obligation or compensation to you."
      }
    ]
  },
  {
    section: "8. Third-Party Services and Links",
    content: "The Services may contain links to third-party websites, services, or resources, or integrate with third-party applications, that are not owned or controlled by DocuPitch. We do not endorse and are not responsible or liable for the availability, accuracy, content, products, or services of such third parties. You acknowledge that you access and use such third-party services at your own risk, and that these Terms and our Privacy Policy do not apply to your use of such third-party services. Your interactions with third parties are solely between you and the third party."
  },
  {
    section: "9. Term and Termination",
    subsections: [
      {
        title: "9.1. Term",
        content: "These Terms will remain in full force and effect as long as you continue to access or use the Services, or until terminated in accordance with this Section."
      },
      {
        title: "9.2. Termination by You",
        content: "You may terminate your Account and these Terms at any time by following the account closure procedures within the Services or by contacting us at support@docupitch.com."
      },
      {
        title: "9.3. Termination or Suspension by DocuPitch",
        content: "We reserve the right to suspend or terminate your Account and access to the Services, at our sole discretion, with or without notice, for any reason, including but not limited to:",
        terminationReasons: [
          "Your breach of these Terms or our Privacy Policy.",
          "Your engagement in fraudulent, abusive, or illegal activities.",
          "Non-payment of Fees.",
          "Extended periods of inactivity (as determined by us).",
          "A request by law enforcement or other government agencies.",
          "Discontinuation or material modification of the Services.",
          "Unexpected technical or security issues."
        ]
      },
      {
        title: "9.4. Effect of Termination",
        content: "Upon termination of your Account or these Terms for any reason:",
        terminationEffects: [
          "Your right to access and use the Services will immediately cease.",
          "We may, in our sole discretion, delete your Account and all associated User Content after a reasonable grace period (e.g., 30 days), unless otherwise required by law or our data retention policies (see Privacy Policy). We are not liable for any loss or damage resulting from such deletion.",
          "Any Fees paid are non-refundable, and you will remain liable for any unpaid Fees accrued prior to termination."
        ]
      },
      {
        title: "9.5. Survival",
        content: "The following Sections will survive any termination or expiration of these Terms: 2.1 (Eligibility, for representations made), 4 (User Content and Document Handling, for ongoing responsibilities and licenses granted for archival/backup), 5 (Fees, for amounts due), 6 (Data Security and Privacy, for ongoing obligations), 7 (Intellectual Property), 10 (Disclaimers), 11 (Limitation of Liability), 12 (Indemnification), 13 (Governing Law and Dispute Resolution), 16 (General Provisions), and any other provisions that by their nature should survive."
      }
    ]
  },
  {
    section: "10. Disclaimers of Warranties",
    content: "THE SERVICES ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, DOCUPITCH, ITS AFFILIATES, AND ITS LICENSORS DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE.\n\nDOCUPITCH DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, ERROR-FREE, ACCURATE, RELIABLE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. WE DO NOT WARRANT THAT ANY DEFECTS WILL BE CORRECTED. YOU ACKNOWLEDGE THAT YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK.\n\nNO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM DOCUPITCH OR THROUGH THE SERVICES WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED HEREIN."
  },
  {
    section: "11. Limitation of Liability",
    content: "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DOCUPITCH, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, REVENUE, DATA, GOODWILL, USE, OR OTHER INTANGIBLE LOSSES (EVEN IF DOCUPITCH HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), ARISING OUT OF OR RELATING TO:\n\n(I) YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE SERVICES;\n(II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES;\n(III) ANY USER CONTENT OBTAINED FROM OR THROUGH THE SERVICES;\n(IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR USER CONTENT; OR\n(V) ANY OTHER MATTER RELATING TO THE SERVICES.\n\nIN NO EVENT SHALL DOCUPITCH'S TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES EXCEED THE GREATER OF (A) THE TOTAL AMOUNT OF FEES, IF ANY, PAID BY YOU TO DOCUPITCH FOR USE OF THE SERVICES DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS (USD $100.00).\n\nSOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR CERTAIN TYPES OF DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU."
  },
  {
    section: "12. Indemnification",
    content: "You agree to indemnify, defend, and hold harmless DocuPitch and its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, and fees (including reasonable attorneys' fees) arising out of or relating to:\n\n(i) Your access to or use of the Services;\n(ii) Your User Content, including any claim that your User Content infringes or misappropriates the intellectual property or other rights of a third party;\n(iii) Your violation of these Terms or any applicable law or regulation;\n(iv) Your violation of any rights of any third party; or\n(v) Any dispute or issue between you and any third party.\n\nDocuPitch reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will cooperate with DocuPitch in asserting any available defenses."
  },
  {
    section: "13. Governing Law and Dispute Resolution",
    subsections: [
      {
        title: "13.1. Governing Law",
        content: "These Terms and any action related thereto will be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions."
      },
      {
        title: "13.2. Informal Dispute Resolution",
        content: "We want to address your concerns without needing a formal legal case. Before filing a claim against DocuPitch, you agree to try to resolve the dispute informally by contacting us at support@docupitch.com with \"Dispute Notice\" in the subject line. We'll try to resolve the dispute informally by contacting you via email. If a dispute is not resolved within sixty (60) days of submission, you or DocuPitch may bring a formal proceeding."
      },
      {
        title: "13.3. Arbitration Agreement",
        content: "You and DocuPitch agree to resolve any claims relating to these Terms or the Services through final and binding arbitration conducted by a single arbitrator, except as set forth under \"Exceptions to Agreement to Arbitrate\" below. This includes disputes arising out of or relating to interpretation or applicability of this \"Arbitration Agreement\" clause, including its enforceability, revocability, or validity. The arbitration will be administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules (or Commercial Arbitration Rules, if applicable), then in effect. The arbitration will be held in Sarasota, Florida, or any other location we agree to."
      },
      {
        title: "13.4. Arbitration Fees",
        content: "The AAA rules will govern payment of all arbitration fees. DocuPitch will pay all arbitration fees for claims less than $75,000 unless the arbitrator finds the arbitration frivolous. For claims over $75,000, fees will be split as per AAA rules."
      },
      {
        title: "13.5. Exceptions to Agreement to Arbitrate",
        content: "Either party may bring a lawsuit solely for injunctive relief to stop unauthorized use or abuse of the Services, or intellectual property infringement (for example, trademark, trade secret, copyright, or patent rights) without first engaging in arbitration or the informal dispute-resolution process described above. Additionally, if the arbitration agreement is found not to apply to you or your claim, you agree to the exclusive jurisdiction of the state and federal courts in Sarasota County, Florida, to resolve your claim."
      },
      {
        title: "13.6. NO CLASS ACTIONS",
        content: "YOU MAY ONLY RESOLVE DISPUTES WITH US ON AN INDIVIDUAL BASIS, AND MAY NOT BRING A CLAIM AS A PLAINTIFF OR A CLASS MEMBER IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. CLASS ARBITRATIONS, CLASS ACTIONS, PRIVATE ATTORNEY GENERAL ACTIONS, AND CONSOLIDATION WITH OTHER ARBITRATIONS AREN'T ALLOWED."
      },
      {
        title: "13.7. WAIVER OF JURY TRIAL",
        content: "BOTH YOU AND DOCUPITCH WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY. You and DocuPitch are instead electing to have claims and disputes resolved by arbitration."
      }
    ]
  },
  {
    section: "14. Changes to These Terms",
    content: "We reserve the right to modify or update these Terms at any time, in our sole discretion. If we make changes to these Terms, we will post the revised Terms on this page and update the \"Last Updated\" date at the top. If the changes are material, we will provide you with more prominent notice, such as by sending an email notification or displaying a notice within the Services, prior to the change becoming effective. Your continued access to or use of the Services after the revised Terms have become effective constitutes your acceptance of the revised Terms. If you do not agree to the new Terms, you must stop using the Services."
  },
  {
    section: "15. Contact Us",
    content: "If you have any questions, comments, or concerns regarding these Terms or the Services, please contact us:\n\nDocuPitch LLC\nAttn: Legal Department\n8350 Bee Ridge Road\nSarasota, FL 34241\nUSA\n📧 Email: support@docupitch.com (Please include \"Terms of Service Inquiry\" in the subject line)"
  },
  {
    section: "16. General Provisions",
    subsections: [
      {
        title: "16.1. Entire Agreement",
        content: "These Terms, together with our Privacy Policy and any other agreements expressly incorporated by reference, constitute the entire and exclusive understanding and agreement between DocuPitch and you regarding the Services, and supersede and replace any and all prior oral or written understandings or agreements between DocuPitch and you regarding the Services."
      },
      {
        title: "16.2. Severability",
        content: "If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision will be modified to the extent necessary to render it enforceable while achieving the original intent as closely as possible, and the remaining provisions of these Terms will remain in full force and effect."
      },
      {
        title: "16.3. Waiver",
        content: "Our failure to enforce any right or provision of these Terms will not be considered a waiver of such right or provision. The waiver of any such right or provision will be effective only if in writing and signed by a duly authorized representative of DocuPitch."
      },
      {
        title: "16.4. Assignment",
        content: "You may not assign or transfer these Terms, by operation of law or otherwise, without DocuPitch's prior written consent. Any attempt by you to assign or transfer these Terms, without such consent, will be null and void. DocuPitch may freely assign or transfer these Terms without restriction. Subject to the foregoing, these Terms will bind and inure to the benefit of the parties, their successors, and permitted assigns."
      },
      {
        title: "16.5. Notices",
        content: "Any notices or other communications provided by DocuPitch under these Terms, including those regarding modifications to these Terms, will be given: (i) via email; or (ii) by posting to the Services. For notices made by e-mail, the date of receipt will be deemed the date on which such notice is transmitted."
      },
      {
        title: "16.6. Force Majeure",
        content: "DocuPitch shall not be liable for any failure to perform its obligations hereunder where such failure results from any cause beyond DocuPitch's reasonable control, including, without limitation, mechanical, electronic, or communications failure or degradation, acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, or strikes."
      },
      {
        title: "16.7. Headings",
        content: "The headings in these Terms are for convenience only and shall not affect their interpretation."
      },
      {
        title: "16.8. Export Control",
        content: "You agree to comply with all U.S. and foreign export laws and regulations to ensure that neither the Services nor any technical data related thereto nor any direct product thereof is exported or re-exported directly or indirectly in violation of, or used for any purposes prohibited by, such laws and regulations."
      },
      {
        title: "16.9. Relationship of the Parties",
        content: "The parties are independent contractors. These Terms do not create a partnership, franchise, joint venture, agency, fiduciary, or employment relationship between the parties."
      }
    ]
  },
  {
    disclaimer: "Disclaimer: This is a sample Terms of Service and should not be considered legal advice. You should consult with a qualified legal professional to ensure these terms are appropriate for your specific business, services, and jurisdiction, and that they comply with all applicable laws and regulations."
  }
];