import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { EntryModel } from '../model/entry.model';
import { PaymentModel } from '../model/payment-model';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  showList: boolean;
  entryForm: FormGroup;
  amount: number = 0;
  kalappai = [
    { id: 1, name: '9 Kalappai', value: 700 },
    { id: 2, name: '5 Kalappai', value: 800 },
    { id: 3, name: 'Lottery', value: 900 },
  ]

  constructor(private fb: FormBuilder,
    private dbService: NgxIndexedDBService) {

  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.entryForm = this.fb.group({
      Date: [new Date(), Validators.required],
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Mobile: [''],
      KalappaiId: ['', Validators.required],
      Kalappai: ['', Validators.required],
      KalappaiAmount: ['', Validators.required],
      FromTime: [''],
      ToTime: [''],
      Hours: [''],
      Minutes: [''],
      Amount: ['', [Validators.required, Validators.min(1)]],
      Paid: [''],
      Settled: [false]
    });
    this.amount = 0;
  }

  addEntry() {
    let guid = (Guid.create() as any).value;
    let formData = this.entryForm.value;
    let entry: EntryModel = new EntryModel();
    entry.EntryGuid = guid;
    entry.Name = formData.Name;
    entry.Mobile = formData.Mobile;
    entry.Date = formData.Date;
    entry.Kalappai = formData.Kalappai;
    entry.KalappaiAmount = formData.KalappaiAmount;
    entry.FromTime = formData.FromTime;
    entry.ToTime = formData.ToTime;
    entry.Hours = formData.Hours;
    entry.Minutes = formData.Minutes;
    entry.Amount = formData.Amount;
    entry.Settled = formData.Settled;

    this.dbService.add('Entry', entry).then(() => {
      if (formData.Paid !== '' && formData.Paid > 0) {
        let payment = new PaymentModel();
        payment.PaymentGuid = (Guid.create() as any).value;
        payment.EntryGuid = entry.EntryGuid;
        payment.Date = entry.Date;
        payment.Amount = formData.Paid;
        this.dbService.add('Payment', payment).then(() => {
          alert('Saved Successfully..')
          this.setForm();
        }, error => {
          console.log(error);
          alert(error.message);
        })
      } else {
        alert('Saved Successfully..')
        this.setForm();
      }
    }, error => {
      console.log(error);
      alert(error.message);
    });
  }

  setKalappai(event) {
    let ka = this.kalappai[event - 1]
    this.entryForm.patchValue({
      Kalappai: ka.name,
      KalappaiAmount: ka.value
    });
    this.calcAmount();
  }

  calcAmount() {
    let data = this.entryForm.value;
    if (data.Hours != undefined && data.Minutes != undefined && data.Kalappai != undefined) {
      let time = +data.Hours + (data.Minutes / 60);
      let amt = +data.KalappaiAmount;
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
      if (fh > th || (fh === th && fm > tm)) {
        this.entryForm.patchValue({
          Hours: 0,
          Minutes: 0,
          Amount: 0
        });
        return;
      } else if (fh === th) {
        this.entryForm.patchValue({
          Hours: 0,
          Minutes: tm - fm
        });
      } else if (fh < th) {
        if (fm <= tm) {
          this.entryForm.patchValue({
            Hours: th - fh,
            Minutes: tm - fm
          });
        } else {
          this.entryForm.patchValue({
            Hours: th - fh - 1,
            Minutes: 60 + tm - fm
          });
        }
      }
      this.calcAmount();
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
