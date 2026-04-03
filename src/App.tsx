import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import Merch from './pages/Merch'
import PortalLayout from './pages/PortalLayout'
import ShareView from './pages/ShareView'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/share/:slug" element={<ShareView />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<Dashboard mode="sanctuary" />} />
          <Route path="ritual" element={<Dashboard mode="ritual" />} />
          <Route path="grimoire" element={<Dashboard mode="grimoire" />} />
          <Route path="settings" element={<Dashboard mode="settings" />} />
          <Route path="*" element={<Navigate to="/portal" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
