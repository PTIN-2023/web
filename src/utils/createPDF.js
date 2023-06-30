import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { svgObject } from "qr-image-color";

export default async function generatePDF(nombrePaciente, nombreMedicamento, tratamiento, notas, renwal, codigo) {
  const doc = await PDFDocument.create();
  const page = doc.addPage();

  const logoUrl = 'https://cloud.ptin2023.rabadan.dev:24143/_next/image?url=%2Fmedia%2Flogo%2FBlanco-layout.png&w=256&q=75'
  const logoPdfBytes = await doc.embedUrl(logoUrl);
  const logoImage = await doc.embedPng(logoPdfBytes)

  
  

  const font = await doc.embedFont(StandardFonts.Helvetica);

  let qr = svgObject(codigo, { margin: 0, ec_level: "L" });

  let desiredSize = 100;

  page.drawSvgPath(qr.path, {
    x: 350,
    y: 780,
    color: rgb(0, 0.5, 0.5),
    scale: desiredSize / qr.size
  });

  page.drawText('TransMed', { x: 50, y: 800, size: 40, color: rgb(0.176, 0.165, 0.439), font });
  page.drawText('Codigo:', { x: 350, y: 800, size: 20, font });
  page.drawText(`Nombre Paciente: ${nombrePaciente}`, { x: 50, y: 650, size: 15, font });
  page.drawText(`Medicamentos:`, { x: 50, y: 620, size: 15, font });
  nombreMedicamento.forEach((medicamento, index) => {
    const { idMedicamento, cantidad } = medicamento;
    const yPosition = 600 - (index * 20);
    page.drawText(`Id: ${idMedicamento} - Cantidad: ${cantidad}`, { x: 50, y: yPosition, size: 15, font });
  });
  page.drawText(`Renewal: ${renwal}`, { x: 50, y: 590 - (nombreMedicamento.length * 20), size: 15, font });
  page.drawText(`Duracion: ${tratamiento}`, { x: 50, y: 560 - (nombreMedicamento.length * 20), size: 15, font });
  page.drawText(`Notas:`, { x: 50, y: 530 - (nombreMedicamento.length * 20), size: 15, font });
  
  const form = doc.getForm();
  const notasField = form.createTextField('notas');
  notasField.enableReadOnly();
  notasField.enableMultiline();
  notasField.setText(notas);
  notasField.addToPage(page, { 
    x: 50, 
    y: 0, 
    width: 450, 
    height: 450 - (nombreMedicamento.length * 20), 
    font, 
    borderWidth: 0,
  });
  notasField.setFontSize(15);

  const logoField = form.createButton('logo');
  logoField.setImage(logoImage);
  logoField.addToPage(page, { x: 50, y: 700, width: 100, height: 100 });
  
  const pdfBytes = await doc.save();
  return pdfBytes;
}