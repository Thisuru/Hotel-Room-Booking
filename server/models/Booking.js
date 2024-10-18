const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BookingSchema = new Schema({
    checkIn: {
        type: Date,
        required: false,
    },
    checkOut: {
        type: Date,
        required: false,
    },
    noOfGuest: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Booking", BookingSchema)