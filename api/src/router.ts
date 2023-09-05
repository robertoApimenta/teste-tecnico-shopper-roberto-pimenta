import { Router } from 'express';
import multer from 'multer';

import { loadCsv } from './controllers/load.csv';
import { validateCsv } from './controllers/validate.csv';

export const router = Router();

router.post('/load-csv', multer().single('file'), loadCsv);
router.post('/validate-csv', validateCsv);
