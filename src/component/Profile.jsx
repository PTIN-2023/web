import React, { useState, useRef } from "react";
import { Checkbox, Button, Modal, Tooltip, Dropdown } from 'flowbite-react'
import { HiOutlineArrowRight, HiTrash, HiOutlineExclamationCircle } from "react-icons/hi"


/* README
- Primero estan definidas las variables con la información del usuario
  y estas en un futuro se llenaran con la informacion procedente de la API.
- A contuniación esta los estilos de Fuente/Texto que se usan en el 
  documento, por ejemplo (text_title) corresponde al titulo.
- Luego los containers que mantienen la estuctura de la pagina por orden
  segun te los encuentras en el codigo, siguen el siguiente formato: 
    -- Ej: (cont_main) -> corresponde al contenedor "main" que contiene a
       todos los otros.
- Por ultimo los estilos individuales de objectos concretos de la pagina
  con el formato de (style_profilePic) que corresponde con el estilo de
  la foto de perfil
*/

export default function UserProfile() {
  var userName = 'John Doe';
  var userAge = '62';
  var userPseudoname = 'Yasminita12';
  var userMail = 'ejemplo@gmail.com';
  var userPasswd = '*********';
  var userPhone = '+34 674461824';
  var userCity = 'Madrid';
  var userAddres = 'Avinguda Laire, 34, 2ºA';

  const text_title = {
    fontSize: '17px',
    fontWeight: 'bold',
    textAling: 'left',
    color: 'black'
    //fontStyle: 'italic',
    //fontFamily: 'Arial'    
  }

  const text_subtitle = {
    fontSize: '15px',
    fontWeight: 'normal',
    textAling: 'left',
    color: '#5f5f5f'
    //fontStyle: 'italic',
    //fontFamily: 'Arial'    
  }

  const text_importantText = {
    fontSize: '13px',
    fontWeight: 'bold',
    textAling: 'left',
    color: 'black'
    //fontStyle: 'italic',
    //fontFamily: 'Arial'    
  }

  const text_normalText = {
    fontSize: '12px',
    fontWeight: 'normal',
    textAling: 'left',
    color: '#5f5f5f'
  }

  const cont_main = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2cm',
    marginTop: '75px',
    overflow: 'auto',
  };

  const cont_imagZone = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  const cont_subImagZone = {
    //textAling: 'left',
    marginLeft: '10px'
  };

  const cont_userZone = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    marginTop: '35px',
  };

  const cont_subUserZone = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '2cm',
    borderBottom: '2px solid #a4a4a4',
  };

  const cont_userZoneInfo = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  };

  const cont_userZoneButton = {
    display: 'flex',
    alignItems: 'right',
  };

  const cont_quickAccess = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    height: '150px',
    marginTop: '50px',
  };

  const cont_subQuickAccess = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  };

  const style_profilePic = {
    borderRadius: '50%',
    width: '90px',
    height: '90px',
    objectFit: 'cover'
  };

  
  const handlerOnClick = (e) => {
    // console.log (e.target.value) // si || no
    setValue2(e.target.value);
    handleButtonClick();
  }
/*
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleButtonClick = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }
*/
  return (
    <div>
      <div style={cont_main}>
        <div style={cont_imagZone}>
          <img src="https://gdb.radiotelevisionmarti.com/7AD124DA-E083-4810-9D61-DAD45E006040_cx0_cy12_cw0_w408_r1_s.jpg" alt="Profile Picture" style={style_profilePic} />
          <div style={cont_subImagZone}>
            <h1 style={text_title}>{userName}</h1>
            <h2 style={text_subtitle}>Age: {userAge}</h2>
          </div>
        </div>
        <div style={cont_userZone}>
          <div style={cont_subUserZone}>
            <div style={cont_userZoneInfo}>
              <h1 style={text_importantText}>Nombre de usuario</h1>
              <h2 style={text_normalText}>{userPseudoname}</h2>
            </div>
            <div style={cont_userZoneButton}>
              <Button onClick={handlerOnClick}>
                Editar
              </Button>
            </div>
          </div>
          <div style={cont_subUserZone}>
            <div style={cont_userZoneInfo}>
              <h1 style={text_importantText}>Correo electronico</h1>
              <h2 style={text_normalText}>{userMail}</h2>
            </div>
            <div style={cont_userZoneButton}>
              <Button onClick={handlerOnClick}>
                Editar
              </Button>
            </div>
          </div>
          <div style={cont_subUserZone}>
            <div style={cont_userZoneInfo}>
              <h1 style={text_importantText}>Contraseña</h1>
              <h2 style={text_normalText}>{userPasswd}</h2>
            </div>
            <div style={cont_userZoneButton}>
              <Button onClick={handlerOnClick}>
                Editar
              </Button>
            </div>
          </div>
          <div style={cont_subUserZone}>
            <div style={cont_userZoneInfo}>
              <h1 style={text_importantText}>Numero de telefono</h1>
              <h2 style={text_normalText}>{userPhone}</h2>
            </div>
            <div style={cont_userZoneButton}>
              <Button onClick={handlerOnClick}>
                Editar
              </Button>
            </div>
          </div>
          <div style={cont_subUserZone}>
            <div style={cont_userZoneInfo}>
              <h1 style={text_importantText}>Ciudad de residencia</h1>
              <h2 style={text_normalText}>{userCity}</h2>
            </div>
            <div style={cont_userZoneButton}>
              <Button onClick={handlerOnClick}>
                Editar
              </Button>
            </div>
          </div>
          <div style={cont_subUserZone}>
            <div style={cont_userZoneInfo}>
              <h1 style={text_importantText}>Direccion de domicilio</h1>
              <h2 style={text_normalText}>{userAddres}</h2>
            </div>
            <div style={cont_userZoneButton}>
              <Button onClick={handlerOnClick}>
                Editar
              </Button>
            </div>
          </div>
        </div>
        <div style={cont_quickAccess}>
          <div style={cont_subQuickAccess}>
            <div>
              <img src="https://autoescolabaixcamp.com/wp-content/uploads/2016/02/interrogante-icono.png" alt="Profile Picture" style={style_profilePic} />
            </div>
            <h1 style={text_title}>Mis Pedidos</h1>
            <div style={{ marginTop: '5px' }}>
              <Button onClick={handlerOnClick}>
                Contactar
                <HiOutlineArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
          <div style={cont_subQuickAccess}>
            <div>
              <img src="https://autoescolabaixcamp.com/wp-content/uploads/2016/02/interrogante-icono.png" alt="Profile Picture" style={style_profilePic} />
            </div>
            <h1 style={text_title}>Mis Pedidos</h1>
            <div style={{ marginTop: '5px' }}>
              <Button onClick={handlerOnClick}>
                Contactar
                <HiOutlineArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
          <div style={cont_subQuickAccess}>
            <div>
              <img src="https://autoescolabaixcamp.com/wp-content/uploads/2016/02/interrogante-icono.png" alt="Profile Picture" style={style_profilePic} />
            </div>
            <h1 style={text_title}>Mis Pedidos</h1>
            <div style={{ marginTop: '5px' }}>
              <Button onClick={handlerOnClick}>
                Contactar
                <HiOutlineArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
