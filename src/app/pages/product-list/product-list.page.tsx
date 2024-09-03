import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/product.store.ts'
import { Button, Modal, Table } from 'react-bootstrap'
import { deleteProduct } from '../../store/products-slice.store.ts'
import SidebarComponent from '../../components/side-bar/side-bar.component.tsx'
import './product-list.page.css'
import { InfoProductModel } from '../../models/product-info.model.ts'
import ProductFormComponent from '../../components/product-form/product-form.component.tsx'

const ProductListPage: React.FC = () => {
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products.products)
  const [showFormModal, setShowFormModal] = useState(false)
  const [selectedProduct, setSelectedProduct] =
    useState<InfoProductModel | null>(null)

  const handleShowForm = (product: InfoProductModel | null): void => {
    setSelectedProduct(product)
    setShowFormModal(true)
  }

  const handleCloseForm = (): void => {
    setShowFormModal(false)
    setSelectedProduct(null)
  }

  const handleDelete = (id: string): void => {
    if (window.confirm('Você tem certeza que deseja excluir este produto?')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <div className="page-container">
      <SidebarComponent />
      <div className="content-product-list">
        <div className="header-product-list">
          <div className="text-header">
            <h2>Produtos Cadastrados</h2>
          </div>
          <div className="btn-header">
            <Button
              variant="success"
              onClick={() => handleShowForm(null)}
              className="float-end"
            >
              Cadastrar Produto
            </Button>
          </div>
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
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td className="truncated-text">{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.stockQuantity}</td>
                <td className="container-line-description-product">
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleShowForm(product)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal
          show={showFormModal}
          onHide={handleCloseForm}
          size="lg"
          className=" modal-product-form"
        >
          <ProductFormComponent
            isEditMode={selectedProduct !== null}
            onClose={handleCloseForm}
            product={selectedProduct || undefined}
          />
        </Modal>
      </div>
    </div>
  )
}

export default ProductListPage
