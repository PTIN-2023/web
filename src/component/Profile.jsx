import React, { useState } from "react";
import { Button } from 'flowbite-react'
import { useEffect } from 'react';
import styles from "../styles/ProfileStyles";

// Ver estilos en /styles/ProfileStyles.jsx

export default function UserProfile() {

  //  Datos del usuario
  const [userName, getName] = useState("");
  const [userAge, getAge] = useState("");
  const [userPseudoname, getPseudoname] = useState("");
  const [userMail, getEmail] = useState("");
  const [userPasswd, getPasswd] = useState("");
  const [userPhone, getPhone] = useState("");
  const [userCity, getCity] = useState("");
  const [userAddres, getAddres] = useState("");

  // Email para simular llamada api (identificar cliente)
  const email = "ejemplo@gmail.com";

  // Metodo para gestionar los cambios de datos que haga el cliente
  /*
      - Se hace una llamada con el email del usuario para poder identificarlo dentro 
        de la base de datos, posteriormente se pasan una serie de datos que corresponden 
        con la nueva informacion del cliente despues de ser modificada.
        De esta manera la api recibira los datos que debera actualizar dentro de la basa de datos.
  */
  const setNewUserData = async (e) => {
    try {
      const response = await fetch('/api/user_modifyInfo?user_email=' + email, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pseudoname: userPseudoname,
          email: userMail,
          passwd: userPasswd,
          phone: userPhone,
          city: userCity,
          addres: userAddres
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrarse. Por favor, inténtalo de nuevo.');
      }

      console.log('Registrado con éxito');
    } catch (error) {
      console.error(error);
    }
  }

  // Metodo para pedir la informacion con la que rellenar los campos del perfil.
  /*
      - Se hace una llamada con el email del usuario para poder identificarlo dentro 
        de la base de datos, la api devuelve los valores que se asignaran a cada campo del perfil
        en su sitio correspondiente, en caso de que se produzca un error, se rellenaran con "none"
  */
  const getUserData = async (e) => {
    try {
      const response = await fetch('/api/user_info?user_email=' + email, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.result === "ok") {
        getName(data.user.name);
        getAge(data.user.age);
        getPseudoname(data.user.pseudoname);
        getEmail(data.user.email);
        getPasswd(data.user.passwd);
        getPhone(data.user.phone);
        getCity(data.user.city);
        getAddres(data.user.addres);
      } else {
        getName('John Doe');
        getAge('0');
        getPseudoname('none');
        getEmail('none');
        getPasswd('none');
        getPhone('none');
        getCity('none');
        getAddres('none');
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  // Metodo para controlar que se llame a la funcion solo cuando se carge la pagina o cuando se la llame
  useEffect(() => {
    getUserData();
  }, []);


  //  Handlers para los accesos rapidos
  const handlerOnClick_L = (e) => {
    //  Redirecciona a MYORDERS
    window.location.href = 'http://localhost:3000/myorders';
  }
  const handlerOnClick_C = (e) => {
    //  Redirecciona a INVENTORY
    window.location.href = 'http://localhost:3000/inventory';
  }
  const handlerOnClick_R = (e) => {
    //  Redirecciona a MAP_LOCAL
    window.location.href = 'http://localhost:3000/map_local';
  }

  
  /////////////////////////////////////////////////////////////////////
  ///  Handlers para los botones de editar de cada campo del perfil ///

  /////////////////////////////////////////////////////////////////////
  const [showPseudoInput, setShowPseudoInput] = useState(false);

  const handlePseudoChange = (event) => {
    getPseudoname(event.target.value);
  };

  const handleEditPseudoClick = () => {
    setShowPseudoInput(true);
  };

  const handleConfirmPseudoClick = () => {
    setShowPseudoInput(false);
    setNewUserData();
    getUserData();
  };
  /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const [showEmailInput, setShowEmailInput] = useState(false);

  const handleEmailChange = (event) => {
    getEmail(event.target.value);
  };

  const handleEditEmailClick = () => {
    setShowEmailInput(true);
  };

  const handleConfirmEmailClick = () => {
    setShowEmailInput(false);
    setNewUserData();
    getUserData();
  };
  /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const [showPasswdInput, setShowPasswdInput] = useState(false);

  const handlePasswdChange = (event) => {
    getPasswd(event.target.value);
  };

  const handleEditPasswdClick = () => {
    setShowPasswdInput(true);
  };

  const handleConfirmPasswdClick = () => {
    setShowPasswdInput(false);
    setNewUserData();
    getUserData();
  };
  /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const handlePhoneChange = (event) => {
    getPhone(event.target.value);
  };

  const handleEditPhoneClick = () => {
    setShowPhoneInput(true);
  };

  const handleConfirmPhoneClick = () => {
    setShowPhoneInput(false);
    setNewUserData();
    getUserData();
  };
  /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const [showCityInput, setShowCityInput] = useState(false);

  const handleCityChange = (event) => {
    getCity(event.target.value);
  };

  const handleEditCityClick = () => {
    setShowCityInput(true);
  };

  const handleConfirmCityClick = () => {
    setShowCityInput(false);
    setNewUserData();
    getUserData();
  };
  /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const [showAddrInput, setShowAddresInput] = useState(false);

  const handleAddresChange = (event) => {
    getAddres(event.target.value);
  };

  const handleEditAddresClick = () => {
    setShowAddresInput(true);
  };

  const handleConfirmAddresClick = () => {
    setShowAddresInput(false);
    setNewUserData();
    getUserData();
  };
  /////////////////////////////////////////////////////////////////////

  return (
    <div>
      <div style={styles.cont_main}>
        <div style={styles.cont_imagZone}>
          <img src="https://img.pccomponentes.com/pcblog/1678057200000/mi-cuenta.jpg" alt="Profile Picture" style={styles.style_profilePic} />
          <div style={styles.cont_subImagZone}>
            <h1 style={styles.text_title}>{userName}</h1>
            <h2 style={styles.text_subtitle}>Age: {userAge}</h2>
          </div>
        </div>
        <div style={styles.cont_userZone}>
          <div style={styles.cont_subUserZoneF}>
            <div style={styles.cont_userZoneInfo}>
              <h1 id="user_given_name" style={styles.text_importantText}>Nombre de usuario</h1>
              {showPseudoInput ? (
                <input type="userPseudoname" value={userPseudoname} onChange={handlePseudoChange} />
              ) : (
                <h2 style={styles.text_normalText}>{userPseudoname}</h2>
              )}
            </div>
            <div style={styles.cont_userZoneButton}>
              <Button onClick={showPseudoInput ? handleConfirmPseudoClick : handleEditPseudoClick}>
                {showPseudoInput ? 'Confirmar' : 'Editar'}
              </Button>
            </div>
          </div>
          <div style={styles.cont_subUserZone}>
            <div style={styles.cont_userZoneInfo}>
              <h1 style={styles.text_importantText}>Correo electronico</h1>
              {showEmailInput ? (
                <input type="userMail" value={userMail} onChange={handleEmailChange} />
              ) : (
                <h2 style={styles.text_normalText}>{userMail}</h2>
              )}
            </div>
            <div style={styles.cont_userZoneButton}>
              <Button onClick={showEmailInput ? handleConfirmEmailClick : handleEditEmailClick}>
                {showEmailInput ? 'Confirmar' : 'Editar'}
              </Button>
            </div>
          </div>
          <div style={styles.cont_subUserZone}>
            <div style={styles.cont_userZoneInfo}>
              <h1 style={styles.text_importantText}>Contraseña</h1>
              {showPasswdInput ? (
                <input type="userPasswd" value={userPasswd} onChange={handlePasswdChange} />
              ) : (
                <h2 style={styles.text_normalText}>{userPasswd}</h2>
              )}
            </div>
            <div style={styles.cont_userZoneButton}>
              <Button onClick={showPasswdInput ? handleConfirmPasswdClick : handleEditPasswdClick}>
                {showPasswdInput ? 'Confirmar' : 'Editar'}
              </Button>
            </div>
          </div>
          <div style={styles.cont_subUserZone}>
            <div style={styles.cont_userZoneInfo}>
              <h1 style={styles.text_importantText}>Numero de telefono</h1>
              {showPhoneInput ? (
                <input type="userPhone" value={userPhone} onChange={handlePhoneChange} />
              ) : (
                <h2 style={styles.text_normalText}>{userPhone}</h2>
              )}
            </div>
            <div style={styles.cont_userZoneButton}>
              <Button onClick={showPhoneInput ? handleConfirmPhoneClick : handleEditPhoneClick}>
                {showPhoneInput ? 'Confirmar' : 'Editar'}
              </Button>
            </div>
          </div>
          <div style={styles.cont_subUserZone}>
            <div style={styles.cont_userZoneInfo}>
              <h1 style={styles.text_importantText}>Ciudad de residencia</h1>
              {showCityInput ? (
                <input type="userCity" value={userCity} onChange={handleCityChange} />
              ) : (
                <h2 style={styles.text_normalText}>{userCity}</h2>
              )}
            </div>
            <div style={styles.cont_userZoneButton}>
              <Button onClick={showCityInput ? handleConfirmCityClick : handleEditCityClick}>
                {showCityInput ? 'Confirmar' : 'Editar'}
              </Button>
            </div>
          </div>
          <div style={styles.cont_subUserZone}>
            <div style={styles.cont_userZoneInfo}>
              <h1 style={styles.text_importantText}>Direccion de domicilio</h1>
              {showAddrInput ? (
                <input type="userAddres" value={userAddres} onChange={handleAddresChange} />
              ) : (
                <h2 style={styles.text_normalText}>{userAddres}</h2>
              )}
            </div>
            <div style={styles.cont_userZoneButton}>
              <Button onClick={showAddrInput ? handleEditAddresClick : handleConfirmAddresClick}>
                {showAddrInput ? 'Confirmar' : 'Editar'}
              </Button>
            </div>
          </div>
        </div>
        <div style={styles.cont_quickAccess}>
          <div style={styles.cont_subQuickAccess}>
            <div>
              <img src="https://img.pccomponentes.com/pcblog/1678057200000/como-comprar.jpg" alt="Profile Picture" style={styles.style_shortcutsPic} />
            </div>
            <div style={styles.cont_subQuickAccessText}>
              <h1 style={styles.text_title}>Mis Pedidos</h1>
            </div>
            <div>
              <Button onClick={handlerOnClick_L}>
                Abrir
              </Button>
            </div>
          </div>
          <div style={styles.cont_subQuickAccess}>
            <div>
              <img src="https://img.pccomponentes.com/pcblog/1678057200000/pedidos.jpg" alt="Profile Picture" style={styles.style_shortcutsPic} />
            </div>
            <div style={styles.cont_subQuickAccessText}>
              <h1 style={styles.text_title}>Inventario</h1>
            </div>
            <div>
              <Button onClick={handlerOnClick_C}>
                Abrir
              </Button>
            </div>
          </div>
          <div style={styles.cont_subQuickAccess}>
            <div>
              <img src="https://img.pccomponentes.com/pcblog/1678057200000/facturas.jpg" alt="Profile Picture" style={styles.style_shortcutsPic} />
            </div>
            <div style={styles.cont_subQuickAccessText}>
              <h1 style={styles.text_title}>Mapa local</h1>
            </div>
            <div>
              <Button onClick={handlerOnClick_R}>
                Abrir
              </Button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
