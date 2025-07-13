import { Routes, Route } from 'react-router-dom'
import Home from '@pages/Home'
import Login from '@pages/Login'
import UserRegistration from '@pages/UserRegistration'
import NotFound from '@pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user-registration" element={<UserRegistration />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}