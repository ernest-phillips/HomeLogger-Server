import mongoose from 'mongoose';  

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    }, 
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type:Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const ItemSchema = new Schema ({
    itemLoc:{
        type: String,
        required:`Info required.`
    },
    itemDesc:{
        type: String,
        required:`Info required.`
    },
    itemDate:{
        type: Date
    },
    itemPrice:{
        type: Number
    },
    itemValue:{
        type: Number
    },
    itemModel:{
        type: String,
        required:`Info required.`
    },
    itemSerial:{
        type: String
    },
    imgUrl:{
        type: String
    }
})