import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  entryForm: FormGroup;
  amount: number = 0;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.entryForm = this.fb.group({
      Date: [new Date(), Validators.required],
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Mobile: [''],
      Kalappai: ['', Validators.required],
      FromTime: [''],
      ToTime: [''],
      Hours: [''],
      Minutes: [''],
      Amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  addEntry() {
    let guid = (Guid.create() as any).value;
  }

  calcAmount() {
    let data = this.entryForm.value;
    if (data.Hours != undefined && data.Minutes != undefined && data.Kalappai != undefined) {
      let time = +data.Hours + (data.Minutes / 60);
      let amt = +data.Kalappai;
      this.amount = Math.floor(amt * time);
      this.entryForm.patchValue({
        Amount: this.amount
      });
    }
  }

  calcTime() {
    let data = this.entryForm.value;
    if (data.FromTime && data.ToTime) {
      let fh = this.getHours(data.FromTime);
      let fm = this.getMinutes(data.FromTime);
      let th = this.getHours(data.ToTime);
      let tm = this.getMinutes(data.ToTime);
      if (fh === th) {
        this.entryForm.patchValue({
          Hours: 0,
          Minutes: tm - fm
        });
      } else if (fh < th) {
        this.entryForm.patchValue({
          Hours: th - fh,
          Minutes: tm - fm
        });
      }
    }
    this.calcAmount();
  }

  getHours(date: string) {
    let hours = +(date.split(':')[0]);
    if (date.split(':')[1].split(' ')[1] === 'PM') {
      hours += 12;
    }
    return hours;
  }

  getMinutes(date: string) {
    return +(date.split(':')[1].split(' ')[0])
  }

}
