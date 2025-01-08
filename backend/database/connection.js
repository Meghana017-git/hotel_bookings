

const mongoose = require('mongoose');

function RunServer(){
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDb Connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = RunServer;