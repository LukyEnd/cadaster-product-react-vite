import {InfoProductModel} from "./product-info.model.ts";

export interface ProductFormComponentPropsModel {
    isEditMode?: boolean;
    titleForComponent?: string;
    onClose?: () => void;
    product?: InfoProductModel;
}
