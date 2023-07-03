import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { svgObject } from "qr-image-color";


export default async function generateQR(code) {
    const doc = await PDFDocument.create();
    const page = doc.addPage([150, 150]);
  
    let qr = svgObject(code, { margin: 0, ec_level: "L" });
  
    let desiredSize = 100;
  
    page.drawSvgPath(qr.path, {
      x: 25,
      y: 120,
      color: rgb(0, 0.5, 0.5),
      scale: desiredSize / qr.size
    });
  
    const pdfBytes = await doc.save();
    return pdfBytes;
  }