import React, { useState, useEffect } from "react";
import './Eventos.css';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import EventoAxios from '../../config/axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function EventosPrincipal() {
    const [eventosAno, setEventosAno] = useState([]);
    const [eventosPorMes, setEventosPorMes] = useState(new Array(12).fill(0));
    const [tipoEventosData, setTipoEventosData] = useState({ labels: [], counts: [] });
    const [eventosPorDia, setEventosPorDia] = useState([]);
    const [mesActual, setMesActual] = useState("");
    const [mostrarTrimestral, setMostrarTrimestral] = useState(false);
    //const [currentSlide, setCurrentSlide] = useState(0); // Para el carrusel
    const [eventosPorMesDetalles, setEventosPorMesDetalles] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filteredRegistros, setFilteredRegistros] = useState([]);


    useEffect(() => {
        
        const obtenerMesActual = () => {
            const fechaActual = new Date();
            const meses = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            setMesActual(meses[fechaActual.getMonth()]);
        };

        const fetchEventos = async () => {
            try {
                const response = await EventoAxios.get('/eventos');
                const eventos = response.data;

                // Preparar datos por mes
                const eventosPorMesDetalles = Array.from({ length: 12 }, () => Array(31).fill(0));
                const conteoPorMes = new Array(12).fill(0);
                eventos.forEach(evento => {
                    const fecha = new Date(evento.fechahora_inicio);
                    const mes = fecha.getMonth();
                    const dia = fecha.getDate();
                    conteoPorMes[mes]++;

                    eventosPorMesDetalles[mes][dia - 1]++;
                });
                setEventosPorMes(conteoPorMes);
                setEventosPorMesDetalles(eventosPorMesDetalles);
            } catch (error) {
                console.error("Error al consultar los eventos:", error);
            }
        };



        const fetchEventosAno = async () => {
            try {
                const response = await EventoAxios.get('/eventos');
                const eventos = response.data;

                const conteoPorMes = new Array(12).fill(0);
                const conteoPorTipo = {};
                const conteoPorDia = {};

                const fechaActual = new Date();
                const mesActual = fechaActual.getMonth();
                const diasEnMes = new Date(fechaActual.getFullYear(), mesActual + 1, 0).getDate();

                for (let i = 1; i <= diasEnMes; i++) {
                    conteoPorDia[i] = 0;
                }

                eventos.forEach(evento => {
                    const fecha = new Date(evento.fechahora_inicio);
                    const mes = fecha.getMonth();
                    conteoPorMes[mes]++;

                    if (mes === mesActual) {
                        const dia = fecha.getDate();
                        conteoPorDia[dia]++;
                    }

                    const tipo = evento.nombre_tipo_evento;
                    conteoPorTipo[tipo] = (conteoPorTipo[tipo] || 0) + 1;
                });

                const labels = Object.keys(conteoPorTipo);
                const counts = Object.values(conteoPorTipo);

                setEventosAno(eventos);
                setEventosPorMes(conteoPorMes);
                setTipoEventosData({ labels, counts });

                const eventosPorDiaArray = Array.from({ length: diasEnMes }, (_, i) => conteoPorDia[i + 1]);
                setEventosPorDia(eventosPorDiaArray);
            } catch (error) {
                console.error('Error al consultar los eventos:', error);
            }
        };
        fetchEventos();
        obtenerMesActual();
        fetchEventosAno();
    }, []);

    // Calcular datos trimestrales
    const calcularDatosTrimestrales = () => {
        const trimestres = [
            eventosPorMes.slice(0, 3).reduce((a, b) => a + b, 0),
            eventosPorMes.slice(3, 6).reduce((a, b) => a + b, 0),
            eventosPorMes.slice(6, 9).reduce((a, b) => a + b, 0),
            eventosPorMes.slice(9, 12).reduce((a, b) => a + b, 0),
        ];
        return trimestres;
    };
    // Datos para el gráfico trimestral
    const barChartDataTrimestral = {
        labels: ["Ene-Mar", "Abr-Jun", "Jul-Sep", "Oct-Dic"],
        datasets: [{
            label: 'Número de eventos (trimestral)',
            data: calcularDatosTrimestrales(),
            backgroundColor: 'rgba(255, 165, 0, 0.8)', // Naranja
            borderColor: 'rgba(255, 165, 0, 1)', // Naranja oscuro para el borde
            borderWidth: 1
        }],
    };

    // Generar gráficos dinámicos para cada mes
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Gráfico de líneas para el mes actual
    const lineChartDataMes = {
        labels: Array.from({ length: eventosPorDia.length }, (_, i) => (i + 1).toString()), // Etiquetas de días del mes
        datasets: [{
            label: 'Número de eventos',
            data: eventosPorDia,
            backgroundColor: 'rgba(255, 103, 31, 1)', // #ff671f
            borderColor: 'rgba(255, 103, 31, 0.8)', // #ff671f
            borderWidth: 1,
        }],
    };

    // Datos para el gráfico de líneas (Eventos del año)
    const lineChartDataAno = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
            label: 'Número de eventos',
            data: eventosPorMes,
            backgroundColor: [
                'rgba(255, 103, 31, 1)', // #ff671f
            ],
            borderColor: [
                'rgba(255, 103, 31, 0.8)', // #ff671f
            ],
            borderWidth: 1,
        }],
    };



    // Datos dinámicos para el gráfico de dona (Tipos de eventos del año)
    const doughnutData = {
        labels: tipoEventosData.labels,
        datasets: [{
            label: 'Tipos de eventos',
            data: tipoEventosData.counts,
            backgroundColor: [
                'rgba(95, 0, 0, 0.8)', // #5f0000
                'rgba(185, 43, 43, 0.8)', // #b92b2b
                'rgba(255, 103, 31, 0.8)', // #ff671f
                'rgba(200, 200, 200, 0.8)', // Gris claro
                'rgba(255, 255, 255, 0.8)', // Blanco
                'rgba(150, 150, 150, 0.8)', // Gris medio
            ],
            borderColor: [
                'rgba(95, 0, 0, 1)', // #5f0000
                'rgba(185, 43, 43, 1)', // #b92b2b
                'rgba(255, 103, 31, 1)', // #ff671f
                'rgba(200, 200, 200, 1)', // Gris claro
                'rgba(255, 255, 255, 1)', // Blanco
                'rgba(150, 150, 150, 1)', // Gris medio
            ],
            borderWidth: 1,
        }]
    };

    const charts = eventosPorMesDetalles.map((datosMes, index) => {
        const diasDelMes = Array.from({ length: datosMes.length }, (_, i) => i + 1);
        const chartData = {
            labels: diasDelMes,
            datasets: [{
                label: `Eventos en ${meses[index]}`,
                data: datosMes,
                backgroundColor: 'rgba(255, 103, 31, 0.5)',
                borderColor: 'rgba(255, 103, 31, 1)',
                borderWidth: 2,
            }],
        };

        return <Line key={index} data={chartData} options={{ responsive: true }} />;
    });

    const nextSlide = () => setCurrentSlide((currentSlide + 1) % 12);
    const prevSlide = () => setCurrentSlide((currentSlide - 1 + 12) % 12);

    const handleMonthSelect = (event) => {
        const selectedMonth = parseInt(event.target.value, 10);
        setCurrentSlide(selectedMonth);
    };

    // Opciones comunes para los gráficos
    const options = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                    callback: function (value) {
                        return Math.floor(value); // Asegura que solo muestre números enteros
                    },
                },
            },
        },
    };


    return (
        <div className="container">
            <div className="mes-actual">
                <h3>Mes actual: {mesActual}</h3>
            </div>

            {/* Gráficos */}
            <div className='charts'>
                {/* Gráfico de líneas - Eventos de la semana */}
                <div className="chart">
                    <h2>Eventos durante la Mes</h2>
                    <Line data={lineChartDataMes} options={options} />
                </div>
                {/* Gráfico de dona */}
                <div className="chart" id="doughnut-chart">
                    <h2>Tipos de eventos</h2>
                    <Doughnut data={doughnutData} />
                </div>

            </div>

            {/* Cards de información */}
            <div className='container'>
                <div className='cards'>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='number'>1</div>
                            <div className='card-name'>N° Estudiantes</div>
                        </div>
                        <div className='icon-box'>
                            <i className='fas fa-user-graduate'></i>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='number'>1</div>
                            <div className='card-name'>Mujeres</div>
                        </div>
                        <div className='icon-box'>
                            <i className='fas fa-user'></i>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='number'>1</div>
                            <div className='card-name'>Hombres</div>
                        </div>
                        <div className='icon-box'>
                            <i className='fas fa-user'></i>
                        </div>
                    </div>

                </div>
            </div>

            <div className='charts'>
                {/* Gráfico de eventos del año */}
                <div className="chart">
                    <h2>Eventos durante el año</h2>
                    <Line data={lineChartDataAno} options={options} />
                </div>


                {/* Gráfico de dona */}
                <div className="chart" id="doughnut-chart">
                    <h2>Tipos de eventos (año)</h2>
                    <Doughnut data={doughnutData} />
                </div>
            </div>



            {/* Carrusel de gráficos */}
            <div className="carousel">
                <h2>Visualización Gráficas por mes</h2>
                <div className="carousel-container">
                    <h3>{meses[currentSlide]}</h3>
                    <div className="event-count">
                        <p>Número de eventos: {eventosPorMes[currentSlide]}</p>
                    </div>
                    {charts[currentSlide]}
                </div>
                <div className="carousel-controls">
                    <button onClick={prevSlide}>Anterior</button>
                    <select
                        className="month-selector"
                        value={currentSlide}
                        onChange={handleMonthSelect}
                    >
                        {meses.map((mes, index) => (
                            <option key={index} value={index}>{mes}</option>
                        ))}
                    </select>

                    <button onClick={nextSlide}>Siguiente</button>
                </div>
            </div>


            {/* Cards de información */}
            <div className='cards'>
                <div className='card'>
                    <div className='card-content'>
                        <div className='number'>1</div>
                        <div className='card-name'>N° Estudiantes</div>
                    </div>
                    <div className='icon-box'>
                        <i className='fas fa-user-graduate'></i>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-content'>
                        <div className='number'>1</div>
                        <div className='card-name'>Mujeres</div>
                    </div>
                    <div className='icon-box'>
                        <i className='fa-solid fa-person-dress'></i>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-content'>
                        <div className='number'>1</div>
                        <div className='card-name'>Hombres</div>
                    </div>
                    <div className='icon-box'>
                        <i className='fa-solid fa-person'></i>
                    </div>
                </div>
            </div>

            <div className='charts'>

                {/* Mostrar el gráfico trimestral solo si el usuario lo solicita */}

                <div className="chart">
                    <h2>Eventos Trimestrales</h2>
                    <Bar data={barChartDataTrimestral} options={options} />
                </div>


                {/* Gráfico de dona */}
                <div className="chart" id="doughnut-chart">
                    <h2>Tipos de eventos (año)</h2>
                    <Doughnut data={doughnutData} />
                </div>
            </div>
        </div>
    );
}

export default EventosPrincipal;
