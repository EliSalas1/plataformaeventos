import React, { useState, useEffect } from 'react'; 
import DataTable from 'react-data-table-component';
import './Reportes.css';
import EventoAxios from '../../config/axios';
import * as XLSX from 'xlsx';
import { FaFileExcel, FaExclamationCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function EventReportTable() {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [message, setMessage] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();

    const getLastThreeMonths = () => {
        const now = new Date();
        const months = [];
        for (let i = 2; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push({ name: date.toLocaleString('default', { month: 'long' }), index: date.getMonth() });
        }
        return months;
    };

    const [recentMonths, setRecentMonths] = useState(getLastThreeMonths());

    const consultarEventos = async () => {
        try {
            const respuesta = await EventoAxios.get('/eventos');
            setAllData(respuesta.data);
        } catch (error) {
            console.error('Error al consultar eventos:', error);
        }
    };

    useEffect(() => {
        consultarEventos();
    }, []);

    const handleMonthChange = (monthIndex, monthName) => {
        setSelectedMonth(monthName);
        setShowTable(true);

        const filteredData = allData.filter(evento => {
            const fechaEvento = new Date(evento.fechahora_inicio);
            return fechaEvento.getMonth() === monthIndex;
        });

        setData(filteredData);
        setMessage(filteredData.length === 0 ? `No hay datos disponibles para el mes de ${monthName}` : '');
    };

    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(data.map(row => row.id_evento));
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowSelect = (event, id) => {
        const newSelectedRows = event.target.checked
            ? [...selectedRows, id]
            : selectedRows.filter(rowId => rowId !== id);

        setSelectedRows(newSelectedRows);
    };

    const handleCardClick = (id_evento) => {
        navigate(`/mod4/eventos/${id_evento}`);
    };

    const exportToExcel = () => {
        if (selectedRows.length === 0) {
            toast.warning(<span><FaExclamationCircle /> Selecciona al menos un evento para exportar.</span>, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: 'custom-toast'
            });
            return;
        }

        const selectedData = data.filter(row => selectedRows.includes(row.id_evento));
        const ws = XLSX.utils.json_to_sheet(selectedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Eventos');
        XLSX.writeFile(wb, `eventos_${selectedMonth}.xlsx`);
    };

    const columns = [
        {
            name: (
                <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                    className="select-all-checkbox"
                />
            ),
            cell: (row) => (
                <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id_evento)}
                    onChange={(e) => handleRowSelect(e, row.id_evento)}
                    className="row-checkbox"
                />
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'N°',
            selector: row => row.id_evento,
            sortable: true,
        },
        {
            name: 'Nombre del Evento',
            selector: row => row.nombre_evento,
            sortable: true,
        },
        {
            name: 'Fecha',
            selector: row => new Date(row.fechahora_inicio).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Hora',
            selector: row => new Date(row.fechahora_inicio).toLocaleTimeString(),
            sortable: true,
        },
        {
            name: 'Asistentes',
            selector: row => row.datos_count,
            sortable: true,
        },
        {
            name: 'Semáforo',
            cell: row => {
                const asistentes = row.datos_count;
                let color = '';
                if (asistentes > 20) {
                    color = 'green';
                } else if (asistentes >= 15) {
                    color = 'yellow';
                } else {
                    color = 'red';
                }
                return <span className={`semaforo ${color}`} />;
            },
        },
        {
            name: 'Opciones',
            cell: row => (
                <button className="cyan-button" onClick={() => handleCardClick(row.id_evento)}>
                    Ver
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const allMonths = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return (
        <div className="container">
            <ToastContainer />
            <h2>REPORTE DEL MES</h2>

            <div className="month-container">
                <h3>Meses recientes</h3>
                <div className="button-group">
                    {recentMonths.map(month => (
                        <button
                            key={month.index}
                            className="month-button"
                            onClick={() => handleMonthChange(month.index, month.name)}
                        >
                            {month.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="selector-container">
    <h3>Selecciona un mes</h3>
    <div className="custom-select">
        <span className="select-icon">
            
        </span>
        <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(allMonths.indexOf(e.target.value), e.target.value)}
        >
            <option value="">--Selecciona un mes--</option>
            {allMonths.map((month, index) => (
                <option key={index} value={month}>{month}</option>
            ))}
        </select>
    </div>
</div>

{showTable && (
    <>
        <div className="table-header">
                    <h3>Tabla del mes: {selectedMonth}</h3>
                   
                    {message && <p className="message">{message}</p>}
                    </div>
                    {data.length > 0 && (
                        <div className="table-container">
                            <DataTable
                                columns={columns}
                                data={data}
                                pagination
                            />
                            <button className="export-button" onClick={exportToExcel}>
                                <FaFileExcel /> Exportar a Excel
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default EventReportTable;
