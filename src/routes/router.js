const routes = (app) => {
  app.router(`/contact`)
        .get((req, res) => 
        res.send("GET request successful!"))

        .post((req, res) => 
        res.send("POST request successful!"))

    app.router('/contact/:contactID')
        .put((req, res) => 
        res.send("PUT request successful!"));

        .delete((req, res) => 
        res.send("DELETE request successful!"));
};
