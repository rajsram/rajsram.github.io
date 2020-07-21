import { Injectable } from '@angular/core';
import { EntryModel } from '../model/entry.model';
import { TractorDataModel } from '../model/data.model';
import { PaymentModel } from '../model/payment-model';
import { ExpenseModel } from '../model/expense.model';
import { IncomeModel } from '../model/income.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localAccountsDataId = 'tractorAccounts';
  localAccountsData: TractorDataModel;
  constructor() { }

  get LocalStorage(): TractorDataModel {
    if (this.localAccountsData) {
      let localData = localStorage.getItem(this.localAccountsDataId);
      if (localData) {
        this.localAccountsData = JSON.parse(localData);
      }
    }
    return this.localAccountsData;
  }

  set LocalStorage(data: TractorDataModel) {
    localStorage.setItem(this.localAccountsDataId, JSON.stringify(data));
    this.localAccountsData = data;
  }

  clearLocalStorage() {
    localStorage.removeItem(this.localAccountsDataId);
  }

  get Entries(): EntryModel[] {
    return this.LocalStorage.entries ?? [];
  }

  set Entries(entries: EntryModel[]) {
    this.localAccountsData.entries = entries;
    this.LocalStorage = this.localAccountsData;
  }

  get Expenses(): ExpenseModel[] {
    return this.LocalStorage.expenses ?? [];;
  }

  set Expenses(expenses: ExpenseModel[]) {
    this.localAccountsData.expenses = expenses;
    this.LocalStorage = this.localAccountsData;
  }

  get Incomes(): IncomeModel[] {
    return this.LocalStorage.incomes ?? [];;
  }

  set Incomes(incomes: IncomeModel[]) {
    this.localAccountsData.incomes = incomes;
    this.LocalStorage = this.localAccountsData;
  }

  get Payments(): PaymentModel[] {
    return this.LocalStorage.payments ?? [];;
  }

  set Payments(payments: PaymentModel[]) {
    this.localAccountsData.payments = payments;
    this.LocalStorage = this.localAccountsData;
  }
}
