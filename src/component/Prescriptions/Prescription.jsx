//External libraries imports
import React, { useState, useRef, useEffect } from 'react';
import { Button, Tabs } from 'flowbite-react';
import download from 'downloadjs';

//Utils
import createPDF from '../../utils/createPDF';
import generateQR from '../../utils/createPDF';

//Styles
import styles from '../../styles/Prescriptions.module.css';

//Icons
import { HiUserGroup, HiPaperAirplane, HiDownload, HiClock } from "react-icons/hi";
import { BsCapsulePill } from "react-icons/bs";

//Components
import TablaPacientes from "./TablaPacientesInPrescription";
import TablaMedicinas from './TablaMedicinas';
import TablaHistorial from './TablaHistorial';

//Hooks
import useCookie from '../../hooks/useCookie';
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest.js";
import useSumbitAndFetchObject from '../../hooks/useSumbitAndFetchObject.js';
import useSumbitAndFetch from '../../hooks/useSumbitAndFetch.js';

//Icons
import { HiMinus } from 'react-icons/hi';

export default function MakePrescriptions({ props }) {

    const inputTratamientoRef = useRef("");
    const [textareaValue, setTextareaValue] = useState('');
    const [userTokenCookie, ] = useCookie('user_token')
    const [medicamentos, setMedicamentos] = useState([]);
    const [nombrePaciente, setNombrePaciente] = useState('');
    const [renewal, setRenewal] = useState(0);
    const [codigo, setCodigo] = useState('123');

    
    const stringRequestRecipe = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "user_full_name"  : nombrePaciente,
        "medicine_list" : medicamentos,
        "duration" : inputTratamientoRef.current,
        "notes" : textareaValue,
    }) 

    const [createRecipe, stringResponse] = useSumbitAndFetch(
        stringRequestRecipe,
        props.apiEndpoint+"/api/doctor_create_prescription",
        (res) => {
            if (res.result === "ok") {
            }else{
                alert("Ha habido un error en el envio de la receta, por favor intentelo de nuevo.")
            }
        }
    )
    
    async function handleSubmitGenerate(event) {
        event.preventDefault();

        //await createRecipe();

        createPDF(nombrePaciente, medicamentos, inputTratamientoRef.current, textareaValue, renewal, codigo, props).then((pdfBytes) => {
            download(pdfBytes, "Receta.pdf", "application/pdf");
        });

    }

    //Input Handlers
    
    const handleTratamientoInput = (event) => {
        inputTratamientoRef.current= event.target.value;
    };
    
    // Llamada a Api para la lista de medicamentos 

    // Form values
    const [numPages, setNumPages] = useState(1) 
    const [page, setPage] = useState(1);
    const medsPerPage = 10;
    
    // Requests
    const stringRequest = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "filter": {
            "page": page,
            "meds_per_page": medsPerPage,
        }
    })
    
    const [sumbitListAvailable, response_med] = useSumbitAndFetchObject(
        stringRequest,
        props.apiEndpoint + "/api/list_available_medicines",
    )

    const [sumbitNumPages, ] = useSumbitAndFetchObject(
        stringRequest,
        props.apiEndpoint + "/api/list_available_medicines_num",
        (res) => {
            if (res && res.result == "ok") {
                const newNum = Math.ceil(res.num/medsPerPage)
                setNumPages(newNum)
                if(newNum < page)
                    setPage(Math.max(1, newNum))
            }
        }
    )

    useEffect(() => {
        if(userTokenCookie != null) {
            sumbitListAvailable()
            sumbitNumPages()
        }
    }, [stringRequest])

    // Cambios formulario
    const handlesetMedicamentos = (value) => {
        setMedicamentos(value);
    }

    const handleSetNombrePaciente = (value) => {
        setNombrePaciente(value);
    }

    const handleReload = () => {
        setNombrePaciente('');
        setMedicamentos([]);
        setRenewal(0);
        handleTratamientoInput('')
    };
        

  return (
    <div className={styles.cont_main}>
        <div className={styles['recipe-form']}>
            <p className={styles['titulo']}>Nueva Receta</p>
            <form onSubmit={handleSubmitGenerate}>
                <div className={styles['input-group']}>
                    {/* Nombre Paciente */}
                    <label htmlFor="patientName" className={styles.label}>Nombre Paciente:</label>
                    <div className={styles['input-container']}>
                        <input type="text" disabled id="patientName" name="patientName" value={nombrePaciente} className={styles.inputNombre} />
                        <Button style={{ marginLeft: '10px' }} color='failure' onClick={() => handleSetNombrePaciente('')} pill><HiMinus/></Button>
                    </div>

                    {/* Nombre Medicmento */}
                    <label htmlFor="medicationName" className={styles.label}>Medicamentos:</label>
                    <div className={styles['medicamentos-container']}>
                        {medicamentos.map((medicamento, indice) => (
                            <React.Fragment key={indice}>
                                <li style={{ marginRight: '10px' }}>
                                    {medicamento.medicineName} [{medicamento.idMedicamento}]: {medicamento.cantidad}
                                </li>
                                <br />
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Duracion Tratamiento */}
                    <label htmlFor="treatmentDuration" className={styles.label}>Duración tratamiento:</label>
                    <div className={styles['input-container']}>
                        <input type="text" required id="treatmentDuration" name="treatmentDuration" className={styles.inputTratamiento} onChange={handleTratamientoInput}/>
                    </div>

                    {/* Duracion Tratamiento */}
                    <label htmlFor="renewal" className={styles.label}>Renovación:</label>
                    <div className={styles['input-container']}>
                        <input type="text" required id="renewal" name="renewal" value={renewal} className={styles.inputTratamiento} onChange={(event) => setRenewal(event.target.value)}/>
                    </div>
                
                    {/* Notas */}
                    <label htmlFor="notes" className={styles.label}>Notas:</label>
                    <div className={styles['textarea-group']}>
                        <div className={styles['input-container']}>
                            <textarea id="notes" name="notes" className={styles.textarea} onChange={(event) => setTextareaValue(event.target.value)} maxLength={1000 - (medicamentos.length * 62)}/>                            
                        </div>
                        <p>Caracteres restantes: {1000 - textareaValue.length - (medicamentos.length * 62)}</p>
                    </div>
                </div>

                {/* Generar Receta */}
                <div className={styles['button-container']}>
                    <Button type="button" className={styles['buttonGenerate']} onClick={handleReload}>Borrar todo</Button>
                    <Button type="submit" className={styles['buttonGenerate']}>Generar Receta</Button>
                </div>
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
                        <TablaPacientes props={props} nombrePaciente={nombrePaciente} handleSetNombrePaciente={handleSetNombrePaciente} />
                    </Tabs.Item>
                    <Tabs.Item
                        title="Medicamentos"
                        icon={BsCapsulePill}
                    >
                        {response_med != 'none' && response_med.result == "ok" &&
                            <TablaMedicinas 
                                data={response_med.medicines}
                                medicamentos={medicamentos}
                                handlesetMedicamentos={handlesetMedicamentos} 
                                numPages={numPages}
                                page={page}
                                setPage={setPage}
                        />}
                    </Tabs.Item>
                    <Tabs.Item
                        title="Historial"
                        icon={HiClock}
                    >
                        <TablaHistorial props={props} />
                    </Tabs.Item>
                </Tabs.Group>
            </div>
    </div>    
  );
};