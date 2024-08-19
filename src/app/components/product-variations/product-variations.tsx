// import React, {useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {addVariation, updateVariation, removeVariation} from '../../store/product-variation-slice.store.ts';
// import {RootState} from '../../store/product.store.ts';
// import {ProductVariationModel} from '../../models/product-variation.model.ts';
//
// const ProductVariationsComponent: React.FC<{ productId: number }> = ({productId}) => {
//     const dispatch = useDispatch();
//     const variations = useSelector((state: RootState) => state.variations.variations.filter(variation => variation.productId === productId));
//
//     const [newVariation, setNewVariation] = useState<ProductVariationModel>({productId, name: ''});
//
//     const handleVariationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setNewVariation({...newVariation, name: e.target.value});
//     };
//
//     const handleAddVariation = () => {
//         dispatch(addVariation(newVariation));
//         setNewVariation({productId, name: ''});
//     };
//
//     const handleUpdateVariation = (id: number, name: string) => {
//         dispatch(updateVariation({id, name}));
//     };
//
//     const handleRemoveVariation = (id: number) => {
//         dispatch(removeVariation(id));
//     };
//
//     return (
//         <div>
//             <h2>Variações do Produto</h2>
//             <div>
//                 <input
//                     type="text"
//                     value={newVariation.name}
//                     onChange={handleVariationChange}
//                     placeholder="Nome da Variação"
//                 />
//                 <button onClick={handleAddVariation}>Adicionar Variação</button>
//             </div>
//             <ul>
//                 {variations.map(variation => (
//                     <li key={variation.id}>
//                         <input
//                             type="text"
//                             value={variation.name}
//                             onChange={(e) => handleUpdateVariation(variation.id, e.target.value)}
//                         />
//                         <button onClick={() => handleRemoveVariation(variation.id)}>Remover</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default ProductVariationsComponent;
