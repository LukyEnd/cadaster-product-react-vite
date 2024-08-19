import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addProduct, updateProduct} from "../../store/products-slice.store.ts";
import {InfoProductModel} from "../../models/product-info.model.ts";
import {ProductFormComponentPropsModel} from "../../models/product-form-props.model.ts";
import 'bootstrap/dist/css/bootstrap.min.css';
import './product-form.component.css';

const getInputClassName = (inputName: string): string => {
    switch (inputName) {
        case 'id':
            return 'form-control form-control-sm input-id';
        case 'price':
            return 'form-control form-control-sm input-price';
        case 'stockQuantity':
            return 'form-control form-control-sm input-quantity';
        default:
            return 'form-control';
    }
};

const ProductFormComponent: React.FC<ProductFormComponentPropsModel> =
    ({
         isEditMode = false,
         titleForComponent = "Cadastrar Produto",
         onClose,
         product
     }) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const initialFormState: InfoProductModel = {
            id: 0,
            name: '',
            description: '',
            price: 0,
            category: '',
            stockQuantity: 0
        };

        const [formState, setFormState] = useState<InfoProductModel>(initialFormState);

        useEffect(() => {
            console.log('Received product:', product);
            if (isEditMode && product) {
                setFormState({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    stockQuantity: product.stockQuantity
                });
            }
        }, [isEditMode, product]);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
            const {name, value} = event.target;
            setFormState(prevState => ({
                ...prevState,
                [name]: name === 'price' ? parseFloat(value) : name === 'stockQuantity' ? parseInt(value, 10) : value,
            }));
        };

        const handleSubmit = (event: React.FormEvent): void => {
            event.preventDefault();
            if (isEditMode) {
                dispatch(updateProduct(formState));
                navigate('/product-list');
            } else {
                dispatch(addProduct(formState));
                setFormState(initialFormState);
            }
            if (onClose) onClose();
        };

        return (
            <div className="base-form-component">
                <div className="container-form-component">
                    <form onSubmit={handleSubmit}
                          className={isEditMode ? "product-form-container" : "product-form-container cadaster"}>
                        <p className="text-center">{titleForComponent}</p>
                        <div className="row mb-3">
                            {[
                                {
                                    id: 'id-produto',
                                    label: 'ID do produto',
                                    type: 'number',
                                    name: 'id',
                                    disabled: isEditMode
                                },
                                {
                                    id: 'preco-produto',
                                    label: 'Preço do Produto',
                                    type: 'number',
                                    name: 'price',
                                    disabled: false
                                },
                                {
                                    id: 'quantidade-produto',
                                    label: 'Quantidade em Loja',
                                    type: 'number',
                                    name: 'stockQuantity',
                                    disabled: false
                                }
                            ].map((input, index) => (
                                <div className="col-md-4 mb-3" key={index}>
                                    <label htmlFor={input.id} className="form-label">{input.label}</label>
                                    <input
                                        type={input.type}
                                        className={getInputClassName(input.name)}
                                        id={input.id}
                                        name={input.name}
                                        value={formState[input.name as keyof InfoProductModel] ?? ''}
                                        onChange={handleChange}
                                        disabled={input.disabled}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="row mb-3">
                            {[
                                {
                                    id: 'nome-produto',
                                    label: 'Nome do Produto',
                                    type: 'text',
                                    name: 'name',
                                    disabled: false
                                },
                                {
                                    id: 'categoria-produto',
                                    label: 'Categoria do Produto',
                                    type: 'text',
                                    name: 'category',
                                    disabled: false
                                }
                            ].map((input, index) => (
                                <div className="col-md-6 mb-3" key={index}>
                                    <label htmlFor={input.id} className="form-label">{input.label}</label>
                                    <input
                                        type={input.type}
                                        className="form-control"
                                        id={input.id}
                                        name={input.name}
                                        value={formState[input.name as keyof InfoProductModel] ?? ''}
                                        onChange={handleChange}
                                        disabled={input.disabled}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descricao-produto" className="form-label">Descrição do Produto</label>
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
                        <div className="btns-product-form">
                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit"
                                    className="btn btn-primary">
                                {isEditMode ? 'Atualizar' : 'Cadastrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

export default ProductFormComponent;
