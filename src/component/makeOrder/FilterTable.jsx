import React, { useState } from "react";
import rangePriceStyles from "../../styles/price.module.css"
import { Sidebar } from "flowbite-react";

const CheckBoxComponent = ({list, element, setter}) => {
    const addToList = () => {
        if (list.indexOf(element) === -1) {
            setter(list.concat(element))
        }
    }    
    
    const removeFromList = () => {
        if (list.indexOf(element) !== -1) {
            setter(list.filter(item => item != element))
        }
    }

    return(<Sidebar.Item style={{ marginBottom: '-15px', marginTop: '-10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input 
                type="checkbox" 
                className="" 
                checked={list.includes(element)} 
                onChange={() => list.includes(element) ? removeFromList() : addToList()}
            />
            &nbsp;&nbsp;&nbsp;
            <label>
                {element}
            </label>
        </div>
    </Sidebar.Item>)
}

const FilterTable = ({pvpMax, medForm, typeOfAdminst, setPvpMax, setMedForm, setTypeOfAdminst}) => {
    // Defered change of pvp value
    const [priceTmp, setPriceTmp] = useState(pvpMax);

    const changePrice = (event) => {
        setPriceTmp(event.target.value);
    }
    
    return(
        <span>
            <div className="mx-auto">
                <Sidebar aria-label="Sidebar with filters">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <label style={{ fontWeight: 'bold' }}>PRECIO</label>
                            <Sidebar.Item>
                                <h4>{priceTmp}€</h4>
                                <input type="range" onChange={changePrice} onMouseUp={() => {setPvpMax(priceTmp)}} min={0} max={100} step={1} value={priceTmp}/>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <label style={{ fontWeight: 'bold' }}>FORM</label>
                            {["Tablets", "Capsules", "Liquid", "Powder", "Cream", "Gel"].map((v) => 
                                <CheckBoxComponent
                                    list={medForm}
                                    element={v}
                                    setter={setMedForm}
                                />
                            )}
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <label style={{ fontWeight: 'bold' }}>VÍA</label>
                            {["Oral","Topical","Inhalation","Ophthalmic"].map((v) => 
                                <CheckBoxComponent
                                    list={typeOfAdminst}
                                    element={v}
                                    setter={setTypeOfAdminst}
                                />
                            )}
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </span>
    );
};

export default FilterTable;