// // utils/getAccessToken.ts
// import docusign from 'docusign-esign';
// import fs from 'fs';
// import path from 'path';

// export async function getAccessToken() {
//   const privateKeyPath = path.join(process.cwd(), 'docupitch_private_key.pem');
//   const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

//   const apiClient = new docusign.ApiClient();
//   apiClient.setOAuthBasePath('account-d.docusign.com'); // Use demo env

//   const results = await apiClient.requestJWTUserToken(
//     process.env.DOCUSIGN_INTEGRATION_KEY!,
//     process.env.DOCUSIGN_USER_ID!,
//     'signature',
//     privateKey,
//     3600
//   );

//   return results.body.access_token;
// }
