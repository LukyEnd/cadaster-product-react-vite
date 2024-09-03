import { InfoProductModel } from './product-info.model.ts'

export interface ProductFormComponentPropsModel {
  isEditMode?: boolean
  onClose?: () => void
  product?: InfoProductModel
}
