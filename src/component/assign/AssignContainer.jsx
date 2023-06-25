import React, {useState, useEffect, useRef} from "react";
import assignStyles from "../../styles/assign.module.css"
import myordersStyles from "../../styles/Myorders.module.css"
import {getText} from "../../utils/getTextCurrentLocale"
import useCookie from "../../hooks/useCookie"
import usePrepareBodyRequest from "../../hooks/usePrepareBodyRequest";
import useSumbitAndFetch from "../../hooks/useSumbitAndFetch";
import { Card, Table, Modal, Button } from "flowbite-react";
import {HiOutlineExclamationCircle, HiTrash } from "react-icons/hi"
import { useRouter } from "next/router";


function ModalDeleteAssign({props, currentDoctor, currentTarget, currentItem, modalDeleteAssignState, setModalDeleteAssignState}){
    //funciona igual que el modal anterior pero con el botón de cancelar pedido
    //TODO: hacer que borre el pedido
    console.log(currentItem);
    const [userTokenCookie, ] = useCookie('user_token')

    let stringRequest = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "doctor_email"  : currentDoctor,
        "patient_email" : currentItem
    }) 
    //borrar asignacion -- llamada a la API delete_assignations_doctor
    var [deleteAssign, stringResponse] = useSumbitAndFetch(
      stringRequest,
      props.apiEndpoint+"/api/delete_assignations_doctor"
    ) 
    
    const [localeCookie, ] = useCookie('locale')

    const onCloseDeleteAssignHandler = () =>{
        setModalDeleteAssignState(false);
    }
    const onClickDeleteAssignHandler = () => {
        currentTarget.current = currentItem.user_email;
        setModalDeleteAssignState(true);
        console.log("click "+ modalDeleteAssignState)

    }
    const onClickDeleteAssignHandler_CANCELAR = async () => {
        setModalDeleteAssignState(false);
        console.log("apicall")
        await deleteAssign()
        console.log("response: "+stringResponse)
        stringResponse = JSON.parse(stringResponse)
        if(stringResponse.result == "ok"){
            alert("Paciente eliminado correctamente!")
            router.reload()
        }        
    }


    return(
    <>    
        <HiTrash onClick={onClickDeleteAssignHandler} className={myordersStyles.informationIcon}></HiTrash>
        <Modal
            show={(currentTarget.current == currentItem.user_email && modalDeleteAssignState == true) ? true : false}
            size="md"
            popup={true}
            onClose={onCloseDeleteAssignHandler}
        >
            <Modal.Header />
            <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {getText('cancelation_confirmation', localeCookie)} <span className="font-bold leading-relaxed text-gray-500 dark:text-gray-400">{currentItem}</span>?
                </h3>
                <div className="flex justify-center gap-4">
                <Button
                    color="failure"
                    onClick={onClickDeleteAssignHandler_CANCELAR}
                >
                  {getText('cancelation_confirmation_yes', localeCookie)}
                </Button>
                <Button
                    color="gray"
                    onClick={onCloseDeleteAssignHandler}
                >
                  {getText('cancelation_confirmation_no', localeCookie)}
                </Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    </>
    )
}

