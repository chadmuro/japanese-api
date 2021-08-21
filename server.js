require('dotenv').config();
const express = require('express');
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

app.use('/vocabulary', vocabularyRoutes);
app.use('/category', categoryRoutes);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
