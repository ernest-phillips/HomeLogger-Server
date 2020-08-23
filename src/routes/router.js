import {addNewContact,
    getContacts, 
    getContactID
} from '../controllers/controller'

const routes = (app) => {
  app.route(`/contact`)
        .get((req, res, next) => {
            // middleware
            console.log(`request from: ${req.originalURL}`)
            console.log(`Request type: ${req.method}`)
            next();
        }, getContacts)

        .post(addNewContact)

    app.route('/contact/:contactID')
        .get(getContactID)

        .put((req, res) => 
        res.send("PUT request successful!"))

        .delete((req, res) => 
        res.send("DELETE request successful!"));
    
};

export default routes;