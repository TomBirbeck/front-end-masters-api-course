import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  req.hidden = 'hidden';
  next();
});

app.get('/', (req, res, next) => {
  setTimeout(() => {
    new Error('ouch');
  }, 1);
  next();
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((error, req, res, next) => {
  if (error.type === 'auth') {
    res.status(401).json({ message: 'unauthorised' });
  } else if (error.type === 'input') {
    res.status(400).json({ message: 'invalid input' });
  } else {
    res.status(500).json({ message: "oops, that's on us" });
  }
});

export default app;
