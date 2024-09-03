import React, { useEffect, useState } from 'react'
import { RootState } from '../../store/product.store.ts'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct, updateProduct } from '../../store/products-slice.store'
import { InfoProductModel } from '../../models/product-info.model'
import { ProductFormComponentPropsModel } from '../../models/product-form-props.model'
import { ProductVariationModel } from '../../models/product-variation.model'
import formFields from './form-fields.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import './product-form.component.css'

import ProductVariationsComponent from '../product-variations/product-variations.tsx'

const getInputClassName = (inputName: string): string => {
  switch (inputName) {
    case 'id':
      return 'form-control form-control-sm input-id'
    case 'price':
      return 'form-control form-control-sm input-price'
    case 'stockQuantity':
      return 'form-control form-control-sm input-quantity'
    default:
      return 'form-control'
  }
}

const ProductFormComponent: React.FC<ProductFormComponentPropsModel> = ({
  isEditMode = false,
  onClose,
  product,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>()
  const products = useSelector((state: RootState) => state.products.products)

  const initialFormState: InfoProductModel = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: '',
    stockQuantity: 0,
    variation: '',
  }

  const [formState, setFormState] = useState<InfoProductModel>(initialFormState)
  const [variations] = useState<ProductVariationModel[]>([
    { id: 1, name: 'KIT-KAT' },
    { id: 2, name: 'OUTROS' },
  ])
  const [filteredProducts, setFilteredProducts] = useState<InfoProductModel[]>(
    []
  )

  useEffect((): void => {
    if (isEditMode && product) {
      setFormState(product)
    }
  }, [isEditMode, product])

  useEffect((): void => {
    if (formState.variation) {
      const filtered = products.filter(
        (product) => product.variation === formState.variation
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts([])
    }
  }, [formState.variation, products])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]:
        name === 'price'
          ? parseFloat(value)
          : name === 'stockQuantity'
            ? parseInt(value, 10)
            : value,
    }))
  }

  useEffect((): void => {
    setTitle(isEditMode ? 'Editar Produto' : 'Cadastrar Produto')
  }, [isEditMode])

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    if (isEditMode) {
      dispatch(updateProduct(formState))
      navigate('/product-list')
    } else {
      dispatch(addProduct(formState))
      setFormState(initialFormState)
    }
    if (onClose) onClose()
  }

  return (
    <div className="base-form-component">
      <div className="container-form-component">
        <form
          onSubmit={handleSubmit}
          className={
            isEditMode
              ? 'product-form-container'
              : 'product-form-container cadaster'
          }
        >
          <p className="text-center">{title}</p>
          <div className="row mb-3">
            {formFields.map((input, index) => (
              <div
                className={`col-md-${input.name === 'name' || input.name === 'category' ? '6' : '4'} mb-3`}
                key={index}
              >
                <label htmlFor={input.id} className="form-label">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  className={getInputClassName(input.name)}
                  id={input.id}
                  name={input.name}
                  value={formState[input.name as keyof InfoProductModel] ?? ''}
                  onChange={handleChange}
                  disabled={input.disabled && isEditMode}
                />
              </div>
            ))}
          </div>
          <div className="mb-3">
            <label htmlFor="descricao-produto" className="form-label">
              Descrição do Produto
            </label>
            <input
              type="text"
              className="form-control"
              id="descricao-produto"
              name="description"
              value={formState.description}
              onChange={handleChange}
              disabled={false}
            />
          </div>
          <div className="mb-3 ">
            <label htmlFor="variacao-produto" className="form-label">
              Variação do Produto
            </label>
            <select
              id="variacao-produto"
              name="variation"
              className="form-control"
              value={formState.variation}
              onChange={handleChange}
            >
              <option value="">Selecione a variação</option>
              {variations.map((variation) => (
                <option key={variation.id} value={variation.name}>
                  {variation.name}
                </option>
              ))}
            </select>
          </div>
          <div className="btns-product-form">
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditMode ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
      {filteredProducts.length > 0 && (
        <ProductVariationsComponent
          variation={formState.variation as string}
          filteredProducts={filteredProducts}
        />
      )}
    </div>
  )
}

export default ProductFormComponent
