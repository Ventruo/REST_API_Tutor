const express = require("express");
const axios = require("axios");
const router = express.Router();

// Tutor ini akan menggunakan Genius API
// Silahkan register account baru di Genius http://genius.com/api-clients
// Generatelah dan simpan Client Access Token

// Rute search untuk mencari dari API Genius
router.get("/search", async (req, res) => {
    // Ambil Query dari Request
    let title = req.query.title;
    let token = req.query.token;

    // Gunakan access token tadi untuk memanggil api nya
    let querySearch = `https://api.genius.com/search?access_token=${token}&q=${title}`;
    let getdata = await axios.get(querySearch);

    let hasil = getdata.data.response.hits;
    console.log(hasil);

    let result = [];
    hasil.forEach(item => {
        let song = {
            title: item.result.title,
            artist: item.result.artist_names,
            id: item.result.id
        };
        result.push(song);
    });

    return res.status(getdata.status).send(result);
});

// Rute mengambil detail lagu menggunakan parameter id lagu
router.get("/", async (req, res) => {
    // Ambil Query dari Request
    let id = req.query.id;
    let token = req.query.token;

    let querySearch = `https://api.genius.com/songs/${id}?access_token=${token}`;
    let getdata = await axios.get(querySearch);

    console.log(getdata.data);
    let hasil = getdata.data.response.song;

    return res.status(getdata.status).send({
        "id": hasil.id,
        "title": hasil.title,
        "artist": hasil.artist_names,
        "release date": hasil.release_date
    });
});

module.exports = router;