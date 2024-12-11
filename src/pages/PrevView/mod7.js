import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import EventoAxios from "../../config/axios";
import "jspdf-autotable";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Preview.css";

function PrevView() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);
    const [reports, setReports] = useState([]);
    const [isExpanded] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await EventoAxios.get("/eventos");
                setReports(response.data);
            } catch (error) {
                console.error("Error al obtener los eventos:", error);
            }
        };
        fetchEvents();
    }, []);


    const filteredReports = reports.filter((report) =>
        report.nombre_evento.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle PDF download
    const handleDownloadPDF = () => {
        if (!selectedReport) return;

        const doc = new jsPDF();

        // Encabezado
        const logoPath = "/img/UPD.png";
        const img = new Image();
        img.src = logoPath;

        img.onload = () => {
            // Logo
            doc.addImage(img, "PNG", 70, 10, 70, 35); // Más grande y centrado
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Universidad Politécnica de Quintana Roo", 105, 55, { align: "center" });
            doc.text("Registro del Evento", 105, 65, { align: "center" });

            // Información en tabla
            doc.autoTable({
                startY: 80,
                styles: {
                    fontSize: 12,
                    cellPadding: 3,
                    valign: "middle",
                },
                columnStyles: {
                    0: { cellWidth: 60, fontStyle: "bold" }, // Columna de encabezados
                    1: { cellWidth: 130 }, // Columna de contenido
                },
                headStyles: {
                    fillColor: [255, 165, 0], // Naranja desvanecido
                    textColor: [0, 0, 0], // Texto negro
                    halign: "left",
                },
                bodyStyles: {
                    lineWidth: 0.1, // Bordes internos suaves
                    lineColor: [0, 0, 0], // Negro para los bordes internos
                },
                tableLineWidth: 0.1, // Grosor del contorno de la tabla
                tableLineColor: [0, 0, 0], // Negro para el contorno
                body: [
                    // Información del Evento
                    [{ content: "Información del Evento:", colSpan: 2, styles: { fillColor: [255, 235, 200] } }],
                    ["Nombre del Evento:", selectedReport.nombre_evento],
                    ["Fecha de inicio:", new Date(selectedReport.fechahora_inicio).toLocaleDateString(),
                        "Fecha de Fin:", new Date(selectedReport.fechahora_fin).toLocaleDateString()],
                    ["Tipo de Evento:", selectedReport.nombre_tipo_evento],
                    ["Lugar del Evento:", selectedReport.lugar],
                    ["Nombre del ponente:", selectedReport.nombre_ponente],
                    [{ content: "", colSpan: 2 }], // Espacio

                    // Información de los Asistentes
                    [{ content: "Información de los Asistentes:", colSpan: 2, styles: { fillColor: [255, 235, 200] } }],
                    ["N° de asistentes:", selectedReport.datos_count || "N/A"],
                    ["Tipos de Carreras:", selectedReport.tipo_carrera || "N/A"],
                    [{ content: "", colSpan: 2 }], // Espacio

                    // Información del Organizador
                    [{ content: "Información del Organizador:", colSpan: 2, styles: { fillColor: [255, 235, 200] } }],
                    ["Nombre del Organizador:", selectedReport.nombre_organizador || "N/A"],
                    ["Cargo del Organizador:", selectedReport.cargo_organizador || "N/A"],
                ],
            });

            // Fecha de descarga al final
            const fechaHoy = new Date().toLocaleDateString("es-ES");
            doc.setFont("Helvetica", "normal");
            doc.setFontSize(10);
            doc.text(`Fecha de descarga: ${fechaHoy}`, 190, doc.internal.pageSize.height - 10, { align: "right" });

            // Guardar el PDF
            doc.save(`${selectedReport.nombre_evento}.pdf`);
        };

        img.onerror = () => {
            console.error("No se pudo cargar la imagen del logo. Verifica la ruta.");
        };
    };

    return (
        <div className="container my-4">
            {/* Search Section */}
            <div className={`search-bar ${isExpanded ? "expanded" : ""}`}>
                <i
                    className="fas fa-search search-icon"

                ></i>
                {isExpanded && (
                    <input
                        type="text"
                        placeholder="Buscar por nombre del evento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                )}
            </div>

            {/* Lista de resultados */}
            {reports.length === 0 ? (
                <p className="text-center mt-3">Cargando eventos...</p>
            ) : filteredReports.length === 0 ? (
                <p className="text-center mt-3">No se encontraron resultados</p>
            ) : (
                <div className="results-list">
                    {filteredReports.map((report) => (
                        <div
                            key={report.id_evento}
                            className={`search-result ${selectedReport?.id_evento === report.id_evento ? "active" : ""
                                }`}
                            onClick={() => setSelectedReport(report)}
                        >
                            <strong>{report.nombre_evento}</strong>
                            <p>
                                {new Date(report.fechahora_inicio).toLocaleDateString()} -{" "}
                                {new Date(report.fechahora_fin).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            {/* Report Preview Section */}
            {selectedReport && (
                <div className="custom-container my-4">
                    <div className="card-header">
                        <h2 className="text">
                            <i className="fas fa-eye me-2"></i>Vista Previa de Historial
                        </h2>
                    </div>
                    <div className="card-body">
                        <section className="mb-3">
                            <h4>Información del Evento:</h4>
                            <p><strong>Nombre del Evento:</strong> {selectedReport.nombre_evento}</p>
                            <p>
                                <strong>Fecha de inicio:</strong>{" "}
                                {new Date(selectedReport.fechahora_inicio).toLocaleDateString()} &nbsp;&nbsp;
                                <strong>Fecha de Término:</strong>{" "}
                                {new Date(selectedReport.fechahora_fin).toLocaleDateString()}
                            </p>
                            <p><strong>Hora de inicio:</strong> {selectedReport.hora_inicio} &nbsp;&nbsp; <strong>Hora de Término:</strong> {selectedReport.hora_fin}</p>
                            <p><strong>Tipo de Evento:</strong> {selectedReport.nombre_tipo_evento}</p>
                            <p><strong>Lugar del Evento:</strong> {selectedReport.lugar}</p>
                            <p><strong>Nombre del Ponente:</strong> {selectedReport.nombre_ponente}</p>
                        </section>
                    </div>

                    {/* Download Button */}
                    {selectedReport && (
                        <div className="text-center mt-3"> {/* Centrado y margen superior */}
                            <button
                                onClick={handleDownloadPDF}
                                className="download-btn"
                            >
                                <i className="fas fa-download me-2"></i>Descargar PDF
                            </button>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

export default PrevView;
