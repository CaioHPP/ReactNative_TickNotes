const mongoose = require('mongoose')

const dbConfig = 'mongodb+srv://luis:luis@cluster0.k0midl6.mongodb.net/?retryWrites=true&w=majority';


const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
});

module.exports = connection