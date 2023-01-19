import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

//components
import Connection from './database/db.js';
import Router from './routes/route.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));


const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URL = `mongodb://${username}:${password}@ac-w7lphps-shard-00-00.9qpo4fm.mongodb.net:27017,ac-w7lphps-shard-00-01.9qpo4fm.mongodb.net:27017,ac-w7lphps-shard-00-02.9qpo4fm.mongodb.net:27017/?ssl=true&replicaSet=atlas-hdyi1e-shard-0&authSource=admin&retryWrites=true&w=majority`;

Connection(URL);

