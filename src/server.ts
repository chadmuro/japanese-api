require('dotenv').config();
import express from 'express';
// const path = require('path');
import cors from 'cors';
import vocabularyRoutes from './routes/vocabularyRoutes';
import categoryRoutes from './routes/categoryRoutes';
import userRoutes from './routes/userRoutes';
import { authenticateToken } from './middleware/authenticateToken';

const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error: any) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

// app.use(express.static(path.join(__dirname, '/client/build')));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

const allowList = [
  'http://localhost:3000',
  'https://japanese-memory.netlify.app',
];

app.use(cors({ origin: allowList }));

app.use('/vocabulary', authenticateToken, vocabularyRoutes);
app.use('/category', authenticateToken, categoryRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
