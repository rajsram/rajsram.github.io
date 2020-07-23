import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AccountsModel } from '../model/accounts.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PaymentModel } from '../model/payment-model';
import { EntryModel } from '../model/entry.model';
import { MatTable } from '@angular/material/table';
import { ExpenseModel } from '../model/expense.model';
import { IncomeModel } from '../model/income.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  displayedColumns = ['Date', 'Particular', 'Credit', 'Debit'];
  accounts: AccountsModel[] = [];
  @ViewChild('accountsTable') accountsTable: MatTable<any>;
  constructor(private dbService: NgxIndexedDBService) { }

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
                payments = this.orderByDateDesc(payments);
                expenses = this.orderByDateDesc(expenses);
                incomes = this.orderByDateDesc(incomes);
                let dates = [];
                if (payments.length > 0)
                  dates.push({ Date: payments[0].Date }, { Date: payments[payments.length - 1].Date });
                if (expenses.length > 0)
                  dates.push({ Date: expenses[0].Date }, { Date: expenses[expenses.length - 1].Date });
                if (incomes.length > 0)
                  dates.push({ Date: incomes[0].Date }, { Date: incomes[incomes.length - 1].Date });
                dates = this.orderByDateDesc(dates);
                let daysCount = this.daysDifference(dates[dates.length - 1].Date, dates[0].Date);
                for (let i = 0; i < daysCount; i++) {
                  let cDate = dates[0].Date;
                  cDate.setDate(cDate.getDate() - i);
                  if (expenses.length > 0) { this.addExpenses(cDate, expenses); }
                  if (payments.length > 0) { this.addPayments(cDate, payments); }
                  if (incomes.length > 0) { this.addIncomes(cDate, incomes); }
                }
              }, error => {
                console.log(error);
              });
          }, error => {
            console.log(error);
          });
      }, error => {
        console.log(error);
      })
  }

  addPayments(date: Date, payments: PaymentModel[]) {
    this.dayData(date, payments).forEach(pay => {
      this.dbService.getByID('Entry', pay.EntryGuid).then(
        (entry: EntryModel) => {
          let payment = new AccountsModel();
          payment.Date = pay.Date;
          payment.Particular = entry.Name;
          payment.Credit = pay.Amount.toString();
          this.accounts.push(payment);
          this.accountsTable.renderRows();
        }, error => {
          console.log(error);
        });
    });
  }

  addIncomes(date: Date, incomes: IncomeModel[]) {
    this.dayData(date, incomes).forEach(
      (income: IncomeModel) => {
        let aIncome = new AccountsModel();
        aIncome.Date = income.Date;
        aIncome.Particular = income.Particular;
        aIncome.Credit = income.Amount.toString();
        this.accounts.push(aIncome);
        this.accountsTable.renderRows();
      });
  }

  addExpenses(date: Date, expenses: ExpenseModel[]) {
    console.log(expenses);
    let exps = this.dayData(date, expenses);
    console.log(exps);
    exps.forEach(
      (expense: ExpenseModel) => {
        let aExp = new AccountsModel();
        aExp.Date = expense.Date;
        aExp.Particular = expense.Particular;
        aExp.Debit = expense.Amount.toString();
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
    list = list.sort((a, b) => a.Date.toLocaleDateString().localeCompare(b.Date.toLocaleDateString()));
    return list.reverse();
  }

  dayData(day: Date, data: any[]) {
    data = data.filter(p => p.Date.toLocaleDateString() === day.toLocaleDateString());
    return data;
  }
}
