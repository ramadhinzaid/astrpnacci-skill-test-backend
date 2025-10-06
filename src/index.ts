import express, { Express, Request, Response } from 'express';
import userRoutes from './api/user.routes';
import authRoutes from './api/auth.routes';

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});