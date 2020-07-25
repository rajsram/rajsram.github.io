import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AccountsModel } from '../model/accounts.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PaymentModel } from '../model/payment-model';
import { EntryModel } from '../model/entry.model';
import { MatTable } from '@angular/material/table';
import { ExpenseModel } from '../model/expense.model';
import { IncomeModel } from '../model/income.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  displayedColumns = ['Date', 'Particular', 'Credit', 'Debit'];
  accounts: AccountsModel[] = [];
  @ViewChild('accountsTable') accountsTable: MatTable<any>;
  totalIncome = 0;
  totalExpense = 0;
  fromDate = new Date();
  toDate = new Date();
  constructor(private dbService: NgxIndexedDBService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.accounts = [];
    this.dbService.getAll('Payment').then(
      (payments: PaymentModel[]) => {
        this.dbService.getAll('Expense').then(
          (expenses: ExpenseModel[]) => {
            this.dbService.getAll('Income').then(
              (incomes: IncomeModel[]) => {
                if (expenses.length > 0) { this.addExpenses(expenses); }
                if (payments.length > 0) { this.addPayments(payments); }
                if (incomes.length > 0) { this.addIncomes(incomes); }
              }, error => {
                console.log(error);
                alert(error.message);
              });
          }, error => {
            console.log(error);
            alert(error.message);
          });
      }, error => {
        console.log(error);
        alert(error.message);
      })
  }

  addPayments(payments: PaymentModel[]) {
    this.dayData(payments).forEach(
      pay => {
        this.dbService.getByID('Entry', pay.EntryGuid).then(
          (entry: EntryModel) => {
            let payment = new AccountsModel();
            payment.Date = pay.Date;
            payment.Particular = entry.Name;
            payment.Credit = pay.Amount.toString();
            this.totalIncome += pay.Amount;
            this.accounts.push(payment);
            this.accountsTable.renderRows();
          }, error => {
            console.log(error);
            alert(error.message);
          });
      });
  }

  addIncomes(incomes: IncomeModel[]) {
    this.dayData(incomes).forEach(
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

  addExpenses(expenses: ExpenseModel[]) {
    this.dayData(expenses).forEach(
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
    fromDate = new Date(fromDate.toLocaleDateString());
    toDate = new Date(toDate.toLocaleDateString());
    const utc1 = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    const utc2 = Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  }

  orderByDateDesc(list: any[]) {
    list = list.sort((a, b) => a.Date.toISOString().localeCompare(b.Date.toISOString()));
    return list.reverse();
  }

  dayData(data: any[]) {
    return this.dataService.dateFilter(data, this.fromDate, this.toDate);
  }
}
