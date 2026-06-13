import bodyParser from 'body-parser';
import connectMongoClient from './connectMongoClient.js';
import EmployeeController from './controllers/EmployeeController.js';
import express from 'express';
import employeeRouterFactory from './routes/employeeRouterFactory.js';

const mongoDBClient = await connectMongoClient('mongodb://localhost:27017');
const employeeController = new EmployeeController(mongoDBClient);
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/employee', employeeRouterFactory(employeeController));
app.listen(port, () => {
    console.info(`serveur listen on port ${port}`);
});
