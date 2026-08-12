const mongoose = require("mongoose")
const { type } = require("../config/cache")

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        require: true,
    },
    posterUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        require: true,
    },
    mood: {
        type: String,
        enum: {
            values: ["sad", "happy", "surprised"],
            message: "Enum this is"
        }
    }
})

const songModel = mongoose.model("songs", songSchema)

module.exports = songModel