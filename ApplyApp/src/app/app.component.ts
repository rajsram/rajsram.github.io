import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Wedding } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  applyForm: FormGroup;
  events: FormArray;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.applyForm = this.fb.group({
      groomBrideName: ['', Validators.required, Validators.min(3)],
      brideGroomName: ['', Validators.required, Validators.min(3)],
      weddingDate: [new Date(), Validators.required],
      weddingTime: ['12:00 AM', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]
    });
    this.events = this.fb.array([
      this.event()
    ])
  }

  applySubmit() {
    let wed = this.applyForm.value;
    let eves = this.events.value as [];
    let wedData: Wedding = new Wedding();
    wedData.groomBrideName = wed.groomBrideName;
    wedData.brideGroomName = wed.brideGroomName;
    wedData.weddingDateTime = this.mergeDateTime(wed.weddingDate, wed.weddingTime);
    wedData.mobiles = wed.mobile.split(',');
    wedData.email = wed.email;
    wedData.events = [];
    eves.forEach((e: any) => {
      wedData.events.push({
        title: e.title,
        address: e.address,
        locationUrl: e.locationUrl,
        from: this.mergeDateTime(e.date, e.from),
        to: this.mergeDateTime(e.date, e.to)
      });
    });
    console.log(wedData);
    let a = document.createElement('a');
    a.href = 'mailto:srajesh0111@gmail.com?subject=Wedding Page Application&body=' + JSON.stringify(wedData);
    a.click();
  }

  mergeDateTime(date: Date, time: string) {
    return new Date(date.setHours(this.getHours(time), this.getMinutes(time), 0, 0))
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

  event() {
    return this.fb.group({
      title: ['', Validators.required],
      date: [new Date(), Validators.required],
      from: ['12:00 AM', Validators.required],
      to: ['12:00 AM', Validators.required],
      address: ['', Validators.required],
      locationUrl: ['', Validators.required]
    });
  }

  addEvent() {
    this.events.push(this.event());
  }

  remveEvent(i: number) {
    this.events.removeAt(i);
  }
}