import { Component } from '@angular/core';
import { Time } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  event = this.fb.group({
    title: [''],
    from: [new Date()],
    to: [new Date()],
    address: [''],
    locationUrl: ['']
  });
  events = this.fb.array([
    this.event
  ]);
  applyForm = this.fb.group({
    groomBrideName: ['Raj'],
    brideGroomName: [''],
    weddingDate: [new Date()],
    weddingTime: [new Date()],
    events: this.events
  });
  constructor(private fb: FormBuilder) { }

  applySubmit() {
    console.log(this.applyForm);


  }

  get eventsArray() {
    return this.applyForm.get('events') as FormArray;
  }

  addEvent() {
    this.eventsArray.push(this.event);
  }

  remveEvent(i: number) {
    this.eventsArray.removeAt(i);
  }
}