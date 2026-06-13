import type { WithId } from 'mongodb';

export interface Employee {
    firstName: string;
    lastName: string;
    startDate: Date;
    department: string;
    dateOfBirth: Date;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    id: string;
}

export interface NewEmployee extends Omit<Employee, 'id'> {}

export interface EmployeeInDB extends WithId<NewEmployee> {}
