import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { EntryModel } from '../model/entry.model';
import { EntryService } from '../service/entry.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  entryForm: FormGroup;
  amount: number = 0;
  kalappai = [
    { id: 1, name: '9 Kalappai', value: 700 },
    { id: 2, name: '5 Kalappai', value: 800 },
    { id: 3, name: 'Lottery', value: 900 },
  ]

  constructor(private fb: FormBuilder,
    private entryService: EntryService) {

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
      Paid: ['']
    });
  }

  addEntry() {
    let guid = (Guid.create() as any).value;
    let fromData = this.entryForm.value;
    let entry: EntryModel = new EntryModel();
    entry.Guid = guid;
    entry.Name = fromData.Name;
    entry.Mobile = fromData.Mobile;
    entry.Date = fromData.Date;
    entry.Kalappai = fromData.Kalappai;
    entry.KalappaiAmount = fromData.KalappaiAmount;
    entry.FromTime = fromData.FromTime;
    entry.ToTime = fromData.ToTime;
    entry.Hours = fromData.Hours;
    entry.Minutes = fromData.Minutes;
    entry.Amount = fromData.Amount;
    entry.Paid = fromData.Paid;
    let entires = this.entryService.getEntries();
    entires.push(entry)
    this.entryService.setEntries(entires);
    alert('Saved Successfully..')
    this.setForm();
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
      if (fh === th) {
        this.entryForm.patchValue({
          Hours: 0,
          Minutes: tm - fm
        });
      } else if (fh < th) {
        if (fm < tm) {
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
