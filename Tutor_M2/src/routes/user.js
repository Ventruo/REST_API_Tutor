/*
    File ini mendeklarasi endpoint apa saja yang dapat diakses
    oleh pengguna API. Tiap endpointnya terhubung dengan function
    yang akan dijalankan yang tersimpan pada directory 'controllers'.
*/

const express = require('express')
const router = express.Router()

/*
    Import method dari controller yang akan diexecute ketika endpoint 
    dihit oleh pengguna API
*/
const {
    addUser, 
    editUser,
    selectUser,
    deleteUser
} = require('../controllers/userController')

router.post('/', addUser)
router.put('/:user_id', editUser)
router.get('/:user_id?', selectUser)
router.delete('/:user_id', deleteUser)

//Jangan lupa export
module.exports = router