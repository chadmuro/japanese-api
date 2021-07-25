require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to database'));

const app = express();

app.use(express.json());

const vocabularyRouter = require('./routes/vocabulary');
app.use('/vocabulary', vocabularyRouter);

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
