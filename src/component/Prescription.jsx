import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from 'downloadjs';
import styles from '../styles/Prescriptions.module.css';

async function createPdf() {
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  
    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const fontSize = 30
    page.drawText('TEST', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })
  
    const pdfBytes = await pdfDoc.save()

    download(pdfBytes, "pdf-test.pdf", "pdf");
}

export default function MakePrescriptions() {
    const inputStyle = {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
      };
  return (
    <div className={styles.cont_main}>
        
        <div className={styles['recipe-form']}>
            <div className={styles['input-group']}>
                <div className={styles['input-container']}>
                    <label htmlFor="patientName" className={styles.label}>Nombre Paciente:</label>
                    <input type="text" id="patientName" name="patientName" className={styles.input} />
                </div>
            </div>

            <div className={styles['input-group']}>
                <div className={styles['input-container']}>
                    <label htmlFor="medicationName" className={styles.label}>Nombre Medicamento:</label>
                    <input type="text" id="medicationName" name="medicationName" className={styles.input} />
                </div>
            </div>

            <div className={styles['input-group']}>
                <div className={styles['input-container']}>
                    <label htmlFor="treatmentDuration" className={styles.label}>Duración tratamiento:</label>
                    <input type="text" id="treatmentDuration" name="treatmentDuration" className={styles.input} />
                </div>
            </div>

            <div className={styles['textarea-group']}>
                <label htmlFor="notes" className={styles.label}>Notas:</label>
                <div className={styles['input-container']}>
                    <textarea id="notes" name="notes" className={styles.textarea} />
                </div>
            </div>
        </div>
        <Button onClick={createPdf}>Diego Apretame</Button>
        <div/>
    </div>
    
  );
};