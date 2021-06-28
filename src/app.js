
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geolocation')
const forcast = require('./utils/forcast')

const app = express()
app.set('view engine','hbs')
 const homepage = path.join(__dirname, '../public')
 const partials =  path.join(__dirname,'../src/views/partials')
 hbs.registerPartials(partials)
//app.use(express.static(homepage))
app.get( "",(req, res) => {
  res.render('index',{
    title: 'waheed',
    job: 'to load dynamic html'
  })
})



app.get('/about',(req,res) =>{
  res.render('about',{
    title: "about the site",
    name: "waheed"
  })
})

app.get('/help',(req,res) =>{
  res.render('help',{
    title: "search with your location to check recent weather",
  })
})




app.get('/weather',(req, res)=> {
  if (!req.query.address) {
    return res.send({error: "u must provide an addresss"})
  }
  geocode(req.query.address,(error,{lat,lon,location} = {})=>{
    if (error) {
      return res.send({error})
    }
    forcast(lat,lon,(error,forcastData)=>{
      if (error) {
        res.send({error})
      }
      res.send(
        {
          forcast : forcastData,
          location,
          address:req.query.address
        }
      )
    })
  })
})

app.get('/products',(req,res) => {
  if (!req.query.search) {
    return res.send({
      error: "u must provide search term"
    })
  }
  res.send({
    products: []
  })
})

app.get("*",(req,res) =>{
  res.render('error')
})

app.listen(3000)
 