import { useState } from 'react'

import './App.css'

import Nav from './Components/Nav'
import ChatScreen from './Components/ChatScreen'
import Footer from './Components/Footer'
// import GeminiChatbot from './Components/GeminiChatbot'

function App() {
  
  return (
    <>
      <Nav/>
     <ChatScreen/>
     <Footer/>
    </>
  )
}

export default App
