import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './side-bar.component.css';

const SidebarComponent: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const toggleSidebar = (): void => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleLinkClick = (): void => {
        setSidebarOpen(false);
    };

    return (
        <div>
            <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <Nav className="flex-column">
                    <Nav.Item>
                        <Link
                            to="/"
                            className={`nav-link ${location.pathname === '/' ? 'disabled' : ''}`}
                            onClick={handleLinkClick}>
                            Página Inicial
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link
                            to="/product-list"
                            className={`nav-link ${location.pathname === '/product-list' ? 'disabled' : ''}`}
                            onClick={handleLinkClick}>
                            Lista de Produtos
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link
                            to="/product-creation"
                            className={`nav-link ${location.pathname === '/product-creation' ? 'disabled' : ''}`}
                            onClick={handleLinkClick}>
                            Cadastrar Produto
                        </Link>
                    </Nav.Item>
                </Nav>
            </div>
            <button
                className="btn btn-primary"
                onClick={toggleSidebar}
                style={{position: 'fixed', top: '20px', left: '20px'}}>
                <i className="bi bi-list" style={{fontSize: '24px'}}></i>
            </button>
        </div>
    );
};

export default SidebarComponent;
