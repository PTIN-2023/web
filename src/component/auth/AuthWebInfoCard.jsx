export default function AuthWebInfoCard() {
  return (
  <div className="flex flex-col justify-center items-center p-4 bg-white rounded-md shadow-md w-1/2">
    <div className="flex justify-center mb-4">
      <img
          src="media/logo/Blanco.svg"
          alt="TransMed"
          className="w-[350px] h-[350px]"
      />
    </div>
    <p className="text-center">
        Transmed tu servicio de transporte de medicinas de confianza
    </p>
  </div>
  )
}