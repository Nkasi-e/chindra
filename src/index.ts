import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRouter from './routes/auth.router';
import profileRouter from './routes/profile.router';
import { errorHandler } from './middleware';

const app: Application = express();

const PORT: number | string = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use('/api/', authRouter);
app.use('/api/', profileRouter);

app.get('/', (req: Request, res: Response): void => {
  res.send('Welcome to typescript express!');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404);
  res.send({
    status: 'fail',
    message: `Page not found`,
  });
});

app.listen(PORT, (): void => {
  console.log('SERVER IS UP ON PORT:', PORT);
});
