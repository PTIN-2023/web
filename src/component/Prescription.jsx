import React, { useState, useRef } from 'react';
import { Button } from 'flowbite-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from 'downloadjs';
import styles from '../styles/Prescriptions.module.css';



export default function MakePrescriptions() {

    const inputNombreRef = useRef("");
    const inputMedicamentoRef = useRef("");
    const inputTratamientoRef = useRef("");

    const createPdf = async () => {

        const nombrePaciente = inputNombreRef.current;
        const nombreMedicamento = inputMedicamentoRef.current;
        const Tratamiento = inputTratamientoRef.current;


        const pdfDoc = await PDFDocument.create()
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
      
        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()
        const fontSize = 30
        page.drawText(nombrePaciente, {
          x: 50,
          y: height/2 + height/4,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0.53, 0.71),
        })
        page.drawText(nombreMedicamento, {
            x: 50,
            y: height/2,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0.53, 0.71),
        })
        page.drawText(Tratamiento, {
            x: 50,
            y: height/4,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0.53, 0.71),
        })
      
        const pdfBytes = await pdfDoc.save()
    
        download(pdfBytes, "receta.pdf", "pdf");
    }
    
    

    const handleNombreInput = (event) => {
        inputNombreRef.current= event.target.value;
    };

    const handleMedicamentoInput = (event) => {
        inputMedicamentoRef.current= event.target.value;
    };

    const handleTratamientoInput = (event) => {
        inputTratamientoRef.current= event.target.value;
    };

  return (
    <div className={styles.cont_main}>
        
        <div className={styles['recipe-form']}>
            <p className={styles['titulo']}>Nueva Receta</p>
            <form onSubmit={createPdf}>
                <div className={styles['input-group']}>
                    <div className={styles['input-container']}>
                        <label htmlFor="patientName" className={styles.label}>Nombre Paciente:</label>
                        <input type="text" required id="patientName" name="patientName" className={styles.inputNombre} onChange={handleNombreInput}/>
                    </div>
                
                    <div className={styles['input-container']}>
                        <label htmlFor="medicationName" className={styles.label}>Nombre Medicamento:</label>
                        <input type="text" required id="medicationName" name="medicationName" className={styles.inputMedicamento} onChange={handleMedicamentoInput}/>
                    </div>
                
                    <div className={styles['input-container']}>
                        <label htmlFor="treatmentDuration" className={styles.label}>Duración tratamiento:</label>
                        <input type="text" required id="treatmentDuration" name="treatmentDuration" className={styles.inputTratamiento} onChange={handleTratamientoInput}/>
                    </div>
                </div>

                <div className={styles['textarea-group']}>
                    <label htmlFor="notes" className={styles.label}>Notas:</label>
                    <div className={styles['input-container']}>
                        <textarea id="notes" name="notes" className={styles.textarea} />
                    </div>
                </div>
                <div className={styles['button-container']}>
                    <Button type="submit" className={styles['button']}>Generar Receta</Button>
                </div>
            </form>
        </div>
        
        
    </div>
    
  );
};