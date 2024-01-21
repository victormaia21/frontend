import { ChangeEvent, FormEvent, useState } from "react";
import "../../styles/index.scss";
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../../EndPoints";
import { useNavigate } from "react-router-dom";

function index() {

    const [cliente,setCliente] = useState({});

    const navigate = useNavigate();

    const clienteHandleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setCliente({...cliente,[e.target.name]:e.target.value});
    }

    console.log(cliente)
    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        await axios.post(BASE_URL + ENDPOINTS.CLIENTES + "/registro",cliente)
        .then(() => navigate("/"));
    }
  return (
    <section className="section_cadastro">
        <h1>Cadastrar Cliente</h1>
        <form onSubmit={handleSubmit}>
            <div className="div_input">
                <label>Nome do cliente</label>
                <input type="text" onChange={clienteHandleChange} name="nome" required/>
            </div>
            <div className="div_input">
                <label>Email do cliente</label>
                <input type="text" onChange={clienteHandleChange} name="email" required/>
            </div>
            <div className="div_input">
                <label>Telefone do cliente</label>
                <input type="text" onChange={clienteHandleChange} name="telefone" required/>
            </div>
            <div className="div_input">
                <label>Cordenada x do cliente (Por favor, apenas numero)</label>
                <input type="text" onChange={clienteHandleChange} name="cor_x" required step='0.00000001'/>
            </div>
            <div className="div_input">
                <label>Cordenada y do cliente (Por favor, apenas numero)</label>
                <input type="text" onChange={clienteHandleChange} name="cor_y" required/>
            </div>
            <div className="div_button">
                <button type="submit">Cadastrar Cliente</button>
            </div>
        </form>
    </section>
  )
}

export default index