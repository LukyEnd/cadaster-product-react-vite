import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/product.store.ts';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import SidebarComponent from "../../components/side-bar/side-bar.component.tsx";
import './product-list.page.css';

const ProductListPage: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.products);

    return (
        <div className="page-container">
            <SidebarComponent/>
            <div className="content-product-list">
                <div className="register-product-name">
                    <p>Produtos Cadastrados</p>
                </div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.stockQuantity}</td>
                            <td>
                                <Link to={`/edit-product/${product.id}`} className="btn btn-primary">
                                    Editar
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ProductListPage;
