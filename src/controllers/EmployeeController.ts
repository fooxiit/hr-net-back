import type { Collection, MongoClient, ObjectId } from 'mongodb';
import type { Employee, EmployeeInDB, NewEmployee } from '../types/Employee.js';

export default class EmployeeController {
    private employeesCollection: Collection<NewEmployee>;
    constructor(mongoClient: MongoClient) {
        this.employeesCollection = mongoClient.db('hrNet').collection<NewEmployee>('employee');
    }
    get employees(): Promise<Employee[]> {
        return new Promise(async (resolve, rejects) => {
            try {
                const employees = (await this.employeesCollection.find().toArray()).map((employee) => employeeAdapter(employee));
                resolve(employees);
            } catch (error) {
                rejects(error);
            }
        });
    }

    async saveEmployee(newEmployee: NewEmployee) {
        const result = await this.employeesCollection.insertOne(newEmployee);
        return result;
    }
}

function employeeAdapter(employeeFromDB: EmployeeInDB): Employee {
    const employee = { ...employeeFromDB, id: employeeFromDB._id.toString() };
    delete (employee as { _id?: ObjectId })._id;
    return employee;
}
