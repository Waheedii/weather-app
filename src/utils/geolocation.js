const request = require('request')
const geocode = (location,callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoid2FoZWVkMjMiLCJhIjoiY2txYWw4dXd5MGFjaTJ3bzFkMHp4ZmMzbCJ9.wuml0tEotxJfvAJZYfG51A`
  request({url:url,json:true},(error,response) =>{
    if (error) {
      callback("unable to connect to service",undefined)
    } else if (response.body.features.length === 0) {
      callback("please provide a valid location",undefined)
    } else {
      callback(undefined,{
        lat:response.body.features[0].center[1],
        lon:response.body.features[0].center[0],
        location:response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode