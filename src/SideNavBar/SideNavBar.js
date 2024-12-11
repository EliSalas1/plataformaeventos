import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./SideNavBar.css";

const SideNavBar = () => {
	const [isExpanded, setExpendState] = useState(false);
	const { logout } = useAuth();
	const menuItems = [
		{
			text: "Eventos",
			icon: "icons/grid.svg",
			path: "/",
		},
		{
			text: "Agregar Evento",
			icon: "icons/user.svg",
			path: "/mod3",
		},
		{
			text: "Historial ",
			icon: "icons/visualizar.svg",
			path: "/mod6",
		},
		{
			text: "Reporte",
			icon: "icons/pie-chart.svg",
			path: "/mod5",
		},

		{
			text: "Preview ",
			icon: "icons/folder.svg",
			path: "/mod7",
		},

	];
	return (
		<div
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">

							{/* <img
						  src="img/politec.png" // Ruta pensada para colocar el logo de la UPQROO
						  alt="Logo"
						  className="nav-logo" 
						/> */}
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() => setExpendState(!isExpanded)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
				<div className="nav-menu">
					{menuItems.map(({ text, icon, path }) => (
						<Link
							to={path}
							key={text}
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
						>
							<img className="menu-item-icon" src={icon} alt="" />
							{isExpanded && <p>{text}</p>}
						</Link>
					))}
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src="icons/admin-avatar.svg"
							alt=""
							srcset=""
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">Usuario</p>
							{/* <p className="nav-footer-user-position">Usuario</p> */}
						</div>
					</div>
				)}
				{/* Botón de cerrar sesión */}
				<button className="btnlogin" onClick={logout}>
					<img className="logout-icon" src="icons/logout.svg" alt="" srcset="" />
					{isExpanded}
				</button>
			</div>



		</div>
	);
};

export default SideNavBar;
