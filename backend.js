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

//-----------------------------------------------SOROZATOK LEKÉRDEZÉSE
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
//-----------------------------------------------FILMEK LEKÉRDEZÉSE
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

//-----------------------------------------------SOROZAT MŰFAJOK LEKÉRDEZÉSE
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
//-----------------------------------------------FILM LEKÉRDEZÉSE
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

//-----------------------------------------------SOROZAT KOMMENTEK LEKÉRDEZÉSE
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
//-----------------------------------------------FILM KOMMENTEK LEKÉRDEZÉSE
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
//-----------------------------------------------AJÁNLÁS LEKÉRDEZÉSE
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

//-----------------------------------------------SOROZAT KOMMENT FELVITEL 
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

//-----------------------------------------------FILM KOMMENTEK FELVITELE 
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

//-----------------------------------------------KERESÉS SOROZATOK KÖZÖTT 
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

//-----------------------------------------------KERESÉS FILMEK KÖZÖTT
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
  

//-----------------------------------------------SOROZATOK MŰFAJ SZŰRÉSE
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


//-----------------------------------------------ÉV SZERINTI SZŰRÉS (NEM HASZNÁLT JELENLEG)
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

  //-----------------------------------------------FILMEK MŰFAJ SZERINTI SZŰRÉSE 
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
  
  
//-----------------------------------------------SOROZAT KÉPEK LEKÉRDEZÉSE
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
  

//-----------------------------------------------FILM KÉPEK LEKÉRDEZÉSE
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

  //-----------------------------------------------SOROZATOK ÉRTÉKELÉSE
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

  //-----------------------------------------------FILMEK ÉRTÉKELÉSE
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


  //-----------------------------------------------SOROZATOK ÁTLAGÉRTÉKE
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


  //-----------------------------------------------FILMEK ÁTLAGÉRTÉKE
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

  //-----------------------------------------------TOP 5 FILM
  app.get('/legjobbfilmek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz = 'SELECT  * ,AVG(film_ertekeles.film_ertekeles_ertek) AS atlag FROM film_ertekeles INNER JOIN filmek ON filmek.film_id=film_ertekeles.film_ertekeles_film_id INNER JOIN film_mufajok ON filmek.film_mufaj = film_mufajok.mufaj_id GROUP BY filmek.film_cim ORDER BY (atlag)  DESC LIMIT 5;';
  connection.query(sz, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

  
//-----------------------------------------------TOP 5 SOROZAT

  app.get('/legjobbsorozatok', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz = 'SELECT * ,AVG(ertekeles.ertekeles_ertek) AS atlag FROM ertekeles INNER JOIN sorozat ON sorozat.sorozat_id=ertekeles.ertekeles_sorozat_id INNER JOIN mufaj ON mufaj.mufaj_id = sorozat.sorozat_mufaj WHERE ertekeles.ertekeles_sorozat_id GROUP BY sorozat.sorozat_cim ORDER BY (atlag)  DESC LIMIT 5';
  connection.query(sz, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })

//-----------------------------------------------TOP 5 LEGUJABB FILM
  
  app.get('/legfrissebbfilmek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz = 'SELECT  * FROM filmek INNER JOIN film_mufajok ON filmek.film_mufaj = film_mufajok.mufaj_id ORDER BY filmek.film_ev DESC LIMIT 5 ';
  connection.query(sz, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })
  
//-----------------------------------------------TOP 5 LEGUJABB SOROZAT

  app.get('/legfrissebbsorozatok', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsgamunka'
  })
  
  connection.connect()
  let sz = 'SELECT  * FROM sorozat INNER JOIN mufaj ON mufaj.mufaj_id = sorozat.sorozat_mufaj ORDER BY sorozat.sorozat_ev DESC LIMIT 5 ';
  connection.query(sz, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)
    
    res.send(rows)
  })
  
  connection.end()
  })




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})