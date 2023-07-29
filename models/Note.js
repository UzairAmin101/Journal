require('dotenv').config();
const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');

// Note Schema
const NoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: String
})

NoteSchema.plugin(encrypt, {secret:process.env.SECRET, encryptedFields:['content', 'title']})

// Note Model
const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;