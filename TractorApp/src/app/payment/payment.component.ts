import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryModel } from '../model/entry.model';
import { PaymentModel } from '../model/payment-model';
import { Guid } from 'guid-typescript';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  payment: PaymentModel = new PaymentModel();
  constructor(public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntryModel,
    private dbService: NgxIndexedDBService) {
    this.payment.Date = new Date();
  }

  ngOnInit(): void {
  }

  addPayment() {
    this.payment.PaymentGuid = (Guid.create() as any).value;
    this.payment.EntryGuid = this.data.EntryGuid;
    this.dbService.add('Payment', this.payment).then(() => {
      alert('Payment Added Successfully..')
      this.data.Paid += this.payment.Amount;
      this.data.Payments.push(this.payment);
      this.dialogRef.close(this.data);
    }, error => {
      console.log(error);
    })
  }
}
