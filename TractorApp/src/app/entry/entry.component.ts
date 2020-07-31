import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { PersonModel } from '../model/person.model';
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
  ];

  persons: PersonModel[] = [];
  searchName = '';
  date: Date = new Date();

  constructor(private fb: FormBuilder,
    private dbService: NgxIndexedDBService) {
    this.dbService.getAll('Person').then((persons: PersonModel[]) => {
      this.persons = persons;
    }, error => {
      if ('objectStore does not exists: Person') {
        this.dbService.deleteDatabase().then(
          () => {
            document.location.reload();
          },
          error => {
            console.log(error);
            alert(error);
          }
        );
      }
      console.log(error);
      alert(error);
    });
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.entryForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Mobile: [''],
      Date: [this.date, Validators.required],
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
    let formData = this.entryForm.value;
    if (formData.Settled) {
      if ((formData.Amount - formData.Paid) > 100) {
        if (!confirm('Amount is ₹' + formData.Amount + ' and paid ₹' + formData.Paid + ', really settled?')) {
          return;
        }
      }
    }
    let person = this.persons.find(p => p.Name === formData.Name);
    if (person)
      this.saveEntry(person.PersonGuid);
    else if (confirm('Person ' + formData.Name + ' is really new?')) {
      let person: PersonModel = new PersonModel();
      person.PersonGuid = (Guid.create() as any).value;
      person.Name = formData.Name;
      person.Mobile = formData.Mobile;
      this.dbService.add('Person', person).then(() => {
        this.saveEntry(person.PersonGuid);
      }, e => {
        console.log(e);
        alert(e);
      });
    }
  }

  saveEntry(personGuid) {
    let formData = this.entryForm.value;
    this.date = new Date((formData.Date as Date).setHours(0, 0, 0, 0));
    let entry: EntryModel = new EntryModel();
    entry.EntryGuid = (Guid.create() as any).value;
    entry.PersonGuid = personGuid;
    entry.Date = formData.FromTime ? this.mergeDateTime(this.date, formData.FromTime) : this.date;
    entry.Kalappai = formData.Kalappai;
    entry.HrAmount = formData.KalappaiAmount;
    entry.Time = { hours: formData.Hours, minutes: formData.Minutes };
    entry.Amount = formData.Amount;
    entry.Settled = formData.Settled;
    this.dbService.add('Entry', entry).then(() => {
      if (formData.Paid !== '' && formData.Paid > 0) {
        let payment = new PaymentModel();
        payment.PaymentGuid = (Guid.create() as any).value;
        payment.PersonGuid = personGuid;
        payment.Date = entry.Date;
        payment.Amount = formData.Paid;
        payment.New = !formData.Settled;
        this.dbService.add('Payment', payment).then(() => {
          alert('Saved Successfully..')
          this.setForm();
        }, error => {
          console.log(error);
          alert(error);
        })
      } else {
        alert('Saved Successfully..')
        this.setForm();
      }
    }, error => {
      console.log(error);
      alert(error);
    });
  }

  personSelect(e) {
    let person = this.persons.find(p => p.Name === e.option.value);
    if (person)
      this.entryForm.patchValue({
        Mobile: person.Mobile
      });
  }

  setPerson(guid) {
    let person = this.persons.find(p => p.PersonGuid === guid);
    if (person) {
      this.searchName = person.Name;
      this.entryForm.patchValue({
        Name: person.Name,
        Mobile: person.Mobile
      });
    }
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

  mergeDateTime(date: Date, time: string) {
    return new Date(date.setHours(this.getHours(time), this.getMinutes(time), 0, 0))
  }
}
