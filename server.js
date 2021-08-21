require('dotenv').config();
const express = require('express');
const cors = require('cors');
const vocabularyRoutes = require('./routes/vocabularyRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

const allowList = [
	'http://localhost:3000',
	'https://japanese-for-developers.netlify.app',
];

app.use(cors({ origin: allowList }));

app.use('/vocabulary', vocabularyRoutes);
app.use('/category', categoryRoutes);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
