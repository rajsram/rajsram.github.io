import { PaymentModel } from './payment-model';

export class EntryModel {
    EntryGuid: string;
    Date: Date;
    Name: string;
    Mobile: number;
    Kalappai: string;
    KalappaiAmount: number;
    FromTime: string;
    ToTime: string;
    Hours: number;
    Minutes: number;
    Amount: number;
    Paid: number;
    Settled: boolean;
    Payments: PaymentModel[];
}