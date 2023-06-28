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

export default function MakePrescriptions({ props }) {

    const inputNombreRef = useRef("");
    const inputMedicamentoRef = useRef("");
    const inputTratamientoRef = useRef("");
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');


    const stringRequestRecipe = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "user_full_name"  : inputNombreRef.current,
        "medicine_list" : inputMedicamentoRef.current + inputValue,
        "duration" : inputTratamientoRef.current,
        "notes" : textareaValue,
    }) 

    const [createRecipe, stringResponse] = useSumbitAndFetch(
        stringRequestRecipe,
        props.apiEndpoint+"/api/doctor_create_prescription",
        (res) => {
            if (res.result === "ok") {
            }else{
                alert("Ha habido un error, por favor intentelo de nuevo. Si el problema persiste considere descargar la plantilla")
            }
          }
    )

    async function handleSubmitGenerate(event) {
        event.preventDefault();

        //await createRecipe();

        createPDF(inputNombreRef.current, inputMedicamentoRef.current + inputValue, inputTratamientoRef.current, textareaValue).then((pdfBytes) => {
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
        const [userTokenCookie, ] = useCookie('user_token')
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

  return (
    <div className={styles.cont_main}>
        <div className={styles['recipe-form']}>
            <p className={styles['titulo']}>Nueva Receta</p>
            <form onSubmit={handleSubmitGenerate}>
                <div className={styles['input-group']}>
                    {/* Nombre Paciente */}
                    <label htmlFor="patientName" className={styles.label}>Nombre Paciente:</label>
                    <div className={styles['input-container']}>
                        <input type="text" required id="patientName" name="patientName" className={styles.inputNombre} onChange={handleNombreInput}/>
                    </div>

                    {/* Nombre Medicmento */}
                    <label htmlFor="medicationName" className={styles.label}>Nombre Medicamento:</label>
                    <div className={styles['input-container']}>
                        <input type="text" id="medicationName" name="medicationName" className={styles.inputMedicamento} onChange={handleMedicamentoInput}/>
                    </div>

                    {/* Duracion Tratamiento */}
                    <label htmlFor="treatmentDuration" className={styles.label}>Duración tratamiento:</label>
                    <div className={styles['input-container']}>
                        <input type="text" required id="treatmentDuration" name="treatmentDuration" className={styles.inputTratamiento} onChange={handleTratamientoInput}/>
                    </div>
                
                    {/* Notas */}
                    <label htmlFor="notes" className={styles.label}>Notas:</label>
                    <div className={styles['textarea-group']}>
                        <div className={styles['input-container']}>
                            <textarea id="notes" name="notes" className={styles.textarea} onChange={(event) => setTextareaValue(event.target.value)} maxLength={1000}/>                            
                        </div>
                        <p>Caracteres restantes: {1000 - textareaValue.length}</p>
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
                        <TablaPacientes props={props} rowsPerPage={10}/>
                    </Tabs.Item>
                    <Tabs.Item
                        title="Medicamentos"
                        icon={BsCapsulePill}
                    >
                        {response_med != 'none' && <TablaMedicinas data={response_med} rowsPerPage={10} searchValue={searchValue} setSearchValue={setSearchValue} onClick={handleNombreInputChange} />}
                    </Tabs.Item>
                    <Tabs.Item
                        title="Historial"
                        icon={HiClock}
                    >
                        {/*<TablaHistorial props={props} />*/}
                    </Tabs.Item>
                </Tabs.Group>
            </div>
        
    </div>
    
  );
};