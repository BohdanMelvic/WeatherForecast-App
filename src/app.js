const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index.html');
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/weatherLocation', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    let coords = req.query.location.split('*');

    forecast(coords[0], coords[1], (error, forecastData) => {

        if (error) {
            return res.send({ error });
        }
        res.send({
            forecast: forecastData,
            location: 'Forecast for your current position:',
            address: 'Forecast for your current position:'
        });
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000.')
});