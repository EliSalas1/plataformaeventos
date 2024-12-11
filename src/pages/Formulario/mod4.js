import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {  FaSave, FaUserAlt, FaTrashAlt } from 'react-icons/fa';  
import ClienteAxios from '../../config/axios';
import Swal from 'sweetalert2'; 

function MyFormularioEdit() {
    const { id_evento } = useParams(); // Obtener el ID del evento desde la URL
    const navigate = useNavigate(); // Navegar a otras rutas
    const [tiposEventos, setTiposEventos] = useState([]);
    const [datos, setDatos] = useState([]);
    const [evento, setEvento] = useState({
        action: 'update', // Cambiamos a "update" para actualizar el evento
        id_evento: '',  // Agregar el campo id_evento
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

    const [editable, setEditable] = useState(false); // Estado para habilitar/deshabilitar campos
    const [alerta, setAlerta] = useState(false); // Estado para mostrar la alerta
    const [cargando, setCargando] = useState(false); // Estado para simular carga

    // Consultar las APIs de tipo_evento y tipo_dato
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

    const formatDateForInput = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  

  useEffect(() => {
    if (!id_evento) return;
    const obtenerEvento = async () => {
        try {
            const response = await ClienteAxios.get(`/eventos/${id_evento}`);
            const eventoData = response.data;
            setEvento({
                action: 'update',
                id_evento: eventoData[0]?.id_evento || '',
                nombre_evento: eventoData[0]?.nombre_evento || '',
                fechahora_inicio: formatDateForInput(eventoData[0]?.fechahora_inicio) || '',
                tipo_evento: eventoData[0]?.tipo_evento || '',
                nombre_ponente: eventoData[0]?.nombre_ponente || '',
                lugar: eventoData[0]?.lugar || '',
                tipo_carrera: eventoData[0]?.tipo_carrera || '',
                nombre_organizador: eventoData[0]?.nombre_organizador || '',
                cargo_organizador: eventoData[0]?.cargo_organizador || '',
                comentarios: eventoData[0]?.comentarios || '',
                fechahora_fin: formatDateForInput(eventoData[0]?.fechahora_fin) || '',
                tipo_dato: eventoData[0]?.tipo_dato || '',
            });console.log(eventoData);  // Verifica si los datos del evento llegan correctamente

            } catch (error) {
                console.error('Error al obtener el evento:', error);
            }
        };
  
        obtenerEvento();
        consultarAPI();  // Aquí es donde se llama a la API
    }, [id_evento]);  // Solo depende de id_evento
  
    // Actualizar el estado del evento con los cambios en los inputs
    const actualizarState = (e) => {
        setEvento({
            ...evento,
            [e.target.name]: e.target.value
        });
    };

    // Validar si el formulario está listo para enviar
    const validarEvento = () => {
        const { nombre_evento, fechahora_inicio, tipo_evento, nombre_ponente, lugar, tipo_carrera, nombre_organizador, cargo_organizador, comentarios, fechahora_fin, tipo_dato } = evento;
        return !nombre_evento || !fechahora_inicio || !tipo_evento || !nombre_ponente || !lugar || !tipo_carrera || !nombre_organizador || !cargo_organizador || !comentarios || !fechahora_fin || !tipo_dato;
    };

    // Función para enviar el evento actualizado
    const actualizarEvento = async (e) => {
      e.preventDefault();
      try {
          setCargando(true); // Mostrar "cargando"
          console.log('Cargando activado');
  
          // Simular retraso para probar la barra de carga
          await new Promise((resolve) => setTimeout(resolve, 1000));
  
          await ClienteAxios.post('/eventos', evento); // Enviar datos
          setCargando(false); // Terminar "cargando"
          console.log('Cargando desactivado');
  
          setAlerta(true); // Mostrar alerta de éxito
          setTimeout(() => {
              setAlerta(false); // Ocultar alerta
              navigate('/mod6'); // Navegar a la nueva ruta
          }, 1800); // Esperar 2 segundos antes de navegar
      } catch (error) {
          console.error('Error al actualizar el evento:', error);
          setCargando(false); // Ocultar "cargando" en caso de error
      }
  };
  //Función para eliminar usuario, pero con confirmación
  const deleteEvento = async (id) => {
    try {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás recuperar este evento después de eliminarlo.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar'
        });

        if (result.isConfirmed) {
            await ClienteAxios.delete(`/eventos/${id}`);
            Swal.fire({
                title: '¡Eliminado!',
                text: 'El evento ha sido eliminado correctamente.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            navigate('/mod6');
        }
    } catch (error) {
        console.error('Error al eliminar el evento:', error);
    }
};


    return (
      <div className="form-container">
        {/* Imagen o ícono de una persona */}
        <div className="header-icon">
                <FaUserAlt className="user-icon" /> 
            </div>
            <h2>VISUALIZAR EVENTO</h2>
            

{alerta && (
    <div className="alert-success">
        <p>¡Evento actualizado correctamente!</p>
    </div>
)}
            <form onSubmit={actualizarEvento}>
                <div className="campo">
                    <label>Nombre del Evento:</label>
                    <input
                        type="text"
                        name="nombre_evento"
                        value={evento.nombre_evento}
                        onChange={actualizarState}
                        disabled={!editable}
                    />
                </div>

                <div className="campo">
                    <label>Fecha y Hora de Inicio:</label>
                    <input
                        type="datetime-local"
                        name="fechahora_inicio"
                        value={evento.fechahora_inicio}
                        onChange={actualizarState}
                        disabled={!editable}
                    />
                </div>

                <div className="campo">
                    <label>Tipo de Evento:</label>
                    <select
                        name="tipo_evento"
                        value={evento.tipo_evento}
                        onChange={actualizarState}
                        disabled={!editable}
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
                        value={evento.nombre_ponente}
                        onChange={actualizarState}
                        disabled={!editable}
                    />
                </div>

                <div className="campo">
                    <label>Lugar:</label>
                    <input
                        type="text"
                        name="lugar"
                        value={evento.lugar}
                        onChange={actualizarState}
                        disabled={!editable}
                    />
                </div>
                <div className="campo">
    <label>Tipo de Carrera:</label>
    <select
        name="tipo_carrera"
        value={evento.tipo_carrera}
        onChange={actualizarState}
        disabled={!editable} // Solo editable si `editable` es true
    >
        <option value="">Seleccione una carrera</option>
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
                        value={evento.nombre_organizador}
                        onChange={actualizarState}
                        disabled={!editable}
                    />
                </div>

                <div className="campo">
                    <label>Cargo del Organizador:</label>
                    <input
                        type="text"
                        name="cargo_organizador"
                        value={evento.cargo_organizador}
                        onChange={actualizarState}
                        disabled={!editable}
                    />
                </div>

                <div className="campo">
                    <label>Comentarios:</label>
                    <textarea
                        name="comentarios"
                        value={evento.comentarios}
                        onChange={actualizarState}
                        disabled={!editable}
                    ></textarea>
                </div>

                <div className="campo">
                    <label>Fecha y Hora de Fin:</label>
                    <input
                        type="datetime-local"
                        name="fechahora_fin"
                        value={evento.fechahora_fin}
                        onChange={actualizarState}
                        disabled={!editable}
                    />
                </div>

                <div className="campo">
                    <label>Tipo de Dato:</label>
                    <select
                        name="tipo_dato"
                        value={evento.tipo_dato}
                        onChange={actualizarState}
                        disabled={!editable}
                    >
                        <option value="">Seleccione el Tipo de Dato</option>
                        {datos.map(dato => (
                            <option key={dato.id} value={dato.id}>
                                {dato.id} - {dato.last_increment_source}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="enviar">
                    <button type="button" onClick={() => setEditable(!editable)}className="btn btn-verde">
                        {editable ? 'Cancelar' : 'Editar'}
                        {/* <FaEdit /> */}
                    </button>
                    
                    <button
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarEvento()}                                              
                    >
                    <FaSave className="icon"/> Guardar Cambios
                    </button>
                      <button
                        type="button"
                        className="btn btn-rojo"
                        onClick={() => deleteEvento(evento.id_evento)}
                    >
                        
                        <FaTrashAlt className="icon"/> Eliminar
                    </button>              
                </div>
                {cargando && (
        <div className="loading-bar">
            <p>Guardando cambios...</p>
        </div>
    )}
            </form>              
</div>       
    );
}

export default MyFormularioEdit;
