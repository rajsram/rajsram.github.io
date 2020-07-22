import { Component, OnInit } from '@angular/core';
import { AccountsModel } from '../model/accounts.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  displayedColumns = ['Date', 'Particular', 'Credit', 'Debit'];
  accounts: AccountsModel[] = [
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '100', Debit: '' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '1000', Debit: '' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '500', Debit: '' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '1500', Debit: '' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '1300', Debit: '' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '100', Debit: '' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '1200', Debit: '' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '', Debit: '500' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '', Debit: '300' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '', Debit: '1500' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '1800', Debit: '' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '1900', Debit: '' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '1100', Debit: '' },
    { Date: new Date(), Particular: 'Angular Live Development Server', Credit: '1600', Debit: '' },
  ];
  constructor(private dbService: NgxIndexedDBService) { }

  ngOnInit(): void {
  }

}
