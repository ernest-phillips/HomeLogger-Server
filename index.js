import express from 'express' ;
import routes from './src/routes/router';

const app = express();
const PORT = 4000;

routes(app);

app.get('/',(req,res) =>
    res.send(`Node and express server running on Port ${PORT}`)
    );

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);