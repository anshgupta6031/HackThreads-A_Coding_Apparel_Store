



const mongoose = require("mongoose")


const ProductSchema = new mongoose.Schema({         //  a schema is defined.......
    title: {
        type: String,
        required: true,
    },


    slug: {
        type: String,
        required: true,
        unique: true,
    },


    description: {
        type: String,
        required: true,
    },


    img: {
        type: String,
        required: true,
    },


    category: {
        type: String,
        required: true,
    },


    size: {
        type: String,
    },


    color: {
        type: String,
    },


    price: {
        type: Number,
        required: true,
    },


    availableQty: {
        type: Number,
        required: true,
    },

}, {                                         //  built-in data fields.....
    versionKey: false,
    timestamps: true,
})


mongoose.models = {}
module.exports = mongoose.model("Products", ProductSchema)





