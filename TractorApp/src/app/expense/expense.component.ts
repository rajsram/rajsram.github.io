import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ExpenseModel } from '../model/expense.model';
import { Guid } from 'guid-typescript';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  showList: boolean;
  displayedColumns = ['Date', 'Particular', 'Amount'];
  expenses: ExpenseModel[] = [];
  @ViewChild('expensesTable') expensesTable: MatTable<any>;
  constructor(private fb: FormBuilder,
    private dbService: NgxIndexedDBService) { }

  ngOnInit(): void {
    this.setForm();
  }
  setForm() {
    this.expenseForm = this.fb.group({
      Date: [new Date(), Validators.required],
      Particular: ['', [Validators.required, Validators.minLength(3)]],
      Amount: ['', [Validators.required, Validators.min(1)]]
    });
  }
  addExpense() {
    let formData = this.expenseForm.value;
    let expense = new ExpenseModel();
    expense.ExpenseGuid = (Guid.create() as any).value;
    expense.Date = formData.Date;
    expense.Particular = formData.Particular;
    expense.Amount = formData.Amount;
    this.dbService.add('Expense', expense).then(() => {
      alert('Expense Added Successfully..');
      this.setForm();
    }, error => {
      console.log(error);
      alert(error.message);
    });
  }
  switchView() {
    if (!this.showList) {
      this.dbService.getAll('Expense').then(
        (expenses: ExpenseModel[]) => {
          this.expenses = expenses.sort((a, b) => a.Date.toUTCString()
          .localeCompare(b.Date.toUTCString()))
          .reverse();
          this.expensesTable.renderRows();
        }, error => {
          console.log(error);
          alert(error.message);
        });
    }
    this.showList = !this.showList;
  }
}
