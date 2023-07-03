import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { svgObject } from "qr-image-color";

import { getText } from "../utils/getTextCurrentLocale.js";

export default async function generatePDF(nombrePaciente, nombreMedicamento, tratamiento, notas, renwal, codigo, props, localeCookie) {

  if (localeCookie === "es") return await generatePDF_es(nombrePaciente, nombreMedicamento, tratamiento, notas, renwal, codigo, props);
  else if (localeCookie === "en") return await generatePDF_en(nombrePaciente, nombreMedicamento, tratamiento, notas, renwal, codigo, props);
  else if (localeCookie === "ca") return await generatePDF_cat(nombrePaciente, nombreMedicamento, tratamiento, notas, renwal, codigo, props);
  else return null;
  
}

async function generatePDF_es (nombrePaciente, nombreMedicamento, tratamiento, notas, renwal, codigo, props) {

  const doc = await PDFDocument.create();
  const page = doc.addPage();
  
  const logoUrl = props.apiEndpoint + '/_next/image?url=%2Fmedia%2Flogo%2FBlanco-layout.png&w=256&q=75'
  const logoResponse = await fetch(logoUrl);
  console.log(logoResponse);
  const logoImageBytes = await logoResponse.arrayBuffer();
  const logoImage = await doc.embedPng(logoImageBytes);
  const logoDims = logoImage.scale(0.3);

  page.drawImage(logoImage, {
    x: 0,
    y: 680,
    width: logoDims.width/2,
    height: logoDims.height/2,
  })
  

  const font = await doc.embedFont(StandardFonts.Helvetica);

  let qr = svgObject(codigo, { margin: 0, ec_level: "L" });

  let desiredSize = 100;

  page.drawSvgPath(qr.path, {
    x: 350,
    y: 780,
    color: rgb(0, 0.5, 0.5),
    scale: desiredSize / qr.size
  });

  page.drawText(`Código: ${codigo}`, { x: 250, y: 800, size: 15, font });
  page.drawText(`Nombre completo: ${nombrePaciente}`, { x: 50, y: 650, size: 15, font });
  page.drawText(`Medicinas:`, { x: 50, y: 620, size: 15, font });
  nombreMedicamento.forEach((medicamento, index) => {
    const { idMedicamento, cantidad, medicineName } = medicamento;
    const yPosition = 600 - (index * 20);
    page.drawText(`Nombre: ${medicineName} - ID: ${idMedicamento} - Cantidad: ${cantidad}`, { x: 50, y: yPosition, size: 15, font });
  });
  page.drawText(`Renovación (Días): ${renwal}`, { x: 50, y: 590 - (nombreMedicamento.length * 20), size: 15, font });
  page.drawText(`Duración (Días): ${tratamiento}`, { x: 50, y: 560 - (nombreMedicamento.length * 20), size: 15, font });
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

  
  const pdfBytes = await doc.save();
  return pdfBytes;
}

async function generatePDF_en (nombrePaciente, nombreMedicamento, tratamiento, notas, renwal, codigo, props) {

  const doc = await PDFDocument.create();
  const page = doc.addPage();
  /*
  const logoUrl = props.apiEndpoint + '/_next/image?url=%2Fmedia%2Flogo%2FBlanco-layout.png&w=256&q=75'
  const logoResponse = await fetch(logoUrl);
  console.log(logoResponse);
  const logoImageBytes = await logoResponse.arrayBuffer();
  const logoImage = await doc.embedPng(logoImageBytes);
  const logoDims = logoImage.scale(0.3);

  page.drawImage(logoImage, {
    x: 0,
    y: 680,
    width: logoDims.width/2,
    height: logoDims.height/2,
  })
  */

  const font = await doc.embedFont(StandardFonts.Helvetica);

  let qr = svgObject(codigo, { margin: 0, ec_level: "L" });

  let desiredSize = 100;

  page.drawSvgPath(qr.path, {
    x: 350,
    y: 780,
    color: rgb(0, 0.5, 0.5),
    scale: desiredSize / qr.size
  });

  page.drawText(`Code: ${codigo}`, { x: 250, y: 800, size: 15, font });
  page.drawText(`Full name: ${nombrePaciente}`, { x: 50, y: 650, size: 15, font });
  page.drawText(`Medicines:`, { x: 50, y: 620, size: 15, font });
  nombreMedicamento.forEach((medicamento, index) => {
    const { idMedicamento, cantidad, medicineName } = medicamento;
    const yPosition = 600 - (index * 20);
    page.drawText(`Name: ${medicineName} - ID: ${idMedicamento} - Quantity: ${cantidad}`, { x: 50, y: yPosition, size: 15, font });
  });
  page.drawText(`Renewal (Days): ${renwal}`, { x: 50, y: 590 - (nombreMedicamento.length * 20), size: 15, font });
  page.drawText(`Duration (Days): ${tratamiento}`, { x: 50, y: 560 - (nombreMedicamento.length * 20), size: 15, font });
  page.drawText(`Notes:`, { x: 50, y: 530 - (nombreMedicamento.length * 20), size: 15, font });
  
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

  
  const pdfBytes = await doc.save();
  return pdfBytes;
}

async function generatePDF_cat (nombrePaciente, nombreMedicamento, tratamiento, notas, renwal, codigo, props) {

  const doc = await PDFDocument.create();
  const page = doc.addPage();
  
  const logoUrl = props.apiEndpoint + '/_next/image?url=%2Fmedia%2Flogo%2FBlanco-layout.png&w=256&q=75'
  const logoResponse = await fetch(logoUrl);
  console.log(logoResponse);
  const logoImageBytes = await logoResponse.arrayBuffer();
  const logoImage = await doc.embedPng(logoImageBytes);
  const logoDims = logoImage.scale(0.3);

  page.drawImage(logoImage, {
    x: 0,
    y: 680,
    width: logoDims.width/2,
    height: logoDims.height/2,
  })
  

  const font = await doc.embedFont(StandardFonts.Helvetica);

  let qr = svgObject(codigo, { margin: 0, ec_level: "L" });

  let desiredSize = 100;

  page.drawSvgPath(qr.path, {
    x: 350,
    y: 780,
    color: rgb(0, 0.5, 0.5),
    scale: desiredSize / qr.size
  });

  page.drawText(`Codi: ${codigo}`, { x: 250, y: 800, size: 15, font });
  page.drawText(`Nom complet: ${nombrePaciente}`, { x: 50, y: 650, size: 15, font });
  page.drawText(`Medicines:`, { x: 50, y: 620, size: 15, font });
  nombreMedicamento.forEach((medicamento, index) => {
    const { idMedicamento, cantidad, medicineName } = medicamento;
    const yPosition = 600 - (index * 20);
    page.drawText(`Nom: ${medicineName} - ` + getText("ID", localeCookie) + `: ${idMedicamento} - ` + getText("quantity", localeCookie) + `: ${cantidad}`, { x: 50, y: yPosition, size: 15, font });
  });
  page.drawText(`Renovació (Dies): ${renwal}`, { x: 50, y: 590 - (nombreMedicamento.length * 20), size: 15, font });
  page.drawText(`Durada (Dies): ${tratamiento}`, { x: 50, y: 560 - (nombreMedicamento.length * 20), size: 15, font });
  page.drawText(`Notes:`, { x: 50, y: 530 - (nombreMedicamento.length * 20), size: 15, font });
  
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

  
  const pdfBytes = await doc.save();
  return pdfBytes;
}