import { Router } from 'express';
import multer from 'multer';

import { loadCsv } from './controllers/load.csv';
import { updateProducts } from './controllers/update.products';

export const router = Router();

router.post('/load-csv', multer().single('file'), loadCsv);
router.patch('/update-products', updateProducts);
