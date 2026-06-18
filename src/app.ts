import bodyParser from 'body-parser';
import connectMongoClient from './connectMongoClient.js';
import EmployeeController from './controllers/EmployeeController.js';
import express from 'express';
import employeeRouterFactory from './routes/employeeRouterFactory.js';
import departmentRouterFactory from './routes/departmentRouterFactory.js';
import DepartmentController from './controllers/DepartmentController.js';
import cors, { type CorsOptions } from 'cors';

const mongoDBClient = await connectMongoClient('mongodb://localhost:27017');
const employeeController = new EmployeeController(mongoDBClient);
const departmentController = new DepartmentController(mongoDBClient);
const app = express();
const port = 3000;
const corsOption: CorsOptions = {
    origin: (origin, callBack) => {
        console.info('origin|', origin, origin?.includes('localhost'));
        if (origin?.includes('localhost') || origin === undefined) {
            callBack(null, true);
        } else {
            callBack(new Error(`Not allowed by CORS`), false);
        }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/employee', employeeRouterFactory(employeeController));
app.use('/department', departmentRouterFactory(departmentController));
app.listen(port, () => {
    console.info(`serveur listen on port ${port}`);
});
