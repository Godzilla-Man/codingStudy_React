import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//index.css import 제거
import App from './App.jsx'

//라우터를 사용하기 위한 import
import {BrowserRouter} from "react-router-dom";

//StricMode => BrowserRouter 변경
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
