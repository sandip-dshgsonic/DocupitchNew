// utils/docusign-auth.js
import { ApiClient } from 'docusign-esign';
import fs from 'fs';
import path from 'path';

export async function getDocuSignToken() {
  try {
    const jwtLifeSec = 3600; // 1 hour
    const dsApiClient = new ApiClient();
    dsApiClient.setOAuthBasePath('account-d.docusign.com');
    
    // Read your RSA private key
    const privateKeyFile = path.resolve(process.cwd(), 'docupitch_private_key.pem');
    const privateKey = fs.readFileSync(privateKeyFile);
    
    try {
      const results = await dsApiClient.requestJWTUserToken(
        process.env.DOCUSIGN_INTEGRATION_KEY,
        process.env.DOCUSIGN_USER_ID,
        ['signature', 'impersonation'],
        privateKey,
        jwtLifeSec
      );
      
      return results.body.access_token;
    } catch (error) {
      if (error.response?.body?.error === 'consent_required') {
        // Return a special error that indicates consent is needed
        throw {
          type: 'consent_required',
          message: 'User consent required for DocuSign integration',
          consentUrl: `/docusign-consent`
        };
      }
      
      // Other errors
      throw error;
    }
  } catch (error) {
    console.error('Error getting DocuSign JWT token:', error);
    throw error;
  }
}