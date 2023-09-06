import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { router } from './router';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
