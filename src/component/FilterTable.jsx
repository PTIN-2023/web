import React, { useState } from "react";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import rangePriceStyles from "../styles/price.module.css"
import { Sidebar } from "flowbite-react";

// Personalización de los estilos
const CustomCheckbox = styled.input`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #ddd;
  -webkit-appearance: none;
  outline: none;
  cursor:pointer;

  &:checked {
    background-color: #007BFF;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
`;

const FilterTable = () => {
    
    // default price
    const [price, setPrice] = useState({min: 0, max: 50});
    
    const changePrice = (value) => {
        setPrice(value);
    };

    const submitPriceChange = (event) => {
        console.log("mouseUp")
    }

    return(
        <span>
            <div className="mx-auto">
                <Sidebar aria-label="Sidebar with filters">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <label style={{ fontWeight: 'bold' }}>PRECIO</label>
                            <Sidebar.Item>
                                <h4>{price.min}€ - {price.max}€</h4>
                                <InputRange
                                    maxValue={100}
                                    minValue={0}
                                    value={price}
                                    onChange={changePrice}
                                    onChangeComplete={submitPriceChange} />
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <label style={{ fontWeight: 'bold' }}>RECETA</label>
                            <Sidebar.Item style={{ marginBottom: '-15px', marginTop: '-10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CustomCheckbox type="checkbox" className=""/>&nbsp;&nbsp;&nbsp;
                                    <Label >Con receta</Label>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CustomCheckbox type="checkbox" className=""/>&nbsp;&nbsp;&nbsp;
                                    <Label >Sin receta</Label>
                                </div>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <label style={{ fontWeight: 'bold' }}>FORMA</label>
                            <Sidebar.Item style={{ marginBottom: '-15px', marginTop: '-10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CustomCheckbox type="checkbox" className=""/>&nbsp;&nbsp;&nbsp;
                                    <Label>Pastillas / Cremas</Label>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CustomCheckbox type="checkbox" className=""/>&nbsp;&nbsp;&nbsp;
                                    <Label >Polvos</Label>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CustomCheckbox type="checkbox" className=""/>&nbsp;&nbsp;&nbsp;
                                    <Label >Líquido</Label>
                                </div>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <label style={{ fontWeight: 'bold' }}>VÍA</label>
                            <Sidebar.Item style={{ marginBottom: '-15px', marginTop: '-10px'}}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CustomCheckbox type="checkbox" className=""/>&nbsp;&nbsp;&nbsp;
                                    <Label >Oral</Label>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item style={{ marginBottom: '-15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CustomCheckbox type="checkbox" className=""/>&nbsp;&nbsp;&nbsp;
                                    <Label >Tópico</Label>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item style={{ marginBottom: '-15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CustomCheckbox type="checkbox" className=""/>&nbsp;&nbsp;&nbsp;
                                    <Label >Inhalatoria</Label>
                                </div>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CustomCheckbox type="checkbox" className=""/>&nbsp;&nbsp;&nbsp;
                                    <Label >Oftalmológica</Label>
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
