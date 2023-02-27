const { QueryTypes } = require('sequelize')
const w2Database = require('../databases/w2Connection')

/*
    Query ke database dilakukan dengan
    <Sequelize object>.query('query string', {
        replacements: {} / []
    })
    Query string akan diisi perintah SQL yang akan diexecute ke database,
    seperti SELECT, INSERT, UPDATE, dan DELETE.

    Perintah pada query string dapat menerima parameter dengan memberi ? 
    pada query string. Contoh:
    "select * from users where username = ?"
    kemudian mengisi replacements dengan array ['ini_username_yang_dicari']

    Selain memberi ?, argumen pada query string juga dapat diberikan dengan format
    :<nama_argumen>. Contoh: 
    "insert into users values (:user_id, :username, :age)"
    Kemudian mengisi replacements dengan {
        user_id: "US001",
        username: "Benjamaster",
        age: 20
    }
    Value pada replacements akan menggantikan placeholder dengan nama key yang sama
    pada query string.

    Satu lagi hal yang perlu diperhatikan, yaitu asynchronous.
    Berbagai operasi yang melibatkan akses atau insert ke database dilakukan secara asynchronous.
    Agar memahami konteks tsb, berikut merupakan contoh LOC:

    console.log('a')
    query select * from db
    print hasil query
    console.log('b')

    Console akan langsung melakukan print 'a' kemudian 'b' tanpa menunggu hasil dari DB,
    tidak seperti code execution seperti biasanya (synchronous) di mana console akan 
    melakukan print 'a', hasil query, kemudian 'b'.

    Oleh karena itu, PEMANGGILAN function yang melibatkan async operation perlu diberi 
    keyword 'await' agar mesin 'menunggu' hasil query DB terlebih dahulu sebelum 
    melanjutkan eksekusi kode. Contoh: await selectUsers()

    Sementara itu, DEKLARASI function yang melibatkan async operation perlu diberi
    keyword 'async'. Contoh: async function selectUsers()
*/

const addUser = async (req, res) =>{
    //Mendapatkan semua elemen yang ada pada request body
    let {username, age} = req.body
    if(await isDup(username))
        return res.status(400).send({
            'message': 'Username is already taken!'
        })

    let newIdPrefix = username.substring(0,2).toUpperCase()
    let keyword = `%${newIdPrefix}%`
    let similarUID = await w2Database.query(
        `select * from users where user_id like ?`,
        {
            type: QueryTypes.SELECT,
            replacements: [keyword]
        }
    )
    let newId = newIdPrefix + (similarUID.length+1).toString().padStart(3, '0')

    let [result, metadata] = await w2Database.query(
        `insert into users (user_id, username, age) values(:user_id, :username, :age)`,
        {
            replacements: {
                user_id: newId,
                username: username, 
                age: age
            }
        }
    )
    return res.status(201).send({
        'message': 'User successfully registered',
        'user_id': newId
    })
}

const editUser = async (req,res) => {
    let {user_id} = req.params
    let {age, acc_balance} = req.body

    if(!await userExist(user_id))
        return res.status(404).send({
            'message': 'User not found!'
        })

    let [result, metadata] = await w2Database.query(
        `update users set age = :age, acc_balance = acc_balance + :acc_balance where user_id = :user_id`,
        {
            replacements:{
                age: age,
                user_id: user_id,
                acc_balance: acc_balance
            }
        }
    )
    let updatedUser = await selectUserByID(user_id)
    console.log(updatedUser)
    return res.status(200).send({
        'message': 'User successfully updated',
        'user_id': user_id,
        'age': updatedUser.age,
        'acc_balance': toIdr(updatedUser.acc_balance)
    })
}

/*
    Endpoint [GET] /api/users memiliki dua fungsionalitas, yaitu:
     - mengembalikan detail 1 user apabila diberikan param
     - mengembalikan >1 user apabila diberikan query
*/
const selectUser = async (req,res) => {
    let {user_id} = req.params
    let {username} = req.query
    //Melakukan pengecekan apakah endpoint menerima param
    if(user_id){
        let user = await selectUserByID(user_id)
        if(!user)
            return res.status(404).send({
                'message': 'User not found'
            })
        else{
            user.acc_balance = toIdr(user.acc_balance)
            return res.status(200).send(user)
        }
    }
    //Jika tidak menerima param, berarti endpoint menerima query
    else{
        let keyword = `%${username}%`
        let [users, metadata] = await w2Database.query(
            `select * from users where username like ?`,
            {
                replacements: [keyword]
            }
        )
        //Melakukan loop for each dari data yang difetch dan memformat properti acc_balance nya
        users.forEach(user=>{
            user.acc_balance = toIdr(user.acc_balance)
        })
        return res.status(200).send(users)
    }
}

const deleteUser = async (req,res) => {
    let {user_id} = req.params
    if(await userExist(user_id)){
        let deleteUser = await w2Database.query(
            `delete from users where user_id = ?`,
            {
                replacements: [user_id]
            }
        )
        return res.status(200).send({
            'message': 'User successfully deleted'
        })
    }else{
        return res.status(404).send({
            'message': 'User does not exist'
        })
    }
}

/*
    Jangan lupa untuk export function2 yang akan dicall ketika endpoint dihit
*/
module.exports = {
    addUser, editUser, selectUser, deleteUser
}

/*
    Pembuatan helper function
    Helper function isDup() digunakan untuk mencari user dengan username yang sama.
    Sedangkan userExist() digunakan untuk mencari user dengan ID yang diminta.
    Function toIdr() digunakan untuk memformat int menjadi string dengan format "Rpxx.xxx"
*/
async function isDup(username){
    let dup = await w2Database.query(
        `select * from users where username = ?`,
        {
            type: QueryTypes.SELECT,
            replacements: [username]
        }
    )
    return dup.length > 0
}

async function userExist(userId){
    let select = await selectUserByID(userId)
    return !!select
}

/*
    Function ini digunakan untuk mencari user berdasarkan userId nya
    Function ini dipakai dengan asumsi user ID sudah terdaftar pada sistem
 */
async function selectUserByID(userId){
    let [user, metadata] = await w2Database.query(
        `select * from users where user_id = :user_id`,
        {
            replacements:{
                user_id: userId
            }
        }
    )
    return user[0]
}

/*
    Function js yang dapat dimanfaatkan untuk memformat sebuah int berformat string
    mata uang. Beberapa kode negara yang dapat digunakan seperti:
    en-US, ja-JP, ko-KR. Untuk info lebih lengkap, budayakan cek dokumentasi :)
 */
function toIdr(amount){
     return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(amount);
}