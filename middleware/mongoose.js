



const mongoose = require("mongoose")


const connectToMongo = () => {
    if (mongoose.connections[0].readyState) {                   // If the connection already exists
        return;
    }

    mongoose.connect(process.env.mongo_URI)                  //  connecting with mongodb database.....
    const db = mongoose.connection                      //  now, object db will wait for the connection event....


    db.once("open", () => {                                   //  executes the callback if the connection event gives "open".
        console.log("YaY!!!, Successfully connected to mongoDB.")
    })


    db.on("error", () => {                                   //  executes the callback if the connection event gives "error".
        console.log("Error while connecting to mongoDB.")
    })
}



module.exports = connectToMongo



