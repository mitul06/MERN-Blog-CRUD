import React from 'react'
import './App.css'
import NotistackProvider from "./components/NotistackProvider";
import Router from "./routes";

const App = () => {

  return(
    <NotistackProvider>
      <Router />
    </NotistackProvider>
  )
}

export default App
