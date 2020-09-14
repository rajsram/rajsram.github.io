import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { DriverModel } from '../model/driver-model';
import { Guid } from 'guid-typescript';
import { MatTable } from '@angular/material/table';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  driverForm: FormGroup;
  showList: boolean;
  displayedColumns = ['Date', 'Person', 'Amount','Paid'];
  drives: DriverModel[] = [];
  @ViewChild('drivesTable') drivesTable: MatTable<any>;
  constructor(private fb: FormBuilder,
    private dbService: NgxIndexedDBService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.setForm();
  }
  setForm() {
    this.driverForm = this.fb.group({
      Date: [new Date(), Validators.required],
      Particular: ['', [Validators.required, Validators.minLength(3)]],
      Amount: ['', [Validators.required, Validators.min(1)]]
    });
  }
  addDrive() {
    let formData = this.driverForm.value;
    let drive = new DriverModel();
    drive.DriverGuid = (Guid.create() as any).value;
    drive.Date = formData.Date;
    drive.Amount = formData.Amount;
    this.dbService.add('Driver', drive).then(() => {
      alert('Drive Added Successfully..');
      this.setForm();
    }, error => {
      console.log(error);
      alert(error);
    });
  }
  switchView() {
    if (!this.showList) {
      this.dbService.getAll('Driver').then(
        (drives: DriverModel[]) => {
          this.drives = this.dataService.orderByDateDesc(drives);
          this.drivesTable.renderRows();
        }, error => {
          console.log(error);
          alert(error);
        });
    }
    this.showList = !this.showList;
  }
}
