
import { useState } from "react";

export default function PDFSignatureSection(props: {
  file: string;
  documentId: string;
  viewId: string;
  linkId: string;
  versionNumber: string;
  viewerEmail?: string;
  creatorEmail?: string;
  signaturePage?: number;
  signatureX?: number;        // Recorded x coordinate from click
  signatureY?: number;        // Recorded y coordinate from click
  renderedWidth?: number;     // Recorded rendered page width from click
  renderedHeight?: number;    // Recorded rendered page height from click
}) {
  const [signatureText, setSignatureText] = useState("");
  const [recipientEmails, setRecipientEmails] = useState("");
  const [signing, setSigning] = useState(false);

  async function handleSignAndSend() {
    if (!signatureText) {
      alert("Please enter your signature.");
      return;
    }
    setSigning(true);
    try {
      // 1. Fetch the original PDF file as an ArrayBuffer
      const existingPdfBytes = await (await fetch(props.file)).arrayBuffer();

      // 2. Import pdf-lib dynamically
      const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");

      // 3. Load the PDF document
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // 4. Embed the standard font (or embed your preferred one)
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // 5. Get the target page (adjusted for 0-index)
      const pages = pdfDoc.getPages();
      const pageIndex = (props.signaturePage || 1) - 1;
      const targetPage = pages[pageIndex];

      // 6. Get the actual PDF page dimensions
      const { width: pdfWidth, height: pdfHeight } = targetPage.getSize();

      console.log("renderedWidth:", props.renderedWidth, "renderedHeight:", props.renderedHeight);
      console.log("PDF Width:", pdfWidth, "PDF Height:", pdfHeight);

      // 7. Get the rendered dimensions that were recorded during the click.
      //    If they aren't present, you must handle this case (here we assume they are provided).
      const renderedWidth = props.renderedWidth;
      const renderedHeight = props.renderedHeight;

      if (!renderedWidth || !renderedHeight) {
        alert("Rendered dimensions missing. Please record them correctly.");
        setSigning(false);
        return;
      }

      // 8. Calculate scale factors based on rendered dimensions to actual PDF dimensions.
      const scaleX = pdfWidth / renderedWidth;
      const scaleY = pdfHeight / renderedHeight;

console.log("Scale X:", scaleX, "Scale Y:", scaleY);

      // 9. Get recorded click coordinates
      const recordedX = props.signatureX || 0;
      const recordedY = props.signatureY || 0;

      console.log("Recorded X:", recordedX, "Recorded Y:", recordedY);

      // 10. Set the font size for signature
      const fontSize = 30;

      // 11. Convert coordinates:
      //     For X, simple scale works.
      const pdfX = recordedX * scaleX;

      //     For Y, flip the coordinate and adjust with an extra offset if needed.
      //     pdf-lib’s coordinate system has the origin at the bottom-left.
      //     The Y coordinate here defines the text baseline.
      //     You might experiment with subtracting additional offset (here baselineOffset) to lower the text.
      const baselineOffset = 20;
      const pdfY = pdfHeight - recordedY * scaleY  ;

      console.log("PDF X:", pdfX, "PDF Y:", pdfY);
      // const pdfY = pdfHeight - recordedY * scaleY - baselineOffset - fontSize ;

      // const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");
      const fontkit = (await import("@pdf-lib/fontkit")).default;
      
      // Load the PDF
      // const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
      // 🔑 Register fontkit
      pdfDoc.registerFontkit(fontkit);
      
      // Embed your custom cursive font
      const fontBytes = await fetch("/fonts/GreatVibes-Regular.otf").then(res => res.arrayBuffer());
      const cursiveFont = await pdfDoc.embedFont(fontBytes);
      



      // const fontBytes = await fetch("/fonts/GreatVibes-Regular.otf").then(res => res.arrayBuffer());
// const cursiveFont = await pdfDoc.embedFont(fontBytes);

      // 12. Draw the signature text on the PDF page
      targetPage.drawText(signatureText, {
        x: pdfX,
        y: pdfY,
        size: fontSize,
        font: cursiveFont,
        color: rgb(0, 0, 0)
      });

      // Date (a little below signature)
const date = new Date().toLocaleDateString();
targetPage.drawText(`Date: ${date}`, {
  x: pdfX,
  y: pdfY - fontSize - 10, // 10px gap below signature
  size: 22,
  font: font, // Use Helvetica or keep cursiveFont if you like
  color: rgb(0.2, 0.2, 0.2),
});

      // 13. Save the signed PDF
      const signedPdfBytes = await pdfDoc.save();

      // 14. Trigger a download (or you can send this to your backend)
      const blob = new Blob([signedPdfBytes], { type: "application/pdf" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "signed-document.pdf";
      downloadLink.click();

      // 15. Optionally, send the signed PDF to your backend
      await fetch("/api/sendSignedPdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          documentId: props.documentId,
          viewId: props.viewId,
          linkId: props.linkId,
          versionNumber: props.versionNumber,
          signedPdf: Array.from(new Uint8Array(signedPdfBytes)),
          viewerEmail: props.viewerEmail,
          creatorEmail: props.creatorEmail,
          additionalEmails: recipientEmails
            .split(",")
            .map((email) => email.trim())
            .filter((email) => email)
        })
      });

      alert("Signed PDF generated and emailed successfully!");
    } catch (error) {
      console.error("Error signing PDF:", error);
      alert("There was an error signing the PDF. Please try again.");
    }
    setSigning(false);
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mt-4">
      <h2 className="text-lg font-bold mb-2">Sign this PDF</h2>
      <div className="mb-2">
        <label className="block text-sm">Your Signature (type your name):</label>
        <input
          type="text"
          value={signatureText}
          onChange={(e) => setSignatureText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Your Name"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm">
          Additional Email(s) for Signature Request (comma separated):
        </label>
        <input
          type="text"
          value={recipientEmails}
          onChange={(e) => setRecipientEmails(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="other@example.com, name@example.com"
        />
      </div>
      <button
        onClick={handleSignAndSend}
        disabled={signing}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {signing ? "Signing PDF..." : "Sign & Send PDF"}
      </button>
    </div>
  );
}
