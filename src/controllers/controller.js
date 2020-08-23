import mongoose from 'mongoose'; 
import { ContactSchema } from '../models/model'

const Contact = mongoose.model('Contact', ContactSchema);
//CREATE
export const addNewContact = (req,res) => {
    let newContact = new Contact(req.body);

    newContact.save((err, contact) =>{
        if(err) {
            res.send(err);
        }
        res.json(contact);
    })
}
// RETRIEVE many
export const getContacts = (req,res) => {
    Contact.find({},(err, contact) =>{
        if(err) {
            res.send(err);
        }
        res.json(contact);
    });
}
// RETRIEVE One
export const getContactID = (req,res) => {
    Contact.findById(req.params.contactID,(err, contact) =>{
        if(err) {
            res.send(err);
        }
        res.json(contact);
    });
}
// UPDATE
export const updateContact = (req,res) => {
    Contact.findOneAndUpdate({ _id: req.params.contactID }, {new: true , useFindAndModify: false}, (err, contact) =>{
        if(err) {
            res.send(err);
        }
        res.json(contact);
    });
}

// DELETE