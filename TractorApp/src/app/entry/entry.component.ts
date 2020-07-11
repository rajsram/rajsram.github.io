import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    this.entryForm = this.fb.group({
      Date: [new Date(), Validators.required],
      Name: ['', Validators.required, Validators.min(3)],
      Mobile: [''],
      Kalappai: ['', Validators.required],
      FromTime: [''],
      ToTime: [''],
      Hours: ['', Validators.required],
      Minutes: ['', Validators.required],
      Amount: ['', Validators.required]
    });
  }

  addEntry() {

  }

  calcAmount() {
    let data = this.entryForm.value;
    let time = data.Hours + (data.Minutes / 60);
    switch (data.Kalappai) {
      case '1': {
        let ha = 700;
        this.amount = ha * time;
        break;
      }
      case '2': {
        let ha = 800;
        this.amount = ha * time;
      }
      case '3': {
        let ha = 900;
        this.amount = ha * time;
      }
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
