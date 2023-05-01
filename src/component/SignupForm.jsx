// *SignupForm.jsx*
import React from 'react';
import InputField from '../component/InputsFieldsSignup.jsx';

//Control del Form
const SignupForm = ({ formData, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <InputField id="name" type="text" value={formData.name} onChange={handleChange} placeholder="Nombre Real" required pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$" />
    <InputField id="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Apellidos" required pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$" />
    <InputField id="username" type="text" value={formData.username} onChange={handleChange} placeholder="Nombre de usuario" required pattern="^[a-zA-Z0-9-_]+$" />
    <InputField id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" />
    <InputField id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+34 Número de teléfono" required pattern="^\+34\d{9}$" />
    <InputField id="city" type="text" value={formData.city} onChange={handleChange} placeholder="Ciudad" required pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+(?:[-\s][a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+)*$" />
    <InputField id="address" type="text" value={formData.address} onChange={handleChange} placeholder="Dirección de domicilio" required pattern="^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s,.-]+$" />
    <InputField id="password" type="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" />
    <InputField id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmar contraseña" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" />

    <div className="flex justify-center">
      <button
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        type="submit"
      >
        Registrarse
      </button>
    </div>
  </form>
);

export default SignupForm;
