
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

const styles = {
  text_title: {
    fontSize: '17px',
    fontWeight: 'bold',
    textAling: 'left',
    color: 'black'
    //fontStyle: 'italic',
    //fontFamily: 'Arial'    
  },

  text_subtitle: {
    fontSize: '15px',
    fontWeight: 'normal',
    textAling: 'left',
    color: '#5f5f5f'
    //fontStyle: 'italic',
    //fontFamily: 'Arial'    
  },

  text_importantText: {
    fontSize: '13px',
    fontWeight: 'bold',
    textAling: 'left',
    color: 'black'
    //fontStyle: 'italic',
    //fontFamily: 'Arial'    
  },

  text_normalText: {
    fontSize: '12px',
    fontWeight: 'normal',
    textAling: 'left',
    color: '#5f5f5f'
  },

  cont_main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2cm',
    marginTop: '75px',
    overflow: 'auto',
  },

  cont_imagZone: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  cont_subImagZone: {
    //textAling: 'left',
    marginLeft: '10px'
  },

  cont_userZone: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    marginTop: '35px',
  },

  cont_subUserZoneF: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '2cm',
    borderBottom: '2px solid #a4a4a4',
    borderTop: '2px solid #a4a4a4'
  },

  cont_subUserZone: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '2cm',
    borderBottom: '2px solid #a4a4a4'
  },

  cont_userZoneInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },

  cont_userZoneButton: {
    display: 'flex',
    alignItems: 'right',
  },

  cont_quickAccess: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    height: '200px',
    marginTop: '100px'
  },

  cont_subQuickAccess: {
    borderRadius: '12px',
    boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.2)',
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '210px',
    height: '250px'
  },

  cont_subQuickAccessText: {
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  style_profilePic: {
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    objectFit: 'cover'
  },

  style_shortcutsPic: {
    borderRadius: '50%',
    width: '85px',
    height: '85px',
    objectFit: 'cover'
  }
}

export default styles;