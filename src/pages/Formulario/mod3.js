import React, { useEffect, useState } from 'react';
import ClienteAxios from '../../config/axios';
import { FaSave, FaUserAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './MyDropdown.css';
import { useNavigate } from 'react-router-dom';

function MyDropdown() {
    const [tiposEventos, setTiposEventos] = useState([]);
    const [datos, setDatos] = useState([]);
    const [evento, setEvento] = useState({
        action: 'insert',
        nombre_evento: '',
        fechahora_inicio: '',
        tipo_evento: '',
        nombre_ponente: '',
        lugar: '',
        tipo_carrera: '',
        nombre_organizador: '',
        cargo_organizador: '',
        comentarios: '',
        fechahora_fin: '',
        tipo_dato: ''
    });

    const [notificacion, setNotificacion] = useState({ mensaje: '', tipo: '' }); // Estado para las notificaciones

    const consultarAPI = async () => {
        try {
            const tiposEventosConsulta = await ClienteAxios.get('/tiposeventos');
            const datosConsulta = await ClienteAxios.get('/datafire');
            setTiposEventos(tiposEventosConsulta.data);
            setDatos(datosConsulta.data);
        } catch (error) {
            console.error('Error al consultar las APIs:', error);
        }
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    const actualizarState = (e) => {
        setEvento({
            ...evento,
            [e.target.name]: e.target.value
        });
    };

    const validarEvento = () => {
        const { nombre_evento, fechahora_inicio, tipo_evento, nombre_ponente, lugar, tipo_carrera, nombre_organizador, cargo_organizador, comentarios, fechahora_fin, tipo_dato } = evento;
        return !nombre_evento || !fechahora_inicio || !tipo_evento || !nombre_ponente || !lugar || !tipo_carrera || !nombre_organizador || !cargo_organizador || !comentarios || !fechahora_fin || !tipo_dato;
    };

    const navigate = useNavigate(); // Inicializamos el hook de navegación
    const agregarEvento = async (e) => {
        e.preventDefault();
        try {
            const res = await ClienteAxios.post('/eventos', evento);
            setNotificacion({ mensaje: 'Evento creado correctamente', tipo: 'exito' }); // Notificación de éxito

            // Restablece los campos del formulario
            setEvento({
                action: 'insert',
                nombre_evento: '',
                fechahora_inicio: '',
                tipo_evento: '',
                nombre_ponente: '',
                lugar: '',
                tipo_carrera: '',
                nombre_organizador: '',
                cargo_organizador: '',
                comentarios: '',
                fechahora_fin: '',
                tipo_dato: ''
            });

            // Ocultar notificación después de 3 segundos y redirigir
            setTimeout(() => {
                setNotificacion({ mensaje: '', tipo: '' });
                navigate('/mod3'); // Cambia esta ruta según la estructura de tu proyecto
            }, 2000);
        } catch (error) {
            console.error('Error al guardar el evento:', error);
            setNotificacion({ mensaje: 'Evento no se creó correctamente', tipo: 'error' }); // Notificación de error
            setTimeout(() => setNotificacion({ mensaje: '', tipo: '' }), 3000); // Ocultar notificación después de 3 segundos
        }
    };



    return (
        <div className="form-container">
            {/* Notificación */}
            {notificacion.mensaje && (
                <div className={`notificacion ${notificacion.tipo}`}>
                    {notificacion.tipo === 'exito' ? (
                        <FaCheckCircle className="icono-notificacion" />
                    ) : (
                        <FaTimesCircle className="icono-notificacion" />
                    )}
                    <span>{notificacion.mensaje}</span>
                </div>
            )}


            <div className="header-icon">
                <FaUserAlt className="user-icon" />
            </div>

            <h2>AGREGAR EVENTO</h2>
            <form onSubmit={agregarEvento}>
                <div className="campo">
                    <label>Nombre del Evento:</label>
                    <input
                        type="text"
                        name="nombre_evento"
                        onChange={actualizarState}
                        value={evento.nombre_evento}
                    />
                </div>

                <div className="campo">
                    <label>Fecha y Hora de Inicio:</label>
                    <input
                        type="datetime-local"
                        name="fechahora_inicio"
                        onChange={actualizarState}
                        value={evento.fechahora_inicio}
                    />
                </div>

                <div className="campo">
                    <label>Tipo de Evento:</label>
                    <select
                        name="tipo_evento"
                        onChange={actualizarState}
                        value={evento.tipo_evento}
                    >
                        <option value="">Seleccione el Tipo de Evento</option>
                        {tiposEventos.map(evento => (
                            <option key={evento.id} value={evento.id}>
                                {evento.tipo_evento}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label>Nombre del Ponente:</label>
                    <input
                        type="text"
                        name="nombre_ponente"
                        onChange={actualizarState}
                        value={evento.nombre_ponente}
                    />
                </div>

                <div className="campo">
                    <label>Lugar:</label>
                    <input
                        type="text"
                        name="lugar"
                        onChange={actualizarState}
                        value={evento.lugar}
                    />
                </div>

                <div className="campo">
                    <label>Tipo de Carrera:</label>
                    <select
                        name="tipo_carrera"
                        onChange={actualizarState}
                        value={evento.tipo_carrera}
                    >
                        <option value="">Seleccione una Carrera</option>
                        <option value="Licenciatura en Ingeniería en Tecnologías de la Información e Innovación Digital">
                            Licenciatura en Ingeniería en Tecnologías de la Información e Innovación Digital
                        </option>
                        <option value="Licenciatura en Ingeniería Financiera">Licenciatura en Ingeniería Financiera</option>
                        <option value="Licenciatura en Ingeniería Biomédica">Licenciatura en Ingeniería Biomédica</option>
                        <option value="Licenciatura en Administración">Licenciatura en Administración</option>
                        <option value="Licenciatura en Terapia Física">Licenciatura en Terapia Física</option>
                        <option value="Ingeniería en Biotecnología">Ingeniería en Biotecnología</option>
                        <option value="Público en General">Público en General</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>


                <div className="campo">
                    <label>Nombre del Organizador:</label>
                    <input
                        type="text"
                        name="nombre_organizador"
                        onChange={actualizarState}
                        value={evento.nombre_organizador}
                    />
                </div>

                <div className="campo">
                    <label>Cargo del Organizador:</label>
                    <input
                        type="text"
                        name="cargo_organizador"
                        onChange={actualizarState}
                        value={evento.cargo_organizador}
                    />
                </div>

                <div className="campo">
                    <label>Comentarios:</label>
                    <textarea
                        name="comentarios"
                        onChange={actualizarState}
                        value={evento.comentarios}
                    ></textarea>
                </div>

                <div className="campo">
                    <label>Fecha y Hora de Fin:</label>
                    <input
                        type="datetime-local"
                        name="fechahora_fin"
                        onChange={actualizarState}
                        value={evento.fechahora_fin}
                    />
                </div>

                <div className="campo">
                    <label>Tipo de Dato:</label>
                    <select
                        name="tipo_dato"
                        onChange={actualizarState}
                        value={evento.tipo_dato}
                    >
                        <option value="">Seleccione el Tipo de Dato</option>
                        {datos.map(dato => (
                            <option key={dato.id} value={dato.id}>
                                {dato.id} - {dato.last_increment_source}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <button onClick={() => setNotificacion({ mensaje: 'Prueba de notificación', tipo: 'exito' })}>
    Probar Notificación
</button> */}


                <div className="enviar">
                    <button type="submit" className="btn btn-verde" value="Agregar Evento" disabled={validarEvento()}>
                        <FaSave className="icon" /> Agregar Evento
                    </button>
                </div>
            </form>

        </div>
    );
}

export default MyDropdown;
