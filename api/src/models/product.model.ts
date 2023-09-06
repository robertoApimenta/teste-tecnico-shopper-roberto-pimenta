import { RowDataPacket } from 'mysql2';
import pool from './connection';

interface Product {
  code: number;
  sales_price: number;
}

interface ProductPack {
  codeProductPack: number;
  costPriceProductPack: number;
}

const findAll = async (): Promise<RowDataPacket[] | undefined> => {
  const [result] = await pool.execute<RowDataPacket[]>('SELECT * FROM products');
  return result;
};

const findPackByProductId = async (code: number): Promise<RowDataPacket[] | undefined> => {
  const [result] = await pool.execute<RowDataPacket[]>('SELECT * FROM packs WHERE product_id = ?',
    [code]);
  if (result && result.length > 0) {
    return result;
  } else {
    return undefined;
  }
};

const updateProduct = async (product: Product): Promise<RowDataPacket[] | undefined | true> => {
  //console.log(product.code, product.sales_price);
  await pool.execute<RowDataPacket[]>(
    `UPDATE products SET sales_price = ?
        WHERE code = ?`,
    [product.sales_price, product.code]);
  return true;
};

const updateProductPack = async (product: ProductPack): Promise<RowDataPacket[] | undefined | true> => {
  //console.log(product.code, product.sales_price);
  await pool.execute<RowDataPacket[]>(
    `UPDATE products SET cost_price = ?
        WHERE code = ?`,
    [product.costPriceProductPack, product.codeProductPack]);
  return true;
};

export default { findAll, findPackByProductId, updateProduct, updateProductPack };
