import { PaymentModel } from './payment-model';
import { EntryModel } from './entry.model';

export class PersonModel {
    PersonGuid: string;
    Name: string;
    Mobile: number;
    //local properties
    Amount: number;
    Paid: number;
    Entries: EntryModel[];
    Payments: PaymentModel[];
    Settled: boolean = false;
}