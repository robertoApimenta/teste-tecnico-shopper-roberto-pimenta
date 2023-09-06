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

export const validateCsv = async (dataCsv: CsvData[]) => {
  const result = await productModel.findAll();

  const products = result as Product[];

  const dataCsvValidate: {
    product_code: number;
    new_price: number;
    name: string;
    cost_price: number;
    sales_price: number;
    messages: string[];
  }[] = [];

  dataCsv.forEach((el) => {
    const messages: string[] = [];
    let product: Product | undefined;

    if (el.product_code === null || el.product_code === undefined) {
      messages.push('\'product_code\' é obrigatório');
    } else if (!Number.isInteger(el.product_code)) {
      messages.push('\'product_code\' precisa ser do tipo inteiro');
    } else {
      product = products.find((p) => p.code === el.product_code);
      if (!product) {
        messages.push('\'product_code\' não existe na lista de produtos');
      }
    }
    const upperLimit = Number(product?.sales_price) + (0.10 * Number(product?.sales_price)); // Limite superior
    const lowerLimit = Number(product?.sales_price) - (0.10 * Number(product?.sales_price)); // Limite inferior

    if (el.new_price === null || el.new_price === undefined) {
      messages.push('\'new_price\' é obrigatório');
    } else if (typeof el.new_price !== 'number' || Number.isNaN(el.new_price)) {
      messages.push('\'new_price\' precisa ser do tipo número');
    } else if (el.new_price > upperLimit) {
      messages.push(`O novo preço não pode ser maior que 10% do preço atual. Valor máximo: R$ ${upperLimit.toFixed(2)}`);
    } if (el.new_price < lowerLimit) {
      messages.push(`O novo preço não pode ser menor que 10% do preço atual. Valor mínimo: R$ ${lowerLimit.toFixed(2)}`);
    }

    const validatedObject = {
      ...el,
      name: String(product?.name || ''),
      cost_price: Number(product?.cost_price || ''),
      sales_price: Number(product?.sales_price || ''),
      messages,
    };

    dataCsvValidate.push(validatedObject);
  });

  return dataCsvValidate;
};
