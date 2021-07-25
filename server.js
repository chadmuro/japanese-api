require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to database'));

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const vocabularyRouter = require('./routes/vocabulary');
app.use('/vocabulary', vocabularyRouter);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
