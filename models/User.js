



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


    address: {
        type: String,
        default: '',
    },

    
    pincode: {
        type: String,
        default: '',
    },

    
    phone: {
        type: String,
        default: '',
    },

}, {                                         //  built-in data fields.....
    versionKey: false,
    timestamps: true,
})



mongoose.models = {}
module.exports = mongoose.model("Users", UserSchema)





