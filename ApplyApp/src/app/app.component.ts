import { Component } from '@angular/core';
import { Time } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  applyForm = this.fb.group({
    groomBrideName: [''],
    brideGroomName: [''],
    weddingDate: [new Date()],
    weddingTime: ['']
  });
  constructor(private fb: FormBuilder) { }
}