const request = require('request');

const forcast = (lat,lon,callback) => {
  const url =`http://api.weatherstack.com/current?access_key=52fc627e4b4f6d4f8e361fb8c3ac2886&query=${lat},${lon}`
  request({url: url,json:true},(error, response)=>{
    if(error) {
      callback("unable to connect to service", undefined)
    } else if (response.body.error) {
      callback("unable to find location")
    } else {
      callback(undefined,{
        temperature: response.body.current.temperature,
        "chamces of rain": response.body.current.precip
      })
    }
  })
}

module.exports = forcast