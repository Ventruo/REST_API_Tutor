/*
    Authentication merupakan cara bagi program untuk mengetahui siapa yang sedang mengakses endpointnya.
    Cara yang paling sering digunakan adalah dengan mengirimkan JWT beserta dengan request.
    JWT: JSON Web Token
    Sesuai dengan namanya, token JWT dibuat dari object (JSON) yang diencode menjadi sebuah string.
    Dari JWT ini, program dapat mengetahui siapa yang sedang mengirimkan request.
    Informasi mengenai JWT bisa dibaca lebih lanjut di buku praktikum atau di internet, di sini hanya menjelaskan
    cara membuat dan membaca :)
*/

const express = require("express")
const app = express()
app.set("port", 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const { getDB } = require("./conn");
const sequelize = getDB();
const {QueryTypes} = require('sequelize');

//Untuk membuat JWT, pastikan sudah menulis require('jsonwebtoken')
const jwt = require("jsonwebtoken");
//Deklarasi JWT Key
const JWT_KEY = 'KimMinJi'

app.post('/api/users', async function(req,res){
    let {nrp, name, password, role} = req.body
    let ins = await sequelize.query(
        `insert into users values (?, ?, ?, ?)`,
        {
            replacements: [
                nrp, name, password, role
            ]
        }
    )
    return res.status(201).send({
        nrp: nrp,
        name: name,
        role: role
    })
})

app.post('/api/login', async function(req,res){
    let {nrp, password} = req.body
    let sel = await sequelize.query(
        `select * from users where nrp=? AND password=?`,
        {
            replacements:[
                nrp, password
            ],
            type: QueryTypes.SELECT 
        }
    )
    if (sel.length == 0)
        return res.status(400).send({
            message: 'Invalid credential'
        })
    
    //Membuat JWT Token
    /*
        Membuat JWT token dilakukan dengan method jwt.sign()
        Method ini dapat menerima 3 parameter: (payload, secret key, durasi berlakunya token)
        Payload biasanya berupa objek yang berisi informasi dari user yang diperlukan program untuk menentukan
        dari siapa sebuah request dikirim. Biasanya berupa ID dan role. Anda bisa memasukkan
        informasi lain seperti name, email, phone number, dll. Namun hal seperti ini biasanya sudah
        bisa didapatkan hanya dengan ID jadi tidak perlu dipassingkan.
        Secret Key merupakan serangkaian karakter untuk melakukan verifikasi konten payload.
        Secret Key biasanya diberikan oleh pemilik API atau service. Apabila JWT Token dengan secret key 
        yang tidak sesuai dengan secret key yang diexpect oleh endpoint, maka autentikasi gagal dilakukan.
    */
    let token = jwt.sign({
        nrp: nrp,
        role: sel[0].role
    }, JWT_KEY, {expiresIn: '3600s'})
    return res.status(200).send({
        'message': 'Successfully logged in',
        nrp: nrp,
        token: token
    })
})

app.get('/api/asisten-endpoint', async function(req,res){
    /*
        Authentication token biasanya dikirim pada header request
        Header request difetch dengan req.header(<header_key>)
    */
    let token = req.header('x-auth-token')
    if(!req.header('x-auth-token')){
        /*
            Apabila header 'x-auth-token' tidak ada, berarti request dilakukan 
            tanpa mengirimkan JWT Token. Oleh karena itu, kirimkan pesan error
        */
        return res.status(400).send('Authentication token is missing')
    }
    /*
        Verifikasi JWT Token dilakukan dengan jwt.verify()
        .verify() menerima dua parameter, yaitu token string dan secret key
        Verifikasi dilakukan dalam scope try{}catch{} agar ketika verifikasi
        gagal, program API tidak crash
    */
    try{
        let userdata = jwt.verify(token, JWT_KEY)
        /*
            Verifikasi role untuk mengetahui role dari pengakses
        */
        if(userdata.role == 'AST')
            return res.status(200).send({
                message: 'Anda Asisten. Boleh Masuk'
            })
        else
            return res.status(400).send({
                message: 'Anda Bukan Asisten. Hayo ngapain 🤨'
            })
    }catch(err){
        return res.status(400).send('Invalid JWT Key')
    }
})

app.listen(app.get("port"), () => {
    console.log(`Server started at http://localhost:${app.get("port")}`)
})

module.exports = app