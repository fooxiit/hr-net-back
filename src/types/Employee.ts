import type { WithId } from 'mongodb';

/** Employé complet tel qu'exposé par l'API, avec un `id` lisible. */
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

/** Payload pour créer un employé (sans `id`, généré par MongoDB). */
export type NewEmployee = Omit<Employee, 'id'>;

/** Employé tel que stocké en base, avec le champ `_id` natif de MongoDB. */
export type EmployeeInDB = WithId<NewEmployee>;
