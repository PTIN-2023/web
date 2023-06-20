//External libraries imports
import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Tabs } from 'flowbite-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from 'downloadjs';

//Config
import * as env_config from "../../utils/env_config"

//Styles
import styles from '../../styles/Prescriptions.module.css';

//Icons
import { HiUserGroup, HiPaperAirplane, HiDownload, HiClock } from "react-icons/hi";
import { BsCapsulePill } from "react-icons/bs";

//Components
import Tablapacientes from "../TablaPacientes";
import TablaMedicinas from './TablaMedicinas';

//Hooks
import useCookie from '../../hooks/useCookie';
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetchObject from '../../hooks/useSumbitAndFetchObject.js';



/*
export async function getServerSideProps() {
  const apiEndpoint = String(env_config.getApiEndpoint());

  return {
    props: { 
      apiEndpoint,
    }
  }
}
*/
export default function MakePrescriptions({ searchValue, setSearchValue }) {

    const inputNombreRef = useRef("");
    const inputMedicamentoRef = useRef("");
    const inputTratamientoRef = useRef("");
    const [inputValue, setInputValue] = useState('');

    const [modalGenerateState, setModalGenerateState] = useState(false);
    
    const [pdfDoc, setPdfDoc] = useState(null);
    const [isSending, setIsSending] = useState(false);

    

    
    const handleButtonClick = () => {
      setIsSending(true);
      // Simulación de envío de datos
      setTimeout(() => {
        setIsSending(false);
      }, 1500); // Tiempo de simulación de envío (0.5 segundos)
    };

    const createPdf = async () => {
        
        const nombrePaciente = inputNombreRef.current;
        const nombreMedicamento = inputMedicamentoRef.current + inputValue;
        const Tratamiento = inputTratamientoRef.current;

        

        const pdfDoc = await PDFDocument.create()
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    
        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()
        const fontSize = 30

        page.drawText('TransMed', { x: 50, y: 800, size: 40, color:  rgb(0.176, 0.165, 0.439)})

        page.drawText('Nombre Paciente: ____________________________________________', { x: 50, y: 700, size: 15 })

        page.drawText('Fecha:', { x: 50, y: 600, size: 15 })

        page.drawText('Nombre Medicamento: _________________________________________', { x: 50, y: 500, size: 15 })

        page.drawText('Tratamiento: __________________________________________', { x: 50, y: 400, size: 15 })

        page.drawText('Notas:', { x: 50, y: 300, size: 15 })


        const currentDate = new Date();
        //'Nombre paciente: ' es x = 175
        page.drawText(nombrePaciente, { x: 175, y: 700, size: 15 })
        page.drawText(currentDate.toLocaleString(), { x: 100, y: 600, size: 15 })
        page.drawText(nombreMedicamento, { x: 205, y: 500, size: 15 })
        page.drawText(Tratamiento, { x: 138, y: 400, size: 15 })


        //Guardar documento
        const pdfBytes = await pdfDoc.save()
        setPdfDoc(pdfBytes);
        
        
    }

    async function handleSubmitGenerate(event) {
        event.preventDefault();

        await createPdf();

        setModalGenerateState(true);
    }

    function handleSubmitSend() {

        console.log("send");
        
    }

    function handleSubmitDownload() {

        download(pdfDoc, "receta.pdf", "pdf");
        
    }

    const handleNombreInput = (event) => {
        inputNombreRef.current= event.target.value;
    };

    const handleMedicamentoInput = (event) => {
        inputMedicamentoRef.current = event.target.value;
    };

    const handleTratamientoInput = (event) => {
        inputTratamientoRef.current= event.target.value;
    };

    const onCloseGenerateHandler = () =>{
        setModalGenerateState(false);
    }

    const handleInputChange = (value) => {
        if (inputValue == '') setInputValue(inputValue + value);
        else setInputValue(inputValue + ', ' + value);
    };

    // Llamada a Api para la lista de pacientes
    const [userTokenCookie, ] = useCookie('user_token')
    const [ordersPerPage, setOrdersPerPage] = useState('10');
    const [patientPage, setPatientPage] = useState('1');  


    const stringRequest = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "orders_per_page" : ordersPerPage,
        "page" : patientPage
    })

    const [sumbitAndFetch, stringResponse] = useSumbitAndFetchObject(
        stringRequest,
        "http://localhost:3000/api/list_doctor_patients"
    )

    useEffect(() => {
    if(stringResponse != 'none') {
        console.log("response not none")
    }
    }, [stringResponse])

    //sumbitAndFetch();


    // Llamada a Api para la lista de medicamentos 

        // Form values
        const [medName, setMedName] = useState();
        const [pvpMin, setPvpMin] = useState(0);
        const [pvpMax, setPvpMax] = useState(50);
        const [prescriptionNeeded, setPrescriptionNeeded] = useState(null)
        const [medForm, setMedForm] = useState(["Tablets","Capsules","Gel","Cream","Powder","Liquid"])
        const [typeOfAdminst, setTypeOfAdminst] = useState(["Oral","Topical","Inhalation","Ophthalmic"])
        const [medPage, setMedPage] = useState(1);
        const [medsPerPage, setMedsPerPage] = useState(10);

        // Request
        const stringRequest_med = usePrepareBodyRequest({
            "session_token" : userTokenCookie,
            "filter": {
                "med_name": medName,
                "pvp_min": pvpMin,
                "pvp_max": pvpMax,
                "prescription_needed": prescriptionNeeded,
                "form": medForm,
                "type_of_administration": typeOfAdminst,
                "page": medPage,
                "meds_per_page": medsPerPage,
            }
        })
        
        const [sumbitAndFetch_med, response_med] = useSumbitAndFetchObject(
            stringRequest_med,
            "http://localhost:3000/api/list_available_medicines",
            (res) => console.log(res)
        )

        useEffect(() => {
            if(userTokenCookie != null)
                sumbitAndFetch_med();
        }, [medPage, stringRequest])

  return (
    <div className={styles.cont_main}>
        <div className={styles['recipe-form']}>
            <p className={styles['titulo']}>Nueva Receta</p>
            <form onSubmit={handleSubmitGenerate}>
                <div className={styles['input-group']}>

                    <label htmlFor="patientName" className={styles.label}>Nombre Paciente:</label>

                    <div className={styles['input-container']}>
                        <input type="text" required id="patientName" name="patientName" className={styles.inputNombre} onChange={handleNombreInput}/>
                    </div>

                    <label htmlFor="medicationName" className={styles.label}>Nombre Medicamento:</label>
                
                    <div className={styles['input-container']}>
                        <input type="text" id="medicationName" name="medicationName" className={styles.inputMedicamento} onChange={handleMedicamentoInput}/>
                    </div>

                    <label htmlFor="treatmentDuration" className={styles.label}>Duración tratamiento:</label>

                    <div className={styles['input-container']}>
                        <input type="text" required id="treatmentDuration" name="treatmentDuration" className={styles.inputTratamiento} onChange={handleTratamientoInput}/>
                    </div>
                

                    <label htmlFor="notes" className={styles.label}>Notas:</label>

                    <div className={styles['textarea-group']}>
                        
                        <div className={styles['input-container']}>
                            <textarea id="notes" name="notes" className={styles.textarea} />
                        </div>
                    </div>
                </div>

                <div className={styles['button-container']}>
                    <Button type="submit" className={styles['buttonGenerate']}>Generar Receta</Button>
                </div>
                <Modal show={(modalGenerateState) ? true : false} size="lg" popup={true} onClose={onCloseGenerateHandler}>
                    <Modal.Header>Que desea hacer?</Modal.Header>
                    <Modal.Body>
                        <div className="text-center">
                            <br />
                            <div className="flex justify-center gap-4">
                                <form onSubmit={handleSubmitSend}>
                                    <Button 
                                        type="submit" 
                                        className={`${styles.sendButton} ${isSending ? styles.sending : ''}`}
                                        onClick={handleButtonClick}
                                        disabled={isSending}
                                    >
                                        <HiPaperAirplane style={{ marginRight: '8px' }}/> {isSending ? 'Enviando...' : 'Enviar Receta'}
                                    </Button>
                                </form>
                                <form onSubmit={handleSubmitDownload}>
                                    <Button 
                                        type="submit" 
                                        className={styles.downloadButton}
                                    >
                                        <HiDownload style={{ marginRight: '8px' }}/> Descargar Receta
                                        <span className={styles.downloadIcon}></span>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </form>
        </div>
        <div className={styles['tabla']}>
                <Tabs.Group
                    aria-label="pills"
                    style="underline"
                >
                    <Tabs.Item 
                        active={true}
                        title="Pacientes"
                        icon={HiUserGroup}
                    >
                        {/*<Tablapacientes data={stringResponse} rowsPerPage={10}/>*/}
                    </Tabs.Item>
                    <Tabs.Item
                        title="Medicamentos"
                        icon={BsCapsulePill}
                    >
                        {response_med != 'none' && <TablaMedicinas data={response_med} rowsPerPage={10} searchValue={searchValue} setSearchValue={setSearchValue} onClick={handleInputChange} />}
                    </Tabs.Item>
                    <Tabs.Item
                        active={true}
                        title="Historial"
                        icon={HiClock}
                    >
                        
                    </Tabs.Item>
                </Tabs.Group>
            </div>
        
    </div>
    
  );
};