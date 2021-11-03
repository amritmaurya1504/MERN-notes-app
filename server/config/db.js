const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()


const connectMongo = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected`)
    } catch (err){
        console.log(err);
    }
}

module.exports = connectMongo;


