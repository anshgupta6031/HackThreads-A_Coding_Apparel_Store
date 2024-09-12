



const mongoose = require("mongoose")


const OrderSchema = new mongoose.Schema({         //  a schema is defined.......
    email: {
        type: String,
        required: true,
    },


    orderId: {
        type: String,
        required: true,
    },


    paymentInfo:{
        type: Object,
        default: {},
    },


    products: {
        type: Object,
        required: true,
    },


    address: {
        type: String,
        required: true,
    },


    city: {
        type: String,
        required: true,
    },


    state: {
        type: String,
        required: true,
    },


    pincode: {
        type: String,
        required: true,
    },


    phone: {
        type: String,
        required: true,
    },


    name: {
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


    deliveryStatus: {
        type: String,
        required: true,
        default: "unshipped",
    },

}, {                                         //  built-in data fields.....
    versionKey: false,
    timestamps: true,
})



mongoose.models = {}
module.exports = mongoose.model("Orders", OrderSchema)





