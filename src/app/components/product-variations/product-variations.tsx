import React from 'react'
import './product-variations.css'
import { ProductVariationsProps } from '../../models/product-variation.props.ts'

const ProductVariationsComponent: React.FC<ProductVariationsProps> = ({
  variation,
  filteredProducts,
}) => {
  if (!variation) return null

  return (
    <div className="mt-4 container-variations">
      <p className="variations-title">Produtos com a Variação: {variation}</p>
      <div className="table-container">
        <table className="table-variation">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stockQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductVariationsComponent
