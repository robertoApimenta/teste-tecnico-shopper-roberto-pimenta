import { Request, Response } from 'express';

export const loadCsv = async (req: Request, res: Response) => {
  const file = req.file;

  if (file) {
    if (!file.originalname.endsWith('.csv')) {
      return res.status(400).json({ message: 'Invalid extension' });
    }
    const rows = file.buffer.toString('utf-8').split('\n');
    rows.shift();
    const dataCsv = rows.map(el => {
      const row = el.split(',');
      const dat = {
        product_code: +row[0],
        new_price: +row[1],
      };
      return dat;
    });
    return res.status(200).json(dataCsv);
  }

  return res.status(400).json({ message: 'Empty file' });
};
