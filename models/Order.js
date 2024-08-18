



const mongoose = require("mongoose")


const OrderSchema = new mongoose.Schema({         //  a schema is defined.......
    userId: {
        type: String,
        required: true,
    },


    products: [{
        productId: {
            type: String,
        },

        quantity: {
            type: Number,
            default: 1,
        }
    }],


    address: {
        type: String,
        required: true,
    },


    amount: {
        type: Number,
        required: true,
    },


    status: {
        type: String,
        required: true,
        default: "Pending",
    },

}, {                                         //  built-in data fields.....
    versionKey: false,
    timestamps: true,
})



mongoose.models = {}
module.exports = mongoose.model("Orders", OrderSchema)





