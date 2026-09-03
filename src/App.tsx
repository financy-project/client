import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { LoginPage } from '@/modules/auth/pages/login-page'
import { RegisterPage } from '@/modules/auth/pages/register-page'
import { PreviewPage } from '@/pages/preview-page'

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </>
  )
}

export default App
