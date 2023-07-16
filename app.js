const express = require('express');
const mongoose = require('mongoose');
const Store = require('./models/store');
const store_data = require('./utils/scrape');

const app = express();

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/location-validator';
const PORT = process.env.PORT || 3000;

app.get('/load-data-into-DB', async (req, res) => {
    try {
        const data = await store_data();
        // console.log(data.data)
        await Store.insertMany(data.data);
        res.json({
            success: true,
            message: 'Store data successfully scraped from site and stored into database.'
        });
    } catch(e) {
        // console.log(e);
        res.json({
            success: false,
            message: 'Internal Error!'
        });
    }
});

app.get('/results', async (req, res) => {
    //validate store locations
});

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
});