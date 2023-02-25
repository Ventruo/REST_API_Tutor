const express = require("express")
const Joi = require('joi').extend(require('@joi/date'))
const router = express.Router()

// JOI adalah lib validator dari JS
// Dokumentasi lengkap 
// https://joi.dev/api/?v=17.8.1

let students = []

// Tampilkan semua students
router.get("/", (req, res) => {
    return res.status(200).send(students)
})

const checkUniqueNIK = (nik) => { 
    if(students.length > 0) {
        const s = students.find(student => {
            return student.nik === nik 
        })
        if (s !== undefined) {
            throw new Error("nik is not unique")
        }
    }
}

// menambahkan student
router.post("/", async (req, res) => {
    // buat object dari Joi dengan Joi.object()
    // parameternya berisi object dengan key berupa nama field yang ingin diberikan validasi dan valuenya berupa jenis validasi yang ingin diberikan
    const schema = Joi.object({
        // validasi NIK dengan custom validation (membuat function terpisah), bisa digunakan apabila butuh validasi ke database atau yang lainnya
        nik: Joi.string().external(checkUniqueNIK),
        // validasi untuk email
        email: Joi.string().email().required(),
        //validasi untuk jumlah digit nomor telepon dengan tambahan regex
        phone_number: Joi.string().min(5).max(8).pattern(/^[0-9]+$/),
        //validasi untuk tinggi badan dengan angka
        height: Joi.number().min(100).max(200),
        // validasi tanggal lahir berupa tanggal/bulan/tahun
        // untuk menggunakan validasi date().format() harus install @joi/date
        birth_date : Joi.date().format('DD/MM/YYYY'),
        // validasi jenis kelamin hanya boleh F (Female) atau M (Male)
        sex: Joi.string().valid('F', 'M').required()
    })

    // NB : hati-hati untuk penggunaan min() max() , kalau di depannya ada string(), dianggap length nya, kalau ada number() dianggap valuenya

    // mulai validasi untuk semua data dari req.body
    // hati-hati, apabila ada field lain di req.body selain yang ada di object schema, Joi akan mengeluarkan error bahwa field tersebut tidak boleh ada
    try {
        await schema.validateAsync(req.body)
    } catch (error) {
        return res.status(403).send(error.toString())
    }

    let student = {
        ...req.body
    }
    students.push(student)
    console.log(students)

    return res.status(201).send(student)
})

module.exports = router