const AssignContainer = ({data, props}) => {
    const router = useRouter()
    const [localeCookie, ] = useCookie("locale")
    const [userTokenCookie, ] = useCookie('user_token')

    const [currentDoctor, setCurrentDoctor] = useState('')
    const [currentPatient, setCurrentPatient] = useState('')
    const [responseAssign, setResponseAssign] = useState("none")

    //estos dos hooks de abajo sirven para mostrar o bien ocultar los modals
    const [modalDeleteAssignState, setModalDeleteAssignState] = useState(false);
    //currentTarget es un hook useRef para que no se actualice en cada render y así aseguramos que los modals no se multipliquen
    const currentTarget = useRef("");
    let stringRequest = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "doctor_email"  : currentDoctor,
        "patient_email" : currentPatient
    }) 
    let stringRequestAsigned = usePrepareBodyRequest({
        "session_token" : userTokenCookie,
        "doctor_email"  : currentDoctor,
    }) 
    //borrar asignacion -- llamada a la API delete_assignations_doctor
    var [assignDoctor, stringResponse] = useSumbitAndFetch(
        stringRequest,
      props.apiEndpoint+"/api/manager_assign_doctors"
    )
    var [refreshAsignations, stringResponseAsignations] = useSumbitAndFetch(
        stringRequestAsigned,
        props.apiEndpoint+"/api/list_assigned_doctors"
      )

    const newPatientAssignHandler = async () => {
        console.log("apicall")
        await assignDoctor()
        console.log("response: "+stringResponse)
        if(stringResponse != "none"){
            stringResponse = JSON.parse(stringResponse)
            if(stringResponse.result == "ok"){
                alert("Paciente asignado correctamente!")
                await refreshAsignations()
                if(stringResponseAsignations != "none"){
                    setResponseAssign(JSON.parse(stringResponseAsignations))
                    
                }
            }
        }
    }

    function changeModalDeleteAssignState(e){
        setModalDeleteAssignState(e);
    }

    const setCurrentDoctorHandler = async (e) => {
        setCurrentDoctor(e);
        await refreshAsignations()
        if(stringResponseAsignations != "none"){
            setResponseAssign(JSON.parse(stringResponseAsignations))
            
        }
    }

    return (
        <>
        <div className="grid grid-cols-4 gap-4">
            <Card className="col-span-2">
                <h1 className={assignStyles.gridHeader}>Doctores</h1>
                <select onChange={(e) => setCurrentDoctorHandler(e.target.value)} id="doctors" size="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {data.result == "ok" && data.patients.map((patient) =>
                        <option value={patient.user_email}>{patient.user_email}</option>
                    )}
                </select>
                <span className="mt-9"></span>
            </Card>
            <Card className="col-span-2">
                <h1 className={assignStyles.gridHeader}>Pacientes</h1>
                <select onChange={(e) => setCurrentPatient(e.target.value)} id="doctors" size="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {data.result == "ok" && data.patients.map((patient) =>
                        <option value={patient.user_email}>{patient.user_email}</option>
                    )}
                </select>
                {currentPatient == '' ? <Button disabled>Asignar paciente</Button> : <Button onClick={newPatientAssignHandler}>Asignar paciente</Button>}
            </Card>
            {currentDoctor != '' &&
                <Card className="col-span-4">
                    <h1 className={assignStyles.gridHeader}>Pacientes asignados a {currentDoctor}</h1>
                    <div className="overflow-auto h-96">
                        <Table hoverable={true}>
                            <Table.Head>
                                <Table.HeadCell>
                                    Nombre
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Correo
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Teléfono
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Ciudad
                                </Table.HeadCell>
                                <Table.HeadCell>
                                  
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                            {console.log("responseAssign: "+ responseAssign)}
                            {responseAssign != "none" ? (stringResponseAsignations.patients.map((patient) =>
                                <>
                                    <Table.Row className={myordersStyles.tableRow}>
                                        <Table.Cell className={myordersStyles.tableCell}>
                                            {patient.user_full_name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {patient.user_email}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {patient.user_phone}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {patient.user_city}
                                        </Table.Cell>
                                        <Table.Cell className={`${myordersStyles.firstTableCell} ${myordersStyles.detailsRow}`}>
                                            <ModalDeleteAssign props={props} currentDoctor={currentDoctor} currentTarget={currentTarget} currentItem={patient.user_email} modalDeleteAssignState={modalDeleteAssignState} setModalDeleteAssignState={changeModalDeleteAssignState}/>
                                            {/* <ModalDetalles currentTarget={currentTarget} currentItem={order} modalDetallesState={modalDetallesState} setModalDetallesState={changeModalDetallesState}/> */}
                                        </Table.Cell>
                                    </Table.Row>
                                </>))
                                :
                                <></>   
                            }

                            </Table.Body>
                        </Table>                
                   </div>      
                </Card>            
            }

        </div>
        </>
    );
}


export default AssignContainer;