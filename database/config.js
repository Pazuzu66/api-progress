const mongoose = require('mongoose');


const dbConection = async() => {
    try {
        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to Database');
    } catch (error) {
        throw new Error('Error to try Connect to Database')
        console.log(error);
    }
}

module.exports = {
    dbConection
};



