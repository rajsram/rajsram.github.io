import { Time } from '@angular/common';

export class EntryModel {
    EntryGuid: string;    
    PersonGuid: string;
    Date: Date;
    Kalappai: string;
    HrAmount: number;
    Time: Time;
    Amount: number;
    Settled: boolean = false;
}