import type { Collection, MongoClient, ObjectId } from 'mongodb';
import type { Employee, EmployeeInDB, NewEmployee } from '../types/Employee.js';

/** Accès aux données des employés dans la collection MongoDB `hrNet.employee`. */
export default class EmployeeController {
    private employeesCollection: Collection<NewEmployee>;
    constructor(mongoClient: MongoClient) {
        this.employeesCollection = mongoClient.db('hrNet').collection<NewEmployee>('employee');
    }

    /** Retourne tous les employés de la base. */
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

    /** Insère un nouvel employé et retourne l'id généré. */
    async save(newEmployee: NewEmployee) {
        const result = await this.employeesCollection.insertOne(newEmployee);
        return result;
    }
}

/** Convertit un document MongoDB en employé API en remplaçant `_id` par `id`. */
function employeeAdapter(employeeFromDB: EmployeeInDB): Employee {
    const employee = { ...employeeFromDB, id: employeeFromDB._id.toString() };
    delete (employee as { _id?: ObjectId })._id;
    return employee;
}
