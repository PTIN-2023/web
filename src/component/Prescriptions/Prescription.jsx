//External libraries imports
import React, { useState, useRef, useEffect } from 'react';
import { Button, Tabs } from 'flowbite-react';
import download from 'downloadjs';

//Utils
import createPDF from '../../utils/createPDF';

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

export default function MakePrescriptions({ props }) {

    const inputTratamientoRef = useRef("");
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [userTokenCookie, ] = useCookie('user_token')
    const [medicamentos, setMedicamentos] = useState([]);
    const [nombrePaciente, setNombrePaciente] = useState('Pablo Alcaraz');
    const [renwal, setRenwal] = useState(0);
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

        createPDF(nombrePaciente, medicamentos, inputTratamientoRef.current, textareaValue, renwal, codigo).then((pdfBytes) => {
            download(pdfBytes, "Receta.pdf", "application/pdf");
        });

    }

    //Input Handlers
    const handleNombreInput = (event) => {
        inputNombreRef.current= event.target.value;
    };

    const handleMedicamentoInput = (event) => {
        inputMedicamentoRef.current = event.target.value;
    };

    const handleTratamientoInput = (event) => {
        inputTratamientoRef.current= event.target.value;
    };

    const handleNombreInputChange = (value) => {
        if (inputValue == '') setInputValue(inputValue + value);
        else setInputValue(inputValue + ', ' + value);
    };
    
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
            "/api/list_available_medicines",
        )

        useEffect(() => {
            if(userTokenCookie != null)
                sumbitAndFetch_med();
        }, [medPage, stringRequest_med])

        const handlesetMedicamentos = (value) => {
            setMedicamentos(value);
        }

        const handleSetNombrePaciente = (value) => {
            setNombrePaciente(value);
        }
        

  return (
    <div className={styles.cont_main}>
        <div className={styles['recipe-form']}>
            <p className={styles['titulo']}>Nueva Receta</p>
            <form onSubmit={handleSubmitGenerate}>
                <div className={styles['input-group']}>
                    {/* Nombre Paciente */}
                    <label htmlFor="patientName" className={styles.label}>Nombre Paciente:</label>
                    <div className={styles['input-container']}>
                        <input type="text" disabled id="patientName" name="patientName" className={styles.inputNombre} onChange={handleNombreInput}/>
                    </div>

                    {/* Nombre Medicmento */}
                    <label htmlFor="medicationName" className={styles.label}>Medicamentos:</label>
                    <div className={styles['medicamentos-container']}>
                        {medicamentos.map((medicamento, indice) => (
                            <React.Fragment key={indice}>
                                <li style={{ marginRight: '10px' }}>
                                    {medicamento.idMedicamento}: {medicamento.cantidad}
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
                        <input type="text" required id="renewal" name="renewal" className={styles.inputTratamiento} onChange={(event) => setRenwal(event.target.value)}/>
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
                        <TablaPacientes props={props} rowsPerPage={10} nombrePaciente={nombrePaciente} handleSetNombrePaciente={handleSetNombrePaciente} />
                    </Tabs.Item>
                    <Tabs.Item
                        title="Medicamentos"
                        icon={BsCapsulePill}
                    >
                        {response_med != 'none' && <TablaMedicinas data={response_med} rowsPerPage={10} medicamentos={medicamentos} handlesetMedicamentos={handlesetMedicamentos} />}
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