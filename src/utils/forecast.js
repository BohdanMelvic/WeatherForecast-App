const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/29ada1c477715268aad9e2790bc1c2f7/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + FtoC(body.currently.temperature) + ' degress Celsius out. This high today is ' + FtoC(body.daily.data[0].temperatureHigh) + ' degress Celsius with a low of ' + FtoC(body.daily.data[0].temperatureLow) +' degress Celsius. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

const FtoC = t => Math.round( (t-32)*5/9 );

module.exports = forecast