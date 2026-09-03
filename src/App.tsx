import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { LoginPage } from '@/modules/auth/pages/login-page'
import { RegisterPage } from '@/modules/auth/pages/register-page'
import { CategoriesPage } from '@/modules/categories/pages/categories-page'
import { DashboardPage } from '@/pages/dashboard-page'
import { PreviewPage } from '@/pages/preview-page'
import { TransactionsPage } from '@/pages/transactions-page'

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transacoes" element={<TransactionsPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </>
  )
}

export default App
