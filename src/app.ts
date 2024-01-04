import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

import jokeRoutes from './routes/joke/jokeRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/jokes', jokeRoutes);

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
