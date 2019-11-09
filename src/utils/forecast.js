const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/29ada1c477715268aad9e2790bc1c2f7/' + latitude + ',' + longitude
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + FtoC(body.currently.temperature) + 
            ' degress Celsius out. <br> There is a ' 
            + body.currently.precipProbability + '% chance of rain. <br> Wind speed: ' + Math.round(body.currently.windSpeed )+ ' mph. <br>  Pressure: ' +
            Math.round(body.currently.pressure) + ' hPa. <br> Visibility: ' + Math.round(body.currently.visibility) + ' mi. <br> ' + body.daily.data[0].summary);
        }
    })
}

const FtoC = t => Math.round( (t-32)*5/9 );

module.exports = forecast