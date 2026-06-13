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

export type NewEmployee = Omit<Employee, 'id'>;

export type EmployeeInDB = WithId<NewEmployee>;
