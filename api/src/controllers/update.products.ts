import { Request, Response } from 'express';

export const updateProducts = async (req: Request, res: Response) => {
  const dataUpdate = req.body;
  console.log(dataUpdate);
  return res.status(200).json(dataUpdate);
};
