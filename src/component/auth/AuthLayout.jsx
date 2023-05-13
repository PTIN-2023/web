export default function AuthLayout({ children }) {
  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="flex w-full max-w-6xl">
      <AuthWebInfoCard/>
      {children}
    </div>
  </div>
  )
}