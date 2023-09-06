import { Request, Response } from 'express';

import productModel from '../models/product.model';

interface Product {
  product_code: number;
  new_price: number;
}

export const updateProducts = async (req: Request, res: Response) => {
  const dataUpdate = req.body;

  // atualiza sales_price com new_price na tabela products
  await Promise.all(dataUpdate.map(async (el: Product) => {
    // verifico se o produto faz parte de um pack
    const pack = await productModel.findPackByProductId(el.product_code);
    if (pack !== undefined) { // product code existe na tabela packs
      const codeProductPack = pack[0].pack_id; // Pego o código do produto pack
      const costPriceProductPack = pack[0].qty * el.new_price; // multiplico o preço pela quantidade
      await productModel.updateProductPack({ codeProductPack, costPriceProductPack });
    }
    // faço a alteração também no produto que não é pack
    const code = el.product_code;
    const sales_price = el.new_price;
    await productModel.updateProduct({ code, sales_price });
  }));

  return res.sendStatus(200);
};
