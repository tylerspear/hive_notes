const mongoose = require('mongoose')
const hiveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    inspections: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('HiveSchema', hiveSchema, 'hives')