const songModel = require("../models/song.model")
const storageService = require("../services/storage.service")
const id3 = require("node-id3")


async function uploadSong(req, res){

    const songBuffer = req.file.buffer
    const { mood } = req.body

    const tags = id3.read(songBuffer)

    const [ songFile, posterFile ] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.image,
            filename: tags.title + ".jpeg",
            folder: "/moodify/posters"
        })
    ])

    const songs = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    res.status(201).json({
        message: "Song created successfully",
        songs
    })
}

module.exports = { uploadSong }