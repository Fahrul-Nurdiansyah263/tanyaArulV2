import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import './index.css'
import ChatBotPage from './pages/ChatBotPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter >
    <Routes>
      <Route path='/' element={<LandingPage />}></Route>
      <Route path='/chatBot' element={<ChatBotPage />}></Route>
    </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
