import { BrowserRouter,Routes,Route, Link } from "react-router-dom"

import Home from './pages/Home/index';
import Cadastro from './pages/Cadastro/index';

function routes() {
  return (
    <BrowserRouter>
    <Link to='/'>Home</Link>
    <Link to='/cadastro'>Cadastrar novo cliente</Link>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cadastro" element={<Cadastro/>}/>
        </Routes> 
    </BrowserRouter>
  )
}

export default routes