const express = require("express")
const app = express()
app.set("port", 3000)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let users = [
    {
        id: 1,
        name: "Budi",
        saldo: 10000,
    },
    {
        id: 2,
        name: "Wati",
        saldo: 50000,
    },
    {
        id: 3,
        name: "Joko",
        saldo: 35000,
    }
]

let services = [
    {
        id: 1,
        name: "Spotify",
        free_limit: 5,
        saldo_charge: 2000
    },
    {
        id: 2,
        name: "Youtube",
        free_limit: 10,
        saldo_charge: 10000
    },
    {
        id: 3,
        name: "Instagram",
        free_limit: 15,
        saldo_charge: 20000
    }
]

let users_services = [
    {
        id_user: 1,
        id_service: 1,
        api_hit: 0
    }
]

// tampilkan data user tertentu
app.get("/api/users/:id", (req, res) => {
    return res.status(200).send(users.find((user) => user.id == req.params.id))
})

// tampilkan data service tertentu
app.get("/api/services/:id", (req, res) => {
    return res.status(200).send(services.find((service) => service.id == req.params.id))
})

app.post("/api/services/:id", (req, res) => {
    // cari index user yang mengakses endpoint ini
    let user_index = users.findIndex((user) => user.id == req.body.id_user)
    // cari index service yang diakses pada endpoint ini
    let service_index = services.findIndex((service) => service.id == req.params.id)
    // cari apakah ada atau tidak data index user dengan service yang diakses
    let user_with_service_index = users_services.findIndex((user_service) => user_service.id_user == req.body.id_user && user_service.id_service == req.params.id)
    // apabila ada data indexnya
    if(user_with_service_index > -1) {
        // cek api_hit masih dibawah free limit
        if(users_services[user_with_service_index].api_hit < services[service_index].free_limit) {
            users_services[user_with_service_index].api_hit+=1
            msg = "api hit sekarang : " + users_services[user_with_service_index].api_hit + " dengan limit : " + services[service_index].free_limit
        }
        // apabila api_hit == free_limit maka ketika mengakses endpoint ini dengan service tersebut akan dikenakan biaya dengan mengurangi saldo milik user sejumlah saldo_charge masing-masing service
        // cek saldo user minimal sesuai dengan saldo_charge, apabila masih bisa membayar maka user dapat mengakses endpoint ini
        else if(users[user_index].saldo-services[service_index].saldo_charge > 0) {
            users_services[user_with_service_index].api_hit+=1
            users[user_index].saldo-=services[service_index].saldo_charge
            msg = "api hit terkena limit, saldo sekarang : " + users[user_index].saldo
        }
        // api_hit == free_limit dan saldo tidak dapat mencukupi saldo_charge
        else {
            msg = "gagal akses endpoint ini, saldo tidak mencukupi"
        }
    }
    // apabila tidak ada data indexnya, push ke array users_services dengan api_hit = 1
    else {
        users_services.push({id_user: req.body.id_user, id_service: req.params.id, api_hit: 1})
        msg = "api hit sekarang : 1"
    }

    return res.status(200).send({message: msg})
})

// tampilkan data user-service
app.get("/api/user-service/:id_user/:id_service", (req, res) => {
    return res.status(200).send(users_services.find((user_service) => user_service.id_user == req.params.id_user && user_service.id_service == req.params.id_service))
})

app.listen(app.get("port"), () => {
    console.log(`Server started at http://localhost:${app.get("port")}`);
})