/**
 * Intro  
 * Node.js adalah perangkat lunak yang bersifat open source dan digunakan untuk menjalankan kode JavaScript diluar web browser, 
 * Node.js sama seperti PHP, Ruby, Python dan Go, yaitu berjalan disisi server. 
 * Node.js secara default sudah memiliki HTTP server sendiri, jadi bisa berjalan tanpa harus menginstall web server tambahan seperti Apache dan Nginx.
 * 
 * Express Js adalah salah satu framework Node.js yang paling populer dan banyak digunakan oleh para developer, 
 * karena memiliki ukuran yang minimalis dan performa yang sangat cepat . 
 * Express bersifat open source dan mudah untuk di pelajari.
 * 
 * Install node.js di : https://nodejs.org/en/download/.
 * Cek instalasi node.js pada komputer anda menggunakan perintah : node -v & npm -v
 * 
 */

/**
 * Module dependencies 
 */
const express = require("express");

const books = require("./routes/books");

const app = express();
app.set("port", 3000);
/**
 * express.json() => middleware untuk parsing data application/json
 * express.urlencoded(...) => middleware untuk parsing data application/x-www-form-urlencoded
 **/
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Routes

// simple route
app.get("/", (req, res) => {
    console.log(req.body);
    // console.log(req.query);
    res.status(200).send("Hello World!");
    /**
     * res.status(...) => status code
     * 2XX : success
     * 4XX : client error
     * 5XX : server error
     * res.send(...) => send response
     * res.json(...) => send json response
     */
});

// Structured route
app.use("/books", books);

app.listen(app.get("port"), () => {
    console.log(`Server started at http://localhost:${app.get("port")}`);
});

module.exports = app;