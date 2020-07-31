import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AccountsModel } from '../model/accounts.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PaymentModel } from '../model/payment-model';
import { EntryModel } from '../model/entry.model';
import { MatTable } from '@angular/material/table';
import { ExpenseModel } from '../model/expense.model';
import { IncomeModel } from '../model/income.model';
import { DataService } from '../services/data.service';
import { PersonModel } from '../model/person.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  displayedColumns = ['Date', 'Particular', 'Credit', 'Debit'];
  accounts: AccountsModel[] = [];
  persons: PersonModel[] = [];
  entries: EntryModel[] = [];
  payments: PaymentModel[] = [];
  expenses: ExpenseModel[] = [];
  incomes: IncomeModel[] = [];
  @ViewChild('accountsTable') accountsTable: MatTable<any>;
  totalIncome = 0;
  totalExpense = 0;
  fromDate = new Date();
  toDate = new Date();
  isRun = '1';
  constructor(private dbService: NgxIndexedDBService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.accounts = [];
    this.totalExpense = 0; this.totalIncome = 0;
    this.dbService.getAll('Income').then(
      (incomes: IncomeModel[]) => {
        this.incomes = incomes;
        this.addIncomes();
      }, error => {
        console.log(error);
        alert(error);
      });
    this.dbService.getAll('Expense').then(
      (expenses: ExpenseModel[]) => {
        this.expenses = expenses;
        this.addExpenses();
      }, error => {
        console.log(error);
        alert(error);
      });
    this.dbService.getAll('Person').then((persons: PersonModel[]) => {
      this.persons = persons;
      this.dbService.getAll('Entry').then(
        (entries: EntryModel[]) => {
          this.entries = entries;
          if (this.isRun == '1') { this.addEntries(); }
        }, error => {
          console.log(error);
          alert(error);
        });
      this.dbService.getAll('Payment').then(
        (payments: PaymentModel[]) => {
          this.payments = payments;
          if (this.isRun == '0') { this.addPayments(); }
        }, error => {
          console.log(error);
          alert(error);
        })
    }, error => {
      console.log(error);
      alert(error);
    });

  }

  fromDateChange() {
    if (this.fromDate > this.toDate) {
      this.toDate = this.fromDate;
    }
    this.filterData();
  }
  toDateChange() {
    if (this.fromDate > this.toDate) {
      this.fromDate = this.toDate;
    }
    this.filterData();
  }

  filterData() {
    this.accounts = [];
    this.totalExpense = 0; this.totalIncome = 0;
    this.accountsTable.renderRows();
    if (this.isRun == '1') { this.addEntries(); } else { this.addPayments() }
    this.addIncomes();
    this.addExpenses();
  }

  addEntries() {
    this.dayData(this.entries).forEach(
      (entry: EntryModel) => {
        let person = this.persons.find(p => p.PersonGuid === entry.PersonGuid);
        if (person) {
          let eIncome = new AccountsModel();
          eIncome.Date = entry.Date;
          eIncome.Particular = person.Name;
          eIncome.Credit = entry.Amount.toString();
          this.totalIncome += entry.Amount;
          this.accounts.push(eIncome);
          this.accountsTable.renderRows();
        }
      });
  }

  addPayments() {
    this.dayData(this.payments).forEach(
      (pay: PaymentModel) => {
        let person = this.persons.find(p => p.PersonGuid === pay.PersonGuid);
        if (person) {
          let payment = new AccountsModel();
          payment.Date = pay.Date;
          payment.Particular = person.Name;
          payment.Credit = pay.Amount.toString();
          this.totalIncome += pay.Amount;
          this.accounts.push(payment);
          this.accountsTable.renderRows();
        }
      });
  }

  addIncomes() {
    this.dayData(this.incomes).forEach(
      (income: IncomeModel) => {
        let aIncome = new AccountsModel();
        aIncome.Date = income.Date;
        aIncome.Particular = income.Particular;
        aIncome.Credit = income.Amount.toString();
        this.totalIncome += income.Amount;
        this.accounts.push(aIncome);
        this.accountsTable.renderRows();
      });
  }

  addExpenses() {
    this.dayData(this.expenses).forEach(
      (expense: ExpenseModel) => {
        let aExp = new AccountsModel();
        aExp.Date = expense.Date;
        aExp.Particular = expense.Particular;
        aExp.Debit = expense.Amount.toString();
        this.totalExpense += expense.Amount;
        this.accounts.push(aExp);
        this.accountsTable.renderRows();
      });
  }

  daysDifference(fromDate: Date, toDate: Date): number {
    fromDate = new Date(fromDate.toDateString());
    toDate = new Date(toDate.toDateString());
    const utc1 = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    const utc2 = Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  }
  dayData(data: any[]) {
    return this.dataService.dateFilter(data, this.fromDate, this.toDate);
  }
}
