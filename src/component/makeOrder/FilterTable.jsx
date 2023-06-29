import React, { useState } from "react";
import rangePriceStyles from "../../styles/price.module.css"
import { Sidebar } from "flowbite-react";

const FilterTable = ({medName, pvpMin, pvpMax, prescriptionNeeded, medForm, typeOfAdminst, setMedName, setPvpMin, setPvpMax, setPrescriptionNeeded, setMedForm, setTypeOfAdminst}) => {
    
    // Defered change of pvp value
    const [price, setPrice] = useState(50);
    const [isCheckedConReceta, setIsCheckedConReceta] = useState(true)
    
    const changePrice = (event) => {
        setPrice(event.target.value);
    };
    const submitPriceChange = (_) => {
        setPvpMax(price)
    }
    const conReceta = (_) => {
        if (isCheckedConReceta === true) setPrescriptionNeeded(false)
        else setPrescriptionNeeded(true)
        setIsCheckedConReceta(!isCheckedConReceta)
    }

    return(
        <span>
            <div className="mx-auto">
                <Sidebar aria-label="Sidebar with filters">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <label style={{ fontWeight: 'bold' }}>PRECIO</label>
                            <Sidebar.Item>
                                <h4>{price}€</h4>
                                <input type="range" onChange={changePrice} onMouseUp={submitPriceChange} min={0} max={100} step={1} value={price}/>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <label style={{ fontWeight: 'bold' }}>RECETA</label>
                            <Sidebar.Item style={{ marginBottom: '-15px', marginTop: '-10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" className="" checked={isCheckedConReceta} onClick={conReceta} />&nbsp;&nbsp;&nbsp;
                                    <label >Con receta</label>
                                </div>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <label style={{ fontWeight: 'bold' }}>FORMA</label>
                            <Sidebar.Item style={{ marginBottom: '-15px', marginTop: '-10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" className="" checked/>&nbsp;&nbsp;&nbsp;
                                    <label>Pastillas / Cremas</label>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item style={{ marginBottom: '-15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" className="" checked/>&nbsp;&nbsp;&nbsp;
                                    <label >Polvos</label>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" className="" checked/>&nbsp;&nbsp;&nbsp;
                                    <label >Líquido</label>
                                </div>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <label style={{ fontWeight: 'bold' }}>VÍA</label>
                            <Sidebar.Item style={{ marginBottom: '-15px', marginTop: '-10px'}}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" className="" checked/>&nbsp;&nbsp;&nbsp;
                                    <label >Oral</label>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item style={{ marginBottom: '-15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" className="" checked/>&nbsp;&nbsp;&nbsp;
                                    <label >Tópico</label>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item style={{ marginBottom: '-15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" className="" checked/>&nbsp;&nbsp;&nbsp;
                                    <label >Inhalatoria</label>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" className="" checked/>&nbsp;&nbsp;&nbsp;
                                    <label >Oftalmológica</label>
                                </div>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </span>
    );
};

export default FilterTable;