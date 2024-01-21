import { useEffect, useState } from "react";
import "../../styles/index.scss";
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../../EndPoints";
import { FaAngleDoubleDown } from "react-icons/fa";

function index() {

  const [cliente,setCliente] = useState<[]>([]);
  const [visitas,setVisitas] = useState<[]>([]);
  const [buttonActive,setButtonActive] = useState(true);
  const [abrirVisitacaoCliente,setAbrirVisitacaoCliente] = useState(false);
  const [melhorRotas,setMelhorRotas] = useState<[]>([])
  const [coordenadas, setCoordenadas] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    // Função para obter as coordenadas
    const obterCoordenadas = () => {
      if (navigator.geolocation) {
        setButtonActive(true)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordenadas({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            setButtonActive(false)
          }
        );
      } else {
        console.log("DEU MERDA")
      }
    };

    // Chama a função para obter as coordenadas
    obterCoordenadas();

    
  }, []);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(BASE_URL + ENDPOINTS.CLIENTES + "/30/1/?")
        setCliente(response.data.clientes)
      } catch(err) {
        console.log(err);
      }
    } 

    fetchClientes();
  });

  useEffect(() => {
    const fetchVisitas = async () => {
      try {
        const response = await axios.get(BASE_URL + ENDPOINTS.CLIENTES + `/queryCordenada/${coordenadas.latitude}/${coordenadas.longitude}`);
        setMelhorRotas(response.data.distanciasPorCliente);
        console.log(response.data.distanciasPorCliente)
      } catch(err) {
        console.log(err);
      }
    }

    fetchVisitas();
  },[coordenadas])
  return ( 
    <section className="home">
        <h1>Clientes</h1>
        {abrirVisitacaoCliente ? <h2>Ordem de visita</h2> : null}
        <p>{buttonActive ? null : 'Ative o gps para ter uma experiência melhor'}</p>
        <button 
          onClick={() => setAbrirVisitacaoCliente(!abrirVisitacaoCliente)}
          disabled={!buttonActive}
        >{abrirVisitacaoCliente ? 'Clientes' : 'Visita aos clientes'}</button>
        {!abrirVisitacaoCliente ? (
          <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
            </tr>
          </thead>

          <tbody>
            {cliente.length > 0 && cliente.map(e => (
              <tr>
                <td>{e.nome}</td>
                <td>{e.email}</td>
                <td>{e.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <div className="ordem_visita">
            {melhorRotas.length > 0 && melhorRotas.map((e,i) => (
              <ul>
                <li>Visita numero: {i + 1}</li>
                <li>CLIENTE: {e.cliente.nome}</li>
                <li>DISTANCIA: {e.distancia}KM</li>
                <li>LATITUDE: {e.cliente.latitude}</li>
                <li>LONGITUDE: {e.cliente.longitude}</li>
              </ul>
            ))}
            
          </div>
        )}
    </section>
  )
}

export default index