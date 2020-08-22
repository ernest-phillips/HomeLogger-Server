import express from 'express' ;
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/router';

const app = express();
const PORT = 4000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/CRMdb`, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

// bodyparser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.get('/',(req,res) =>
    res.send(`Node and express server running on Port ${PORT}`)
    );

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);