const mongoose = require('mongoose');
const { Schema } = mongoose;

const weatherSchema = new Schema({
    weather : {
        type: String
    },
    userBy : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
});

module.exports = mongoose.model('weather', weatherSchema)