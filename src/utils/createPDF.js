import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default async function generatePDF(nombrePaciente, nombreMedicamento, tratamiento, notas, codigo) {
  const doc = await PDFDocument.create();
  const page = doc.addPage();

  const font = await doc.embedFont(StandardFonts.Helvetica);

  page.drawText('TransMed', { x: 50, y: 800, size: 40, color: rgb(0.176, 0.165, 0.439), font });
  page.drawText('Codigo:', { x: 400, y: 800, size: 20, font });
  page.drawText(`Nombre Paciente: ${nombrePaciente}`, { x: 50, y: 700, size: 15, font });
  page.drawText(`Nombre Medicamento: ${nombreMedicamento}`, { x: 50, y: 600, size: 15, font });
  page.drawText(`Tratamiento: ${tratamiento}`, { x: 50, y: 500, size: 15, font });
  page.drawText(`Notas:`, { x: 50, y: 420, size: 15, font });
  
  const form = doc.getForm()
  const notasField = form.createTextField('notas');
  notasField.enableReadOnly()
  notasField.enableMultiline()
  notasField.setText(notas);
  notasField.addToPage(page, { 
      x: 50, 
      y: 100, 
      width: 450, 
      height: 300, 
      font,       
      borderWidth: 0,
    });
  notasField.setFontSize(15)

  const pdfBytes = await doc.save();
  return pdfBytes;
}