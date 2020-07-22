import { Component, OnInit } from '@angular/core';
import { IncomeModel } from '../model/income.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  incomeForm: FormGroup;
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
    });
  }
}
