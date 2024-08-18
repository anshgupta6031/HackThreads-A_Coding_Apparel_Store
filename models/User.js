



const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({         //  a schema is defined.......
    name: {
        type: String,
        required: true,
    },


    email: {
        type: String,
        required: true,
        unique: true,
    },


    password: {
        type: String,
        required: true,
    },

}, {                                         //  built-in data fields.....
    versionKey: false,
    timestamps: true,
})



module.exports = mongoose.model("Users", UserSchema)





