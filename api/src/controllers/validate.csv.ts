import { Request, Response } from 'express';

import productModel from '../models/product.model';

interface CsvData {
  product_code: number;
  new_price: number;
}

interface Product {
  code: number;
  name: string;
  cost_price: string;
  sales_price: string;
}

export const validateCsv = async (req: Request, res: Response) => {
  const dataCsv: CsvData[] = req.body;
  const result = await productModel.findAll();

  // Use uma assertiva de tipo para informar ao TypeScript o tipo esperado
  const products = result as Product[];

  console.log(products);

  const dataCsvValidate: { product_code: number; new_price: number; messages: string[] }[] = [];

  dataCsv.forEach((el) => {
    const messages: string[] = [];

    if (el.product_code === null || el.product_code === undefined) {
      messages.push('\'product_code\' é obrigatório');
    } else if (!Number.isInteger(el.product_code)) {
      messages.push('\'product_code\' precisa ser do tipo inteiro');
    } else {
      // Utilize o método some para verificar se o product_code existe na lista de produtos
      const productCodeExists = products.some((product) => product.code === el.product_code);
      if (!productCodeExists) {
        messages.push('\'product_code\' não existe na lista de produtos');
      }
    }

    if (el.new_price === null || el.new_price === undefined) {
      messages.push('\'new_price\' é obrigatório');
    } else if (typeof el.new_price !== 'number' || Number.isNaN(el.new_price)) {
      messages.push('\'new_price\' precisa ser do tipo número');
    }

    // Crie um novo objeto com mensagens de validação
    const validatedObject = { ...el, messages };

    // Adicione o objeto validado ao array de validação
    dataCsvValidate.push(validatedObject);
  });

  return res.status(200).json(dataCsvValidate);
};
