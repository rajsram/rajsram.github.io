import { Component, OnInit, ViewChild } from '@angular/core';
import { IncomeModel } from '../model/income.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Guid } from 'guid-typescript';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  incomeForm: FormGroup;
  showList: boolean;
  displayedColumns = ['Date', 'Particular', 'Amount'];
  incomes: IncomeModel[] = [];
  @ViewChild('incomesTable') incomesTable: MatTable<any>;
  constructor(private fb: FormBuilder,
    private dbService: NgxIndexedDBService) { }

  ngOnInit(): void {
    this.setForm();
  }
  setForm() {
    this.incomeForm = this.fb.group({
      Date: [new Date(), Validators.required],
      Particular: ['', [Validators.required, Validators.minLength(3)]],
      Amount: ['', [Validators.required, Validators.min(1)]]
    });
  }
  addIncome() {
    let formData = this.incomeForm.value;
    let income = new IncomeModel();
    income.IncomeGuid = (Guid.create() as any).value;
    income.Date = formData.Date;
    income.Particular = formData.Particular;
    income.Amount = formData.Amount;
    this.dbService.add('Income', income).then(() => {
      alert('Income Added Successfully..');
      this.setForm();
    }, error => {
      console.log(error);
      alert(error.message);
    });
  }


  switchView() {
    if (!this.showList) {
      this.dbService.getAll('Income').then(
        (incomes: IncomeModel[]) => {
          this.incomes = incomes.sort((a, b) => a.Date.toUTCString()
          .localeCompare(b.Date.toUTCString()))
          .reverse();
          this.incomesTable.renderRows();
        }, error => {
          console.log(error);
          alert(error.message);
        });
    }
    this.showList = !this.showList;
  }
}
