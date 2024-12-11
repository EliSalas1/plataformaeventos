import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import EventoAxios from '../../config/axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Historial.css';

// Registrar componentes de Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Eventos() {
    const [eventos, guardarEventos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [buscadorActivo, setBuscadorActivo] = useState(false); // Estado para manejar el buscador

    const navigate = useNavigate();

    const ConsultarAPI = async () => {
        try {
            const EventosConsulta = await EventoAxios.get('/eventos');
            guardarEventos(EventosConsulta.data);
        } catch (error) {
            console.error('Error al consultar eventos:', error);
        }
    };

    useEffect(() => {
        ConsultarAPI();
    }, []);

    const handleBusqueda = e => {
        setBusqueda(e.target.value);
    };

    const handleBuscadorToggle = () => {
        setBuscadorActivo(!buscadorActivo);
        if (buscadorActivo) {
            setBusqueda(''); // Limpia el campo si el buscador se cierra
        }
    };
    const eventosFiltrados = eventos.filter(evento =>
        evento.nombre_evento.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleCardClick = id_evento => {
        navigate(`/mod4/eventos/${id_evento}`); // Navegar a la ruta de edición
    };

    return (
        <Fragment>
            <h2>EVENTOS</h2>
            {/* <div className="buscador"> */}
            <div className={`buscador ${buscadorActivo ? 'activo' : ''}`}>
                <div className="input-container">
                    <i className="fas fa-search" onClick={handleBuscadorToggle}></i>

                    {buscadorActivo && (
                        <input
                            type="text"
                            placeholder="Buscar evento por nombre..."
                            value={busqueda}
                            onChange={handleBusqueda}
                        />
                    )}
                </div>
            </div>
            <div className='cards'>
                {eventosFiltrados.map(evento => (
                    <div className='card' key={evento.id_evento} onClick={() => handleCardClick(evento.id_evento)}>
                        <div className='card-header'>
                            {/* N° {evento.id_evento} */}
                            Nombre del Evento: {evento.nombre_evento}
                            {/* <div className='number'> ID.{evento.id_evento}</div> */}
                        </div>
                        <div className='card-content'>
                            {/* <div className='number'> ID.{evento.id_evento}</div> */}
                            <div className='info'>
                                {/* <div className='card-name'>Nombre del Evento: {evento.nombre_evento}</div> */}
                                <p className='fecha'>Inicio: {new Date(evento.fechahora_inicio).toLocaleDateString()}</p>
                                <p className='fecha'>Fin: {new Date(evento.fechahora_fin).toLocaleDateString()}</p>
                                <p className='tipo'>Tipo: {evento.nombre_tipo_evento}</p>
                                <p className='organizador'>Organizador: {evento.nombre_organizador} ({evento.cargo_organizador})</p>
                                <p className='tipo-dato'>Tipo Dato: {evento.tipo_dato}</p>
                                <p className='datos-count'>Asistentes: {evento.datos_count}</p>
                                <p className='lugar'>Lugar: {evento.lugar}</p>
                                <p className='tipo-carrera'>Carreras: {evento.tipo_carrera}</p>
                            </div>
                        </div>
                        <div className='chart'>

                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
}

export default Eventos;
