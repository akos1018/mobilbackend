const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors())
app.use(express.json())
app.use(express.static(('kepek')))

app.get('/sorozat', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from sorozat INNER JOIN mufaj ON sorozat.sorozat_mufaj=mufaj.mufaj_id ORDER BY sorozat.sorozat_id', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })

  app.get('/film', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from filmek INNER JOIN film_mufajok ON filmek.film_mufaj=film_mufajok.mufaj_id ORDER BY filmek.film_id', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })
  
  app.get('/mufaj', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from mufaj ', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })

  app.get('/filmmufaj', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from film_mufajok ', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })


  app.post('/kommentek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from komment WHERE komment.komment_sorozat_id ='+req.body.bevitel3, function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })

  app.post('/filmkommentek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()

connection.query('SELECT * from film_komment WHERE film_komment.film_komment_film_id ='+req.body.bevitel3, function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})

connection.end()
    
  })

  app.post('/ajanlas', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()


connection.query( "INSERT INTO ajanlas VALUES (NULL, '"+req.body.bevitel1+"')",function (err, rows, fields) {
    if (err) throw err

    res.send("Sikerült")
    console.log("Sikerült")
})

connection.end()

  })

  app.post('/kommentfelvitel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()



connection.query( "INSERT INTO komment VALUES (NULL, '"+req.body.bevitel1+"', '"+req.body.bevitel2+"', '"+req.body.bevitel3+"');",function (err, rows, fields) {
    if (err) throw err

    res.send("Sikerült")
    console.log("Sikerült")
})

connection.end()

  })

  app.post('/filmkommentfelvitel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()



connection.query( "INSERT INTO film_komment VALUES (NULL, '"+req.body.bevitel1+"', '"+req.body.bevitel2+"', '"+req.body.bevitel3+"');",function (err, rows, fields) {
    if (err) throw err

    res.send("Sikerült")
    console.log("Sikerült")
})

connection.end()

  })


  app.post('/kereses', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz='SELECT * from sorozat INNER JOIN mufaj ON sorozat.sorozat_mufaj=mufaj.mufaj_id WHERE sorozat.sorozat_cim like "%'+req.body.bevitel1+'%"';
    connection.query(sz, function (err, rows, fields) {
  if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  
  connection.end()
  })

  app.post('/filmkereses', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz='SELECT * from filmek INNER JOIN film_mufajok ON filmek.film_mufaj=film_mufajok.mufaj_id WHERE filmek.film_cim like "%'+req.body.bevitel1+'%"';
    connection.query(sz, function (err, rows, fields) {
  if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  
  connection.end()
  })
  
  
  app.post('/sorozatszures', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT * from sorozat INNER JOIN mufaj ON sorozat.sorozat_mufaj=mufaj.mufaj_id WHERE sorozat.sorozat_mufaj ='+ req.body.bevitel2, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  app.post('/evszures', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz='SELECT * from sorozat INNER JOIN mufaj ON sorozat.sorozat_mufaj=mufaj.mufaj_id WHERE sorozat.sorozat_ev LIKE "%'+req.body.bevitel1+'%"';
    connection.query(sz, function (err, rows, fields) {
  if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  
  connection.end()
  })

  app.post('/filmszures', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT * from filmek INNER JOIN film_mufajok ON filmek.film_mufaj=film_mufajok.mufaj_id WHERE filmek.film_mufaj ='+ req.body.bevitel2, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })
  
  
  app.post('/sorozatkep', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT sorozat.sorozat_kep from sorozat WHERE sorozat.sorozat_id ='+req.body.bevitel3, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })
  
  app.post('/filmkep', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT filmek.film_kep from filmek WHERE filmek.film_id ='+req.body.bevitel3, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  app.post('/ertekeles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()


connection.query( "INSERT INTO ertekeles VALUES (NULL, '"+req.body.bevitel1+"','"+req.body.bevitel2+"')",function (err, rows, fields) {
    if (err) throw err

    res.send("siker")
    console.log("Siker")
})

connection.end()

  })

  app.post('/filmertekeles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
})

connection.connect()


connection.query( "INSERT INTO film_ertekeles VALUES (NULL, '"+req.body.bevitel1+"','"+req.body.bevitel2+"')",function (err, rows, fields) {
    if (err) throw err

    res.send("siker")
    console.log("Siker")
})

connection.end()

  })

  app.post('/atlagertek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT  ROUND(AVG(ertekeles.ertekeles_ertek),2) AS atlag FROM ertekeles WHERE ertekeles.ertekeles_sorozat_id ='+req.body.bevitel3, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  app.post('/filmatlagertek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  
  connection.query('SELECT ROUND(AVG(film_ertekeles.film_ertekeles_ertek),2) AS atlag FROM film_ertekeles WHERE film_ertekeles.film_ertekeles_film_id ='+req.body.bevitel3, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })
  




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})