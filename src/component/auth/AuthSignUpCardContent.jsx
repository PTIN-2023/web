import InputField from '../InputsFieldsSignup.jsx';
import useSignup from '../../hooks/useSignup';

const passwordValidator =
  "(?=.*[a-z])" + // has one lowercase
  "(?=.*[A-Z])" + // has one uppercase
  "(?=.*\\d)" + // has a digit
  "(?=.*[@$!%*?&])" + // has a special character
  "[A-Za-z\\d@$!%*?&]" + // valid password characters
  "{8,}"                 // at least 8 chars

export default function AuthSignUpCardContent({ setPage }) {
  const { formData, handleChange, handleSubmit } = useSignup();

  return (<>
    <div className="pt-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Registro de paciente</h1>
      <form onSubmit={handleSubmit}>
        <InputField id="name" type="text" value={formData.name} onChange={handleChange} placeholder="Nombre Real" required pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$" />
        <InputField id="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Apellidos" required pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$" />
        <InputField id="username" type="text" value={formData.username} onChange={handleChange} placeholder="Nombre de usuario" required pattern="^[a-zA-Z0-9-_]+$" />
        <InputField id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" />
        <InputField id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+34 Número de teléfono" required pattern="^\+34\d{9}$" />
        <InputField id="city" type="text" value={formData.city} onChange={handleChange} placeholder="Ciudad" required pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+(?:[-\s][a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+)*$" />
        <InputField id="address" type="text" value={formData.address} onChange={handleChange} placeholder="Dirección de domicilio" required pattern="^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s,.-]+$" />
        <InputField id="password" type="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$" />
        <div className="mb-4 flex justify-center">
          <div className="w-2/4">
            <p className="text-sm text-gray-500">
              La contraseña debe tener al menos 8 caracteres e incluir al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (@, $, !, %, *, ?, &, #, ^).
            </p>
          </div>
        </div>
        <InputField id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmar contraseña" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$" />
        <div className="flex justify-center">
          <button
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            type="submit"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
    <div className="mt-4 text-center">
      <p>
        ¿Ya tienes cuenta?{' '}
        <button
          className="text-blue-600 hover:text-blue-500 focus:outline-none"
          onClick={() => setPage('sign_in')}
        >
          Iniciar sesión
        </button>
      </p>
    </div>
  </>)
}