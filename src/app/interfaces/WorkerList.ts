import { Product } from './Product';

interface ProductRow {
  product: string;
  count: number;
  ready: boolean;
  productObj: Product;
}

export interface WorkerList {
  wlID: string;
  wID: string;
  products: ProductRow[];
}
