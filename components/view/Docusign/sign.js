// docusign secret key = 3b691111-35b7-4d32-a06b-80e994375830

// docusign auth code = eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAYABwCAEK2R9-ncSAgAgJwz2ffp3EgCAFyo3GzZir9Fn8JjUvlil48VAAEAAAAYAAEAAAAFAAAADQAkAAAAZDg2NDZlMDYtNjIzYi00NmIwLTg2YzUtMmQxZDI1ZjRmYmUzIgAkAAAAZDg2NDZlMDYtNjIzYi00NmIwLTg2YzUtMmQxZDI1ZjRmYmUzNwAhCCyrnvs8T6fNSINmbFcwMAAAGANf9-ncSA.SHeuoxqPMBKF5Ld_y7I7r7Yo3tVe_bRRQCbqMxvuWggrIqFzKryuFR5B6_z9w43vjG3wQsSkcDTNSTgJBcUCROM0-9734e8LGyF7d-8RdxtGNuXd0oNwBCbrV_Iokk4xNrmrF6qUuuhcFfbLjdGqeeSO1GPcIDG1kqoh6A6lBj2kE5ypkj0m0zaFgK0VUKqQBatlJrWuhGBafDVaaD2H-N_B5q5opHZspuivoUrBKMcpAJyoNtrJvQ7HNITGyvbuNWp3M_I4AIEWzRvOCUU4vOgNC1COkyzF0sy1f4ireI5Vy0yQEz9OtZJFp5Y6V2QuQxWHSy9sIBEghtgQ64USaw

const docusign = require('docusign-esign');

async function sendForSignature(pdfFile, signerEmail, signerName) {
  let apiClient = new docusign.ApiClient();
  apiClient.setBasePath('https://demo.docusign.net/restapi');
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + '<ACCESS_TOKEN>');

  let envelopeDefinition = new docusign.EnvelopeDefinition();
  envelopeDefinition.emailSubject = 'Please sign this document';
  
  let document = new docusign.Document();
  document.documentBase64 = Buffer.from(pdfFile).toString('base64');
  document.name = 'Uploaded PDF';
  document.fileExtension = 'pdf';
  document.documentId = '1';
  envelopeDefinition.documents = [document];

  let signer = new docusign.Signer();
  signer.email = signerEmail;
  signer.name = signerName;
  signer.recipientId = '1';

  let signHere = new docusign.SignHere();
  signHere.xPosition = '100';
  signHere.yPosition = '150';
  signHere.documentId = '1';
  signHere.pageNumber = '1';
  signer.tabs = new docusign.Tabs();
  signer.tabs.signHereTabs = [signHere];
  
  envelopeDefinition.recipients = new docusign.Recipients();
  envelopeDefinition.recipients.signers = [signer];

  envelopeDefinition.status = 'sent';

  let envelopesApi = new docusign.EnvelopesApi(apiClient);
  let result = await envelopesApi.createEnvelope('<ACCOUNT_ID>', { envelopeDefinition });
  console.log('Envelope sent:', result);
}
