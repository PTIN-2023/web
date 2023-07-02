import React, { useState, useEffect } from "react";
import { Button } from 'flowbite-react';
import styles from "../styles/ProfileStyles.module.css";
import getTextCurrentLocale from '../utils/getTextCurrentLocale';
import usePrepareBodyRequest from "../hooks/usePrepareBodyRequest";
import useSumbitAndFetchObject from "../hooks/useSumbitAndFetchObject";

// Ver estilos en /styles/ProfileStyles.jsx

export default function UserProfile({ data, userToken, getUserData, props }) {

  //  Datos del usuario
  const [userPicture, setUserPicture] = useState("");
  const [userName, setName] = useState("none");
  //const [userAge, setAge] = useState(0);
  const [userPseudoname, setPseudoname] = useState("none");
  const [userEmail, setEmail] = useState("none");
  const [userPasswd, setPasswd] = useState("none");
  const [userPhone, setPhone] = useState("none");
  const [userCity, setCity] = useState("none");
  const [userAddres, setAddress] = useState("none");

  // Metodo para pedir la informacion con la que rellenar los campos del perfil.
  /*
      - Se hace una llamada con el email del usuario para poder identificarlo dentro 
        de la base de datos, la api devuelve los valores que se asignaran a cada campo del perfil
        en su sitio correspondiente, en caso de que se produzca un error, se rellenaran con "none"
  */

  // Metodo para controlar que se llame a la funcion solo cuando se carge la pagina o cuando se la llame
  useEffect(() => {
    try {
      if(data.result == "ok"){
        setName(data.user_full_name);
        setPseudoname(data.user_given_name);
        setEmail(data.user_email);
        setPasswd(data.user_password);
        setPhone(data.user_phone);
        setCity(data.user_city);
        setAddress(data.user_address);
        setUserPicture(data.user_picture)
      }
    } catch (error) {
      console.log("ERROR");
    }
  }, [data])

   // Metodo para gestionar los cambios de datos que haga el cliente
  /*
      - Se hace una llamada con el email del usuario para poder identificarlo dentro 
        de la base de datos, posteriormente se pasan una serie de datos que corresponden 
        con la nueva informacion del cliente despues de ser modificada.
        De esta manera la api recibira los datos que debera actualizar dentro de la basa de datos.
  */

  const stringRequest = usePrepareBodyRequest({
    "session_token": userToken,
    "user_full_name": userName,
    "user_given_name": userPseudoname,
    "user_email": userEmail,
    "user_password": userPasswd,
    "user_phone": userPhone,
    "user_city": userPhone,
    "user_address": userAddres
  })

  const [sumbitChange, responseChange] = useSumbitAndFetchObject(
    stringRequest,
    props.apiEndpoint + "/api/set_user_info"
  )

  const setNewUserData = async () => {
    await sumbitChange()
    if (responseChange == "none" || !responseChange.result != "ok") {
      throw new Error('Error al guardar los cambios.');
    }
    console.log('Cambio registrado con éxito');
  }

  /////////////////////////////////////////////////////////////////////
  ///  Handlers para los botones de editar de cada campo del perfil ///

  /////////////////////////////////////////////////////////////////////
  const [showPseudoInput, setShowPseudoInput] = useState(false);

  const handlePseudoChange = (event) => {
    setPseudoname(event.target.value);
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
  const [isEmailValid, setIsEmailValid] = useState(false)

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
    console.log(event.target.value)
    setIsEmailValid(regex.test(event.target.value))
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
  const [showPassword,] = useState(false)

  const handlePasswdChange = (event) => {
    setPasswd(event.target.value);
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
    setPhone(event.target.value);
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
    setCity(event.target.value);
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
    setAddress(event.target.value);
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

  /////////////////////////////////////////////////////////////////////
  const [showNameInput, setShowNameInput] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Guardar el valor del nombre de usuario
      setName(event.target.value);
      setShowNameInput(false);
      setNewUserData();
      getUserData();
    }
  };

  const handleEditNameClick = () => {
    setShowNameInput(true);
  };

  /////////////////////////////////////////////////////////////////////

  /* <h2 className={styles.text_subtitle}>{getTextCurrentLocale('user_age')}: {userAge}</h2> */
  return (

    <div className={styles.cont_main}>
      <div className={styles.cont_imagZone}>
        <img src={userPicture} alt="Profile Picture" className={styles.style_profilePic} />
        <div className={styles.cont_subImagZone}>
        {showNameInput ? (
              <input
                type="userName"
                value={userName}
                className={styles.input}
                onChange={handleNameChange}
                onKeyDown={handleKeyPress}
                title="Por favor presione ENTER para guardar"
              />
            ) : (
              <h1 className={styles.text_title} onClick={handleEditNameClick} onKeyDown={handleKeyPress}>{userName}</h1>
            )}
        </div>
      </div>
      <div className={styles.cont_userZone}>
        <div className={styles.cont_subUserZoneF}>
          <div className={styles.cont_userZoneInfo}>
            <h1 id="user_given_name" className={styles.text_importantText}> {getTextCurrentLocale('user_given_name')}</h1>
            {showPseudoInput ? (
              <input
                type="userPseudoname"
                value={userPseudoname}
                className={styles.input}
                onChange={handlePseudoChange}
              />
            ) : (
              <h2 className={styles.text_normalText}>{userPseudoname}</h2>
            )}
          </div>
          <div className={styles.cont_userZoneButton}>
            <Button onClick={showPseudoInput ? handleConfirmPseudoClick : handleEditPseudoClick}>
              {showPseudoInput ? getTextCurrentLocale('button_confirm') : getTextCurrentLocale('button_edit')}
            </Button>
          </div>
        </div>
        <div className={styles.cont_subUserZone}>
          <div className={styles.cont_userZoneInfo}>
            <h1 className={styles.text_importantText}>{getTextCurrentLocale('user_email')}</h1>
            {showEmailInput ? (
              <input
                type="email"
                value={userEmail}
                className={styles.input}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Por favor ingresa un correo electrónico válido"
                onChange={handleEmailChange}
              />
            ) : (
              <h2 className={styles.text_normalText}>{userEmail}</h2>
            )}
          </div>
          <div className={styles.cont_userZoneButton}>
            <Button onClick={showEmailInput ? handleConfirmEmailClick : handleEditEmailClick} disabled={!isEmailValid && showEmailInput}>
              {showEmailInput ? getTextCurrentLocale('button_confirm') : getTextCurrentLocale('button_edit')}
            </Button>
          </div>
        </div>
        <div className={styles.cont_subUserZone}>
          <div className={styles.cont_userZoneInfo}>
            <h1 className={styles.text_importantText}>{getTextCurrentLocale('user_password')}</h1>
            {showPasswdInput ? (
              <input
                type={'text'}
                value={userPasswd}
                className={styles.input}
                onChange={handlePasswdChange}
              />
            ) : (
              <div className={styles.text_normalText}>
                {showPassword ? (
                  <span>{userPasswd}</span>
                ) : (
                  <h3 className={styles.text_passwd}>········</h3>
                )}
              </div>

            )}
          </div>
          <div className={styles.cont_userZoneButton}>
            <Button onClick={showPasswdInput ? handleConfirmPasswdClick : handleEditPasswdClick}>
              {showPasswdInput ? getTextCurrentLocale('button_confirm') : getTextCurrentLocale('button_edit')}
            </Button>
          </div>
        </div>
        <div className={styles.cont_subUserZone}>
          <div className={styles.cont_userZoneInfo}>
            <h1 className={styles.text_importantText}>{getTextCurrentLocale('user_phone')}</h1>
            {showPhoneInput ? (
              <input
                type="tel"
                value={userPhone}
                className={styles.input}
                onChange={handlePhoneChange}
              />
            ) : (
              <h2 className={styles.text_normalText}>{userPhone}</h2>
            )}
          </div>
          <div className={styles.cont_userZoneButton}>
            <Button onClick={showPhoneInput ? handleConfirmPhoneClick : handleEditPhoneClick}>
              {showPhoneInput ? getTextCurrentLocale('button_confirm') : getTextCurrentLocale('button_edit')}
            </Button>
          </div>
        </div>
        <div className={styles.cont_subUserZone}>
          <div className={styles.cont_userZoneInfo}>
            <h1 className={styles.text_importantText}>{getTextCurrentLocale('user_city')}</h1>
            {showCityInput ? (
              <input
                type="userCity"
                value={userCity}
                className={styles.input}
                onChange={handleCityChange}
              />
            ) : (
              <h2 className={styles.text_normalText}>{userCity}</h2>
            )}
          </div>
          <div className={styles.cont_userZoneButton}>
            <Button onClick={showCityInput ? handleConfirmCityClick : handleEditCityClick}>
              {showCityInput ? getTextCurrentLocale('button_confirm') : getTextCurrentLocale('button_edit')}
            </Button>
          </div>
        </div>
        <div className={styles.cont_subUserZone}>
          <div className={styles.cont_userZoneInfo}>
            <h1 className={styles.text_importantText}>{getTextCurrentLocale('user_address')}</h1>
            {showAddrInput ? (
              <input
                type="user_Addres"
                value={userAddres}
                className={styles.input}
                onChange={handleAddresChange}
              />
            ) : (
              <h2 className={styles.text_normalText}>{userAddres}</h2>
            )}
          </div>
          <div className={styles.cont_userZoneButton}>
            <Button onClick={showAddrInput ? handleEditAddresClick : handleConfirmAddresClick}>
              {showAddrInput ? getTextCurrentLocale('button_confirm') : getTextCurrentLocale('button_edit')}
            </Button>
          </div>
        </div>
      </div>
      <div></div>
    </div>

  );
